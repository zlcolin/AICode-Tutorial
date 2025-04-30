import { beforeAll, afterAll } from 'vitest'
import { Sequelize } from 'sequelize'
import dbConfig from '../config/config.js'
import User from '../models/user.js'

// 测试数据库配置
const testDbConfig = {
  ...dbConfig,
  // 指定使用 MySQL 数据库
  dialect: 'mysql',
  // 测试数据库名
  database: 'psystem',
  // MySQL 主机地址
  host: '192.168.229.26',
  // MySQL 端口
  port: 3306,
  // MySQL 用户名
  username: 'PS01',
  // MySQL 密码
  password: 'PS01PWD'
}

// 创建测试数据库连接
export const sequelize = new Sequelize(testDbConfig)

beforeAll(async () => {
  // 强制同步所有模型到数据库
  await sequelize.sync({ force: true })
  // 初始化测试数据（如果需要）
  await User.create({
    username: 'testadmin',
    password: 'admin123',
    email: 'admin@test.com'
  })
})

afterAll(async () => {
  await sequelize.close()
})