import Router from 'koa-router';
import Order from '../models/order.js';
import Payment from '../models/payment.js';
import User from '../models/user.js';

const router = new Router({ prefix: '/api/orders' });

// 创建订单
router.post('/', async (ctx) => {
  try {
    const { userId, amount, paymentMethod } = ctx.request.body;

    // 检查用户是否存在
    const user = await User.findByPk(userId);
    if (!user) {
      ctx.status = 404;
      ctx.body = { status: 'error', message: '用户不存在' };
      return;
    }

    // 生成订单号
    const orderNo = `ORDER${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // 创建订单
    const order = await Order.create({
      orderNo,
      userId,
      amount,
      paymentMethod,
      status: 'pending'
    });

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: order
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

// 支付订单
router.post('/:id/pay', async (ctx) => {
  try {
    const order = await Order.findByPk(ctx.params.id);
    if (!order) {
      ctx.status = 404;
      ctx.body = { status: 'error', message: '订单不存在' };
      return;
    }

    if (order.status !== 'pending') {
      ctx.status = 400;
      ctx.body = { status: 'error', message: '订单状态不正确' };
      return;
    }

    // 生成支付流水号
    const transactionId = `PAY${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // 创建支付记录
    const payment = await Payment.create({
      orderId: order.id,
      transactionId,
      amount: order.amount,
      paymentMethod: order.paymentMethod,
      paymentStatus: 'success',
      paymentTime: new Date()
    });

    // 更新订单状态
    await order.update({
      status: 'paid',
      paymentTime: new Date()
    });

    ctx.body = {
      status: 'success',
      data: {
        order,
        payment
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

// 获取订单列表
router.get('/', async (ctx) => {
  try {
    const { userId, status } = ctx.query;
    const where = {};

    if (userId) where.userId = userId;
    if (status) where.status = status;

    const orders = await Order.findAll({
      where,
      include: [{ model: Payment }],
      order: [['createdAt', 'DESC']]
    });

    ctx.body = {
      status: 'success',
      data: orders
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

// 获取订单详情
router.get('/:id', async (ctx) => {
  try {
    const order = await Order.findByPk(ctx.params.id, {
      include: [{ model: Payment }, { model: User }]
    });

    if (!order) {
      ctx.status = 404;
      ctx.body = { status: 'error', message: '订单不存在' };
      return;
    }

    ctx.body = {
      status: 'success',
      data: order
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

export default router;