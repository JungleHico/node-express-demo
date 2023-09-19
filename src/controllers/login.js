import express from 'express';
import User from '../models/user.js';
import { createToken } from '../middlewares/token.js';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import { getSequence } from '../models/counter.js';

const loginRouter = express.Router();

// 登录
loginRouter.post('/', async (req, res) => {
  // 请求体参数验证
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.error(error.details[0].message, 400);
  }

  try {
    const { username, password } = req.body;
    // 检查用户是否存在
    const user = await User.findOne({ username, status: 1 });
    if (!user) {
      return res.error('Wrong username or password', 401);
    }
    // 校验密码
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.error('Wrong username or password', 401);
    }
    res.success(createToken(user.userId));
  } catch (error) {
    res.error(error.message);
  }
});

// 注册
loginRouter.post('/register', async (req, res) => {
  // 请求体参数验证
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.error(error.details[0].message, 400);
  }

  try {
    const { username, password } = req.body;
    // 检查用户是否存在
    const user = await User.findOne({ username });
    if (user) {
      return res.error('User is existed', 400);
    }

    // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 创建用户
    const userId = await getSequence('user');
    const newUser = new User({
      userId,
      username,
      password: hashedPassword,
      status: 1,
    });
    await newUser.save();
    const result = await User.findOne(
      { username },
      { _id: 0, password: 0, __v: 0 }
    );
    res.success(result);
  } catch (error) {
    res.error(error.message);
  }
});

export default loginRouter;
