<template>
  <div class="home-container">
    <el-row :gutter="20" class="welcome-section">
      <el-col :span="24">
        <h1>欢迎使用聚合支付系统</h1>
        <p class="subtitle">安全、便捷、高效的支付解决方案</p>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="features-section">
      <el-col :span="8">
        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Wallet /></el-icon>
              <span>多种支付方式</span>
            </div>
          </template>
          <div class="card-content">
            支持支付宝、微信支付、银行卡等多种支付方式，满足不同场景需求
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><DataLine /></el-icon>
              <span>实时交易监控</span>
            </div>
          </template>
          <div class="card-content">
            提供实时交易状态查询、订单管理、对账等功能，轻松管理资金流
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Lock /></el-icon>
              <span>安全可靠</span>
            </div>
          </template>
          <div class="card-content">
            采用先进的安全技术，保障交易安全，提供稳定可靠的支付服务
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="action-section">
      <el-col :span="24" class="text-center">
        <template v-if="!userStore.isLoggedIn">
          <el-button type="primary" size="large" @click="$router.push('/register')">
            立即注册
          </el-button>
          <el-button size="large" @click="$router.push('/login')">
            登录
          </el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="large" @click="$router.push('/orders')">
            查看订单
          </el-button>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Wallet, DataLine, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.home-container {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 60px;
}

.welcome-section h1 {
  font-size: 2.5em;
  color: #303133;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.2em;
  color: #606266;
}

.features-section {
  margin-bottom: 60px;
}

.feature-card {
  height: 100%;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 1.2em;
}

.card-header .el-icon {
  margin-right: 8px;
  font-size: 1.5em;
}

.card-content {
  color: #606266;
  line-height: 1.6;
}

.action-section {
  text-align: center;
}

.action-section .el-button {
  margin: 0 10px;
}

.text-center {
  text-align: center;
}
</style>