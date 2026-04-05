import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, '.htaccess');
const distDir = path.join(root, 'dist');
const target = path.join(distDir, '.htaccess');

async function main() {
  try {
    await fs.access(distDir);
  } catch {
    console.warn('[copy-htaccess-to-dist] dist/ not found, skipping. Run build first.');
    return;
  }

  try {
    await fs.copyFile(source, target);
    console.log('[copy-htaccess-to-dist] Copied .htaccess to dist/.htaccess');
  } catch (error) {
    console.error('[copy-htaccess-to-dist] Failed to copy .htaccess:', error);
    process.exit(1);
  }
}

main();
