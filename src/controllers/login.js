import express from 'express';
import User from '../models/user.js';
import { createToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

const loginRouter = express.Router();

// 登录
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  // 参数检查
  if (!username || !password) {
    return res.error('Username, password are required', 400);
  }

  try {
    // 检查用户是否存在
    const user = await User.findOne({ username }, { __v: 0 });
    if (!user) {
      return res.error('Username does not exist', 401);
    }
    // 校验密码
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.error('Password is incorrect', 401);
    }
    res.success(createToken(user._id));
  } catch (error) {
    res.error(error.message);
  }
});

// 注册
loginRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // 参数检查
  if (!username || !password) {
    return res.error('Username, password are required', 400);
  }

  try {
    // 检查用户是否存在
    const user = await User.findOne({ username });
    if (user) {
      return res.error('User is existed', 400);
    }

    // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // 创建用户
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const result = await User.findOne({ username }, { password: 0, __v: 0 });
    res.success(result);
  } catch (error) {
    res.error(error.message);
  }
});

export default loginRouter;
