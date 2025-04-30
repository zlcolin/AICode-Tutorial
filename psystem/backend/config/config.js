import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  development: {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE)
    }
  },
  production: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '5'),
      min: parseInt(process.env.DB_POOL_MIN || '0'),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000'),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000')
    }
  }
};

export function testEnvConfig() {
  console.log('Testing .env configuration:');
  console.log('DB_DIALECT:', process.env.DB_DIALECT || 'Not set');
  console.log('DB_HOST:', process.env.DB_HOST || 'Not set');
  console.log('DB_PORT:', process.env.DB_PORT || 'Not set');
  console.log('DB_USER:', process.env.DB_USER || 'Not set');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '*****' : 'Not set');
  console.log('DB_NAME:', process.env.DB_NAME || 'Not set');
  console.log('DB_POOL_MAX:', process.env.DB_POOL_MAX || 'Not set');
  console.log('DB_POOL_MIN:', process.env.DB_POOL_MIN || 'Not set');
  console.log('DB_POOL_ACQUIRE:', process.env.DB_POOL_ACQUIRE || 'Not set');
  console.log('DB_POOL_IDLE:', process.env.DB_POOL_IDLE || 'Not set');
}

export default config;


testEnvConfig();