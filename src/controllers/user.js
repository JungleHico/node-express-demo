import express from 'express';
import User from '../models/user.js';
import Joi from 'joi';

const userRouter = express.Router();

// 查询用户列表
userRouter.get('/list', async (req, res) => {
  // 分页
  const { pageSize, pageNum } = req.pagination;

  try {
    const userList = await User.find({}, { _id: 0, password: 0, __v: 0 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    const total = await User.find({}).countDocuments();

    res.success({
      list: userList,
      total,
    });
  } catch (error) {
    res.error(error.message);
  }
});

// 修改用户
userRouter.put('/:id', async (req, res) => {
  // 请求体参数验证
  const schema = Joi.object({
    status: Joi.number().valid(0, 1),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.error(error.details[0].message, 400);
  }

  try {
    const id = req.params.id;
    await User.updateOne({ userId: id }, req.body);
    const user = await User.findOne(
      { userId: id },
      { _id: 0, password: 0, __v: 0 }
    );
    res.success(user);
  } catch (error) {
    res.error(error.message);
  }
});

export default userRouter;
