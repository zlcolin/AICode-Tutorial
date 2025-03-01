// 数据库配置文件
export default {
  database: 'payment_system',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}