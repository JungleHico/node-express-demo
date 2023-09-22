import mongoose from 'mongoose';
import autoIncrement from '../utils/autoIncrement.js';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
    status: Number,
  },
  {
    timestamps: true, // 自动启动createAt和updateAt字段
  }
);

userSchema.plugin(autoIncrement, {
  model: 'User',
  field: 'userId',
});

const User = mongoose.model('User', userSchema);

export default User;
