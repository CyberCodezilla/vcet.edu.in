import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT_FOLDER_ID = process.argv[2];
const OUTPUT_DIR = process.argv[3];
const STATE_FILE = process.argv[4] ?? path.join(OUTPUT_DIR, '.drive-import-state.json');

if (!ROOT_FOLDER_ID || !OUTPUT_DIR) {
  console.error('Usage: node scripts/importDriveFolder.mjs <folderId> <outputDir>');
  process.exit(1);
}

const DRIVE_FOLDER_MIME = 'application/vnd.google-apps.folder';
const visitedFolders = new Set();
const downloadedFiles = new Set();
const completedFolders = new Set();

const sanitizeName = (name) =>
  name.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_').trim() || 'untitled';

const decodeDriveString = (value) =>
  value
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\\//g, '/')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)));

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return response.text();
};

const loadState = async () => {
  try {
    const raw = await fs.readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed.completedFolders)) {
      for (const folderId of parsed.completedFolders) {
        completedFolders.add(folderId);
      }
    }
  } catch {
    // No existing state file yet.
  }
};

const saveState = async () => {
  await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
  await fs.writeFile(
    STATE_FILE,
    JSON.stringify(
      {
        completedFolders: [...completedFolders],
      },
      null,
      2
    )
  );
};

const fetchBuffer = async (url) => {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const extractFolderChildren = (html, folderId) => {
  const normalized = html.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  const itemPattern = /\["([^"]+)",\[((?:"[^"]*",?)*)\],"((?:\\.|[^"\\])*)","([^"]+)"/g;
  const parentPattern = /"([^"]+)"/g;
  const items = new Map();
  let match;

  while ((match = itemPattern.exec(normalized)) !== null) {
    const [, id, parentsChunk, rawName, mimeType] = match;
    const parents = [...parentsChunk.matchAll(parentPattern)].map((entry) => entry[1]);

    if (!parents.includes(folderId)) {
      continue;
    }

    if (!items.has(id)) {
      items.set(id, {
        id,
        name: decodeDriveString(rawName),
        mimeType: decodeDriveString(mimeType),
      });
    }
  }

  return [...items.values()];
};

const downloadFile = async (fileId, destinationPath) => {
  if (downloadedFiles.has(fileId)) {
    return true;
  }

  try {
    await fs.access(destinationPath);
    downloadedFiles.add(fileId);
    return true;
  } catch {
    // File does not exist yet; continue with download.
  }

  await fs.mkdir(path.dirname(destinationPath), { recursive: true });
  const candidateUrls = [
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
  ];

  let buffer;
  let lastError;

  for (const candidateUrl of candidateUrls) {
    try {
      const candidateBuffer = await fetchBuffer(candidateUrl);
      const asText = candidateBuffer.toString('utf8', 0, Math.min(candidateBuffer.length, 512));

      if (asText.includes('<!DOCTYPE html') || asText.includes('<html')) {
        throw new Error(`HTML response for ${candidateUrl}`);
      }

      buffer = candidateBuffer;
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!buffer) {
    console.log(`fail  ${destinationPath} :: ${lastError instanceof Error ? lastError.message : lastError}`);
    return false;
  }

  downloadedFiles.add(fileId);
  await fs.writeFile(destinationPath, buffer);
  console.log(`file  ${destinationPath}`);
  return true;
};

const crawlFolder = async (folderId, relativePath = '') => {
  if (completedFolders.has(folderId)) {
    return true;
  }

  if (visitedFolders.has(folderId)) {
    return true;
  }

  visitedFolders.add(folderId);
  const pageHtml = await fetchText(`https://drive.google.com/drive/mobile/folders/${folderId}`);
  const children = extractFolderChildren(pageHtml, folderId);
  let folderSucceeded = true;

  for (const child of children) {
    const safeName = sanitizeName(child.name || child.id);
    const targetPath = path.join(OUTPUT_DIR, relativePath, safeName);

    if (child.mimeType === DRIVE_FOLDER_MIME) {
      await fs.mkdir(targetPath, { recursive: true });
      console.log(`folder ${targetPath}`);
      const childSucceeded = await crawlFolder(child.id, path.join(relativePath, safeName));
      folderSucceeded = folderSucceeded && childSucceeded;
      continue;
    }

    if (child.mimeType.startsWith('application/vnd.google-apps.')) {
      console.log(`skip  ${child.name} (${child.mimeType})`);
      continue;
    }

    const downloaded = await downloadFile(child.id, targetPath);
    folderSucceeded = folderSucceeded && downloaded;
  }

  if (folderSucceeded) {
    completedFolders.add(folderId);
    await saveState();
  }

  return folderSucceeded;
};

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await loadState();
const finished = await crawlFolder(ROOT_FOLDER_ID);
console.log(`Done. Folders: ${visitedFolders.size}, files: ${downloadedFiles.size}, finished: ${finished}`);
