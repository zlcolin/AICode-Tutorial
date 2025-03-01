import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';

// 创建Koa应用实例
const app = new Koa();
const router = new Router();

// 使用中间件
app.use(bodyParser());

// 基础路由
router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: '聚合支付系统API服务已启动'
  };
});

// 注册路由
app.use(router.routes())
   .use(userRouter.routes())
   .use(orderRouter.routes())
   .use(router.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
  console.error('服务器错误', err);
});

// 启动服务器
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
