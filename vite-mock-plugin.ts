import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(__dirname, 'public/data/newsletters.json');
const imgDir = path.resolve(__dirname, 'public/uploads/images');
const pdfDir = path.resolve(__dirname, 'public/uploads/pdfs');

function ensureDirs() {
  [path.dirname(dataPath), imgDir, pdfDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
  }
}

export function newsletterMockPlugin() {
  return {
    name: 'newsletter-mock-plugin',
    configureServer(server: any) {
      server.middlewares.use('/dev-api/newsletters', (req: any, res: any, next: any) => {
        if (req.method === 'GET') {
          ensureDirs();
          const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, data }));
          return;
        }

        if (req.method === 'POST') {
          ensureDirs();
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const { id, title, description, departmentId, _method, existingImage, existingPdf } = payload;
              
              const isUpdate = _method === 'PUT';
              const db = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
              let item: any = isUpdate ? db.find((x: any) => x.id === id) : {};

              if (isUpdate && !item) {
                res.statusCode = 404;
                res.end(JSON.stringify({ success: false, message: 'Not found' }));
                return;
              }

              item.title = title;
              item.description = description;
              item.departmentId = departmentId;
              item.updatedAt = new Date().toISOString();

              if (!isUpdate) {
                item.id = Date.now();
                item.createdAt = new Date().toISOString();
                item.image = null;
                item.pdf = null;
              }

              // Handle image upload
              if (payload.imageBase64 && payload.imageName) {
                const imgBuffer = Buffer.from(payload.imageBase64.split(',')[1] || payload.imageBase64, 'base64');
                const imgName = `${Date.now()}_${payload.imageName}`;
                fs.writeFileSync(path.join(imgDir, imgName), imgBuffer);
                item.image = `/uploads/images/${imgName}`;
              } else if (isUpdate && existingImage !== undefined) {
                item.image = existingImage; // keep old or null
              }

              // Handle pdf upload
              if (payload.pdfBase64 && payload.pdfName) {
                const pdfBuffer = Buffer.from(payload.pdfBase64.split(',')[1] || payload.pdfBase64, 'base64');
                const pdfName = `${Date.now()}_${payload.pdfName}`;
                fs.writeFileSync(path.join(pdfDir, pdfName), pdfBuffer);
                item.pdf = `/uploads/pdfs/${pdfName}`;
              } else if (isUpdate && existingPdf !== undefined) {
                item.pdf = existingPdf; // keep old or null
              }

              if (isUpdate) {
                const index = db.findIndex((x: any) => x.id === id);
                db[index] = item;
              } else {
                db.push(item);
              }

              fs.writeFileSync(dataPath, JSON.stringify(db, null, 2));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, data: item }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, message: err.message }));
            }
          });
          return;
        }
        
        if (req.method === 'DELETE') {
          const idMatch = req.url.match(/\/(.+)/);
          if (idMatch) {
            const id = parseInt(idMatch[1], 10);
            ensureDirs();
            const db = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            const index = db.findIndex((x: any) => x.id === id);
            if (index !== -1) {
              db.splice(index, 1);
              fs.writeFileSync(dataPath, JSON.stringify(db, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Deleted' }));
              return;
            }
          }
        }

        next();
      });
    }
  };
}
