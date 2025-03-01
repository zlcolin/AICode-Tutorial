import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.js';
import Order from './order.js';

const sequelize = new Sequelize(
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

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  },
  transactionId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('alipay', 'wechat', 'bank'),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('success', 'failed', 'pending', 'refunded'),
    defaultValue: 'pending'
  },
  paymentTime: {
    type: DataTypes.DATE
  },
  refundTime: {
    type: DataTypes.DATE
  },
  errorMessage: {
    type: DataTypes.STRING(255)
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

// 建立与订单表的关联关系
Payment.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(Payment, { foreignKey: 'orderId' });

export default Payment;