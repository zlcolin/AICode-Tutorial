import { beforeAll, afterAll } from 'vitest'
import { Sequelize } from 'sequelize'
import dbConfig from '../config/db.js'
import User from '../models/user.js'

// 测试数据库配置
const testDbConfig = {
  ...dbConfig,
  database: 'psystem_test.sqlite',
  storage: './psystem_test.sqlite'
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