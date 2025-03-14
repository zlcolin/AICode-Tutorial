// 数据库配置文件
export default {
  database: 'payment_system',
  username: 'PS01',
  password: 'PS01PWD',
  host: '192.168.229.26',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}