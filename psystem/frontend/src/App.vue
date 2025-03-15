<template>
  <el-container class="layout-container">
    <el-header>
      <el-menu
        :router="true"
        mode="horizontal"
        :ellipsis="false"
        class="nav-menu"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          聚合支付系统
        </el-menu-item>
        <div class="flex-grow" />
        <template v-if="!userStore.isLoggedIn">
          <el-menu-item index="/login">
            <el-icon><User /></el-icon>
            登录
          </el-menu-item>
          <el-menu-item index="/register">
            <el-icon><Plus /></el-icon>
            注册
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="/orders">
            <el-icon><List /></el-icon>
            我的订单
          </el-menu-item>
          <el-sub-menu index="user">
            <template #title>
              <el-icon><User /></el-icon>
              {{ userStore.username }}
            </template>
            <el-menu-item index="/profile">
              <el-icon><Setting /></el-icon>
              个人中心
            </el-menu-item>
            <el-menu-item @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-header>
    
    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import { HomeFilled, User, Plus, List, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style>
.layout-container {
  min-height: 100vh;
}

.nav-menu {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>