<template>
  <div class="orders-container">
    <el-card class="orders-card">
      <template #header>
        <div class="card-header">
          <h2>我的订单</h2>
        </div>
      </template>

      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="orderId" label="订单号" width="180" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="scope">
            ¥{{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式" width="120" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === '待支付'"
              type="primary"
              size="small"
              @click="handlePay(scope.row)"
            >
              立即支付
            </el-button>
            <el-button
              size="small"
              @click="handleDetails(scope.row)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    orderId: 'ORD20240101001',
    amount: 99.99,
    paymentMethod: '支付宝',
    status: '待支付',
    createTime: '2024-01-01 12:00:00'
  },
  {
    orderId: 'ORD20240101002',
    amount: 199.99,
    paymentMethod: '微信支付',
    status: '已完成',
    createTime: '2024-01-01 13:00:00'
  }
])

const getStatusType = (status) => {
  const statusMap = {
    '待支付': 'warning',
    '已完成': 'success',
    '已取消': 'info'
  }
  return statusMap[status] || 'info'
}

const handlePay = (order) => {
  console.log('支付订单:', order)
}

const handleDetails = (order) => {
  console.log('查看订单详情:', order)
}
</script>

<style scoped>
.orders-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.orders-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #303133;
}
</style>