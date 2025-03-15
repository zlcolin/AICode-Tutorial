<template>
  <div class="user-list-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
        </div>
      </template>
      
      <el-table
        :data="userList"
        v-loading="loading"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="wechat" label="微信" />
        <el-table-column prop="createdAt" label="注册时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const loading = ref(false)
const userList = ref([])

const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await userStore.fetchUsers()
    userList.value = response.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.user-list-container {
  padding: 20px;
}
.box-card {
  margin: 20px auto;
  max-width: 1200px;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>