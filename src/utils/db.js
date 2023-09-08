import mongoose from 'mongoose';
import dbConfig from '../config/db.js';

export default async function connectDatabase() {
  console.log('MongoDB connecting...');

  try {
    const uri = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
