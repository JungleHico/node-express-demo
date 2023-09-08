import express from 'express';
import morgan from 'morgan';
import connectDatabase from './utils/db.js';
import wrapResponse from './utils/wrapResponse.js';
import { authorization } from './utils/token.js';
import loginRouter from './controllers/login.js';
import userRouter from './controllers/user.js';
import uploadRouter from './controllers/upload.js';
import downloadRouter from './controllers/download.js';
import useWebSocketRouter from './controllers/websocket.js';

const PORT = 3000;
const app = express();

// 打印日志
app.use(morgan('combined'));

// 以json格式解析请求体
app.use(express.json());

// 封装请求结果的中间件
app.use(wrapResponse);

// 接口鉴权中间件
app.use(authorization);

// 路由
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
useWebSocketRouter(app, '/ws');

// 数据库
connectDatabase().then(() => {
  // 启动服务
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
