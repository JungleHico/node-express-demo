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
      res.error('File not found', 404);
    }
  });
});

export default downloadRouter;
