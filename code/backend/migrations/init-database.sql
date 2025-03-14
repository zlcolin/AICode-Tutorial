-- 创建数据库
CREATE DATABASE IF NOT EXISTS payment_system 
    DEFAULT CHARACTER SET utf8mb4 
    DEFAULT COLLATE utf8mb4_unicode_ci;

-- 创建用户并授权
CREATE USER 'PS01'@'%' IDENTIFIED BY 'PS01PWD';
CREATE USER 'PS01'@'localhost' IDENTIFIED BY 'PS01PWD';

-- 授予完整权限（生产环境建议按需授权）
GRANT ALL PRIVILEGES ON payment_system.* TO 'PS01'@'%';
GRANT ALL PRIVILEGES ON payment_system.* TO 'PS01'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;