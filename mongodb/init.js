// 连接到admin数据库
db = db.getSiblingDB('admin');

// 创建数据库
db.createCollection('mydb');

// 切换数据库
db = db.getSiblingDB('mydb');

// 创建用户
db.createUser({
  user: 'myuser',
  pwd: 'mypassword',
  roles: [{ role: 'readWrite', db: 'mydb' }],
});
