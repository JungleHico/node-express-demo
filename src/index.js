import express from 'express';
import morgan from 'morgan';
import connectDatabase from './utils/db.js';
import wrapResponse from './middlewares/wrapResponse.js';
import { authorization } from './middlewares/token.js';
import defaultPagination from './middlewares/defaultPagination.js';
import loginRouter from './controllers/login.js';
import userRouter from './controllers/user.js';
import fileRouter from './controllers/file.js';
import useWebSocketRouter from './controllers/websocket.js';
import error404Router from './controllers/error404.js';

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

// 设置默认分页参数的中间件
app.use(defaultPagination);

// 路由
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);
useWebSocketRouter(app, '/ws');
// 其他路由返回404
app.use('/*', error404Router);

// 数据库
connectDatabase().then(() => {
  // 启动服务
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
