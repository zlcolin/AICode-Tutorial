import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    username: (state) => state.user?.username,
    userId: (state) => state.user?.id
  },

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('/api/users/login', {
          username,
          password
        })
        
        if (response.data.status === 'success') {
          this.user = response.data.data
          localStorage.setItem('token', response.data.token)
          return true
        }
        return false
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },

    async register(username, password, email, resourceId, phone, wechat) {
      try {
        const response = await axios.post('/api/users/register', {
          username,
          password,
          email,
          resourceId,
          phone,
          wechat
        })
        
        if (response.data.status === 'success') {
          return true
        }
        return false
      } catch (error) {
        console.error('注册失败:', error)
        return false
      }
    },

    async fetchUserInfo() {
      if (!this.userId) return
      
      try {
        const response = await axios.get(`/api/users/${this.userId}`)
        if (response.data.status === 'success') {
          this.user = response.data.data
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('token')
    }
  }
})