// 设置默认分页参数的中间件
export default function defaultPagination(req, res, next) {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNum = parseInt(req.query.pageNum) || 1;

  req.pagination = {
    pageSize,
    pageNum,
  };

  next();
}
