import express from 'express';
import multer from 'multer';
import fs from 'fs';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  // 文件存储路径
  destination(req, file, callback) {
    const path = 'data/files/';
    // callback(null, 'data/files/');
    // 如果没有上传目录则创建
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

// 上传单个文件，且字段名为file
uploadRouter.post('', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      msg: 'Params error',
    });
  } else {
    res.json({
      status: 200,
      data: req.file.filename,
      msg: 'Success',
    });
  }
});

export default uploadRouter;
