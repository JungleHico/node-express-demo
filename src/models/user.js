import mongoose from 'mongoose';

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

const User = mongoose.model('user', userSchema);

export default User;
