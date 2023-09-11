import express from 'express';

const error404Router = express.Router();

error404Router.all('/*', (req, res) => {
  res.error('404 not found', 404);
});

export default error404Router;
