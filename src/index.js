import express from 'express';
import morgan from 'morgan';
import uploadRouter from './controllers/upload.js';
import downloadRouter from './controllers/download.js';
import useWebSocketRouter from './controllers/websocket.js';

const PORT = 3000;
const app = express();

// 打印日志
app.use(morgan('combined'));

app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
useWebSocketRouter(app, '/ws');

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
