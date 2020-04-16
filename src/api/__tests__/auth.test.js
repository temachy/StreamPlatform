const request = require('supertest')
const server = request('localhost:3002')

describe('auth endpoint', () => {
    it('should return token', async () => {
        const res = await server.post('/api/login').send({
            login: 'test',
            password: 'test',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
})
