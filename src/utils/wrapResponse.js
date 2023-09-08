// 封装请求结果的中间件
export default function wrapResponse(req, res, next) {
  res.success = (data) => {
    res.status(200).json({
      msg: 'Success',
      data,
    });
  };

  res.error = (errorMessage, status = 500) => {
    res.status(status).json({
      msg: errorMessage,
    });
  };

  next();
}
