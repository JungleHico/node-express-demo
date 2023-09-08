import express from 'express';
import User from '../models/user.js';

const userRouter = express.Router();

// 查询用户列表
userRouter.get('/list', async (req, res) => {
  try {
    // 过滤密码
    const userList = await User.find({}, { password: 0, __v: 0 });
    res.success(userList);
  } catch (error) {
    res.error(error.message);
  }
});

export default userRouter;
