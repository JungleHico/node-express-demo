import jwt from 'jsonwebtoken';
import tokenConfig from '../config/token.js';

// 免鉴权白名单
const whiteList = [
  { path: '/login', method: 'POST' },
  { path: '/login/register', method: 'POST' },
];

// token鉴权中间件
export function authorization(req, res, next) {
  const noAuth = whiteList.some(
    (item) => item.path === req.path && item.method === req.method
  );
  if (noAuth) {
    next();
  } else {
    try {
      const token = req.headers.authorization?.split(' ')?.[1] || '';
      jwt.verify(token, tokenConfig.secretKey);
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.error('TokenExpired', 401);
      } else {
        res.error('Unauthorized', 401);
      }
    }
  }
}

// 生成token
export function createToken(userId) {
  return jwt.sign({ userId }, tokenConfig.secretKey, {
    expiresIn: tokenConfig.expires,
  });
}
