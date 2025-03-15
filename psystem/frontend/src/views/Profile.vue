<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <h2>个人资料</h2>
        </div>
      </template>
      
      <el-form label-width="100px" class="profile-form">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="注册时间">
          <el-input v-model="userInfo.createdAt" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const userInfo = ref({
  username: '',
  email: '',
  createdAt: ''
})

onMounted(async () => {
  await userStore.fetchUserInfo()
  if (userStore.user) {
    userInfo.value = {
      username: userStore.user.username,
      email: userStore.user.email,
      createdAt: new Date(userStore.user.createdAt).toLocaleString()
    }
  }
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.profile-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-form {
  margin-top: 20px;
}
</style>