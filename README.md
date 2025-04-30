# 聚合支付系统

## 项目简介

本项目是一个基于 Koa2 和 Vue3 开发的现代化聚合支付系统，提供多种支付方式的集成解决方案，支持支付宝、微信支付和银行卡支付等多种支付渠道。

## 技术栈

### 后端技术栈
- Koa2：轻量级的 Node.js Web 框架
- Sequelize：ORM 框架，用于数据库操作
- MySQL：关系型数据库

### 前端技术栈
- Vue3：渐进式 JavaScript 框架
- Element Plus：基于 Vue3 的组件库
- Vite：现代前端构建工具
- Pinia：Vue3 的状态管理方案
- Vue Router：Vue.js 的官方路由

## 核心功能

- 多支付渠道集成
  - 支付宝支付
  - 微信支付
  - 银行卡支付

- 订单管理
  - 订单创建和查询
  - 支付状态实时更新
  - 订单历史记录

- 用户系统
  - 用户注册和登录
  - 个人中心
  - 交易记录查询

## 项目结构

```
├── psystem
│   ├── backend         # 后端代码
│   │   ├── config     # 配置文件
│   │   ├── models    # 数据模型
│   │   ├── routes    # 路由控制
│   │   └── app.js    # 应用入口
│   │
│   └── frontend        # 前端代码
│       ├── src        # 源代码
│       ├── public     # 静态资源
│       └── index.html # HTML 入口
```

## 快速开始

### 环境要求
- Node.js >= 14
- MySQL >= 5.7

### 后端部署
1. 进入后端目录
```bash
cd psystem/backend
```

2. 安装依赖
```bash
npm install
```

3. 配置数据库
在项目根目录创建 `.env` 文件，根据需要配置数据库连接信息：

```env
# 数据库类型配置 (支持 sqlite 或 mysql)
DB_DIALECT=sqlite

# SQLite配置
DB_STORAGE=./psystem.sqlite  # SQLite数据库文件路径

# MySQL配置（如果使用MySQL，请配置以下信息）
DB_NAME=psystem
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

# 数据库连接池配置（可选）
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```
4. 初始化数据库
```bash
npx sequelize db:migrate
```

5. 启动服务
```bash
npm start
```

### 前端部署
1. 进入前端目录
```bash
cd psystem/frontend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## 开发环境

### 环境要求
- Node.js >= 14
- MySQL >= 5.7

### 后端部署
1. 进入后端目录 
```bash
cd psystem/backend
```         

### 前端UI框架
- Tailwind CSS
- HeadlessUI

2. 安装依赖
```bash
npm install
```

3. 配置数据库
在项目根目录创建 `.env` 文件，根据需要配置数据库连接信息：

```env
# 数据库类型配置 (支持 sqlite 或 mysql)
DB_DIALECT=sqlite

# SQLite配置
DB_STORAGE=./psystem.sqlite  # SQLite数据库文件路径

# MySQL配置（如果使用MySQL，请配置以下信息）
DB_NAME=psystem
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

# 数据库连接池配置（可选）
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```                    

4. 启动服务
```bash
npm run dev
```

### 前端部署
1. 进入前端目录
```bash
cd psystem/frontend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## 测试

### 环境要求
- Node.js >= 16
- npm >= 8

### 前端测试
1. 进入前端目录
```bash
cd psystem/frontend
```

2. 安装依赖（如果尚未安装）
```bash
npm install
```

3. 运行测试
```bash
npm test
```

测试将执行以下内容：
- 组件渲染测试
- 用户交互测试
- API调用测试
- 生成测试覆盖率报告

测试完成后，可以在控制台查看测试结果和覆盖率报告。

## 辅助工具
https://github.com/ahmedkhaleel2004/gitdiagram
https://node-modules.dev/