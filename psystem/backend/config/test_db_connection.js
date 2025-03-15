import { Sequelize } from 'sequelize';
import dbConfig from './db.js';

const sequelize = dbConfig.dialect === 'sqlite' 
  ? new Sequelize({
      dialect: dbConfig.dialect,
      storage: dbConfig.storage,
      logging: dbConfig.logging
    })
  : new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool
      }
    );

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`数据库连接成功 (使用 ${dbConfig.dialect})`);
  } catch (error) {
    console.error('数据库连接失败:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();