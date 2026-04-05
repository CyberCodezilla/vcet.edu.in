import fs from 'fs';
import path from 'path';

const dir = 'pages/departments';
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(dir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/(['"`])pdfs(?:\/|\\).+?\1/g, match => match.replace(/\\/g, '/'));
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed backslashes in', file);
  }
});
