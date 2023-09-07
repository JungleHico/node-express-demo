import express from 'express';
import fs from 'fs';
import getFilePath from '../utils/filePath.js';

const downloadRouter = express.Router();

downloadRouter.get('/*', (req, res) => {
  const filePath = getFilePath(`./data/files${req.url}`);
  console.log(filePath);

  fs.stat(filePath, (err, stat) => {
    if (!err) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({
        msg: 'File not found',
      });
    }
  });
});

export default downloadRouter;
