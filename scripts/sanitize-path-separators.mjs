import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', '.vercel']);

const URL_LIKE_PROP = /(url\s*:\s*['"])([^'"\n]*\\[^'"\n]*)(['"])/g;
const URL_LIKE_ATTR = /((?:src|href)\s*=\s*['"])([^'"\n]*\\[^'"\n]*)(['"])/g;

function looksLikePathLiteral(value) {
  if (!value.includes('\\')) return false;
  if (value.includes('\\n') || value.includes('\\t') || value.includes('\\r')) return false;
  return (
    /^\\/.test(value) ||
    /^(?:\/?)(?:pdfs|images|uploads|documents)\b/i.test(value) ||
    /(Department|StudentLife|TimeTable|assets|public|uploads)/i.test(value)
  );
}

function normalizePathLiteral(value) {
  return value.replace(/\\/g, '/');
}

function sanitizeContent(content) {
  let changed = false;

  const apply = (regex) =>
    content.replace(regex, (full, prefix, raw, suffix) => {
      if (!looksLikePathLiteral(raw)) return full;
      const normalized = normalizePathLiteral(raw);
      if (normalized === raw) return full;
      changed = true;
      return `${prefix}${normalized}${suffix}`;
    });

  content = apply(URL_LIKE_PROP);
  content = apply(URL_LIKE_ATTR);

  return { content, changed };
}

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(abs, out);
      continue;
    }
    if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(abs);
    }
  }
  return out;
}

async function main() {
  const files = await walk(ROOT);
  const touched = [];

  for (const filePath of files) {
    const original = await fs.readFile(filePath, 'utf8');
    const { content, changed } = sanitizeContent(original);
    if (!changed) continue;
    await fs.writeFile(filePath, content, 'utf8');
    touched.push(path.relative(ROOT, filePath));
  }

  if (touched.length > 0) {
    console.log('[sanitize-path-separators] Normalized path separators in:');
    touched.forEach((file) => console.log(`- ${file}`));
  } else {
    console.log('[sanitize-path-separators] No unsafe backslash URL literals found.');
  }
}

main().catch((error) => {
  console.error('[sanitize-path-separators] Failed:', error);
  process.exit(1);
});
