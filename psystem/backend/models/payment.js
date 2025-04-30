import { DataTypes } from 'sequelize';
import { sequelize } from '../config/test_db_connection.js';

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
      model: 'Order',
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
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Payment.associate = function(models) {
  Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
};

export default Payment;