import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const fileRouter = express.Router();
const port = 3000;

app.use(cors());

// 获取文件信息
fileRouter.get('/info/*', (req, res) => {
  const filePath = path.resolve(__dirname, `./assets${req.url.slice(5)}`);
  fs.stat(filePath, (err, stats) => {
    if (!err) {
      res.json(stats);
    } else {
      res.status(404);
      res.send('404 Not Found');
    }
  });
});

// 获取文件
fileRouter.get('/*', (req, res) => {
  const filePath = path.resolve(__dirname, `./assets${req.url}`);
  fs.stat(filePath, (err, stats) => {
    if (!err) {
      const stream = fs.createReadStream(filePath);
      if (stream) {
        stream.on('data', (chunk) => {
          res.write(chunk);
        });
        stream.on('end', () => {
          res.end();
        });
      }
    } else {
      res.status(404);
      res.send('404 Not Found');
    }
  });
});

app.use('/file', fileRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
