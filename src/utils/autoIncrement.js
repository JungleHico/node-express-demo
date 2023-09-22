import mongoose from 'mongoose';

/**
 * mongodb字段自增插件
 * @param {MongooseSchema} schema
 * @param {Object} options
 * @param {string} options.model - 数据模型
 * @param {string} options.field - 字段名称
 * @param {number} options.startAt - 初始值，默认1
 * @param {number} options.incrementBy - 步进值，默认1
 */
export default function autoIncrement(schema, options) {
  schema.pre('save', async function (next) {
    if (this.isNew) {
      const { model, field, startAt = 1, incrementBy = 1 } = options;

      try {
        const Model = mongoose.model(model);
        const lastDocument = await Model.findOne({}).sort({
          [field]: -1,
        });
        this[field] = lastDocument?.[field]
          ? lastDocument[field] + incrementBy
          : startAt;
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
}
