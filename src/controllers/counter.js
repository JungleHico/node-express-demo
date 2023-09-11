import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  model: {
    type: String,
    unique: true,
  },
  seq: Number,
});

const Counter = mongoose.model('counter', counterSchema);

// 自定义counter集合，用于记录其他集合的自增字段
export async function getSequence(model) {
  let seq = 1;

  try {
    const counter = await Counter.findOne({ model });
    if (counter) {
      seq = counter.seq + 1;
      await Counter.updateOne({ model }, { seq });
    } else {
      const newCounter = new Counter({
        model,
        seq: 1,
      });
      await newCounter.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    return seq;
  }
}
