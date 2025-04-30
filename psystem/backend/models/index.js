import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize, Sequelize } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const files = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .sort((a, b) => {
    // 确保User模型先加载
    if (a === 'user.js') return -1;
    if (b === 'user.js') return 1;
    return 0;
  });

// 先加载所有模型
const models = [];
for (const file of files) {
  const model = (await import(path.join(__dirname, file))).default;
  if (model && model.name) {
    db[model.name] = model;
    models.push(model);
  }
}

// 所有模型加载完成后再执行关联配置
for (const model of models) {
  if (model.associate) {
    model.associate(db);
  }
}


// 设置db对象的属性
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 导出db对象和Sequelize
export default db;
export { Sequelize };
