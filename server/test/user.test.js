const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
// const { generateToken } = require('../helpers/jwt.js');

//token buat update, delete ?
let id;

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            done()
        })
})

describe('POST /register', () => {
    it('Success register, return status code 201 with data user', (done) => {
        let registerUser = {
            name: 'User',
            email: 'user@example.com',
            password: '1234567',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', registerUser.name)
                expect(body).toHaveProperty('email', registerUser.email)
                done()
            })
    })
    it('Empty attributes, return status code 400 with message', (done) => {
        let registerUser = {
            name: '',
            email: '',
            password: '',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                done()
            })
    })
    it('Wrong email format, return status code 400 with message', (done) => {
        let registerUser = {
            name: 'user',
            email: 'useremail',
            password: '1234567',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                done()
            })
    })
    it('Password less then 6 characters, return status code 400 with message', (done) => {
        let registerUser = {
            name: 'asd',
            email: 'asd@example.com',
            password: '123',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                done()
            })
    })
    it('Password more then 10 characters, return status code 400 with message', (done) => {
        let registerUser = {
            name: 'asd',
            email: 'asd@example.com',
            password: '12345678901',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                done()
            })
    })
})

describe('POST /login', () => {
    it('Success login, return status code 200 with token', (done) => {
        let loginUser = {
            name: 'User',
            email: 'user@example.com',
            password: '1234567',
        }
        request(app)
            .post('/login')
            .send(loginUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', loginUser.name)
                expect(body).toHaveProperty('email', loginUser.email)
                expect(body).toHaveProperty('token', expect.any(String))
                id = body.id
                done()
            })
    })
    it('Wrong email, return status code 400 with message', (done) => {
        let loginUser = {
            email: 'wrong@email.com',
            password: '1234567',
        }
        request(app)
            .post('/login')
            .send(loginUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
    it('Wrong password, return status code 400 with message', (done) => {
        let loginUser = {
            email: 'user@example.com',
            password: 'abcdefg',
        }
        request(app)
            .post('/login')
            .send(loginUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
})