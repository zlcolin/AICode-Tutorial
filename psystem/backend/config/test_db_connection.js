import { Sequelize } from 'sequelize';
import config from './config.js';
const dbConfig = config.development;

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
    pool: dbConfig.pool
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`数据库连接成功 (使用 ${dbConfig.dialect})`);
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

// Run the test connection but don't close it
testConnection();