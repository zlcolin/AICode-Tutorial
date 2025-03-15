module.exports.up = async (queryInterface, Sequelize) => {
  // 创建订单表
  await queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderNo: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  // 创建支付表
  await queryInterface.createTable('Payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    paymentMethod: {
      type: Sequelize.ENUM('alipay', 'wechat', 'bank'),
      allowNull: false
    },
    transactionId: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('pending', 'success', 'failed'),
      defaultValue: 'pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

module.exports.down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Payments');
  await queryInterface.dropTable('Orders');
};