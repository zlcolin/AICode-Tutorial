import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import User from '../models/user.js'

describe('用户接口测试', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} })
  })

  it('应该成功注册新用户', async () => {
    const response = await request(app.callback())
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com'
      })

    expect(response.status).toBe(201)
    expect(response.body.status).toBe('success')
    expect(response.body.data.username).toBe('testuser')
    expect(response.body.data.email).toBe('testuser@example.com')
  })

  it('应该验证重复用户名', async () => {
    // 先创建一个用户
    await User.create({
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com'
    })

    // 尝试创建重复用户名
    const response = await request(app.callback())
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password456',
        email: 'test2@example.com'
      })

    expect(response.status).toBe(400)
    expect(response.body.status).toBe('error')
    expect(response.body.message).toContain('用户名可能已存在')
  })
})