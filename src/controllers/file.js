import express from 'express';
import multer from 'multer';
import fs from 'fs';
import getFilePath from '../utils/filePath.js';

const fileRouter = express.Router();

// 使用multer中间件进行文件上传
const storage = multer.diskStorage({
  // 文件存储路径
  destination(req, file, callback) {
    const path = 'data/files/';
    // 如果没有目录则创建
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
      callback(null, path);
    });
  },
  // 文件名
  filename(req, file, callback) {
    const { originalname } = file;
    callback(
      null,
      Date.now() + originalname.slice(originalname.lastIndexOf('.'))
    );
  },
});

const upload = multer({ storage });

// 文件上传
fileRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.error('Params error', 400);
  } else {
    res.success(req.file.filename);
  }
});

// 文件下载
fileRouter.get('/download/*', (req, res) => {
  const url = req.url.slice('/download'.length);
  const filePath = getFilePath(`./data/files${url}`);

  fs.stat(filePath, (err, stat) => {
    if (!err) {
      res.sendFile(filePath);
    } else {
      res.error('File not found', 404);
    }
  });
});

export default fileRouter;
