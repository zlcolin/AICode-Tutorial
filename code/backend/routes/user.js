import Router from 'koa-router';
import User from '../models/user.js';

const router = new Router({ prefix: '/api/users' });

// 用户注册
router.post('/register', async (ctx) => {
  try {
    const { username, password, email, resourceId, phone, wechat } = ctx.request.body;
    console.log('Checking username:', ctx.request.body.username);
    const userExists = await User.findOne({ where: { username: ctx.request.body.username } });
    console.log('User exists:', userExists);
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { status: 'error', message: '用户名已存在' };
      return;
    }

    // 创建新用户
    const user = await User.create({
      username,
      password, // 注意：实际应用中应该对密码进行加密
      email,
      resourceId,
      phone,
      wechat
    });

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        resourceId: user.resourceId,
        phone: user.phone,
        wechat: user.wechat
      }
    };
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      ctx.status = 400;
      ctx.body = { status: 'error', message: '用户名已存在' };
    } else {
      console.error('注册错误详情:', error);
      ctx.status = 500;
      ctx.body = { status: 'error', message: '服务器内部错误' };
    }
  }
});

// 用户登录
router.post('/login', async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      ctx.status = 401;
      ctx.body = { status: 'error', message: '用户名或密码错误' };
      return;
    }
    
    if (!(await user.validPassword(password))) {
      ctx.status = 401;
      ctx.body = { status: 'error', message: '用户名或密码错误' };
      return;
    }
    ctx.body = {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        resourceId: user.resourceId,
        phone: user.phone,
        wechat: user.wechat
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

// 获取用户信息
// 获取用户列表
router.get('/', async (ctx) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

// 获取单个用户信息
router.get('/:id', async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { status: 'error', message: '用户不存在' };
      return;
    }

    ctx.body = {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        points: user.points
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { status: 'error', message: '服务器内部错误' };
  }
});

export default router;