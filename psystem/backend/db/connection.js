import { Sequelize } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
const config = (await import('../config/config.js')).default[env];

// 创建并导出sequelize实例
export const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// 导出Sequelize类
export { Sequelize };