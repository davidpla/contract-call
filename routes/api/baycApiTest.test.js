const request = require('supertest')
const express = require('express')

jest.mock('../../services/baycContractService/baycContractService', () => ({
  getBAYCContractData: jest.fn().mockResolvedValue({ foo: 'bar' })
}))

const baycApiTest = require('./baycApiTest')

const app = express()
app.use('/api/baycApiTest', baycApiTest)

describe('GET /api/baycApiTest', () => {
  it('should return success and data', async () => {
    const res = await request(app).get('/api/baycApiTest/')
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data).toEqual({ foo: 'bar' })
  })
})