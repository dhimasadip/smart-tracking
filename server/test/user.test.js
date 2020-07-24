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
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('email', user.email)
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
                expect(body).toHaveProperty('message', expect.any(String))
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
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
    it('Password less then 6 characters, return status code 400 with message', (done) => {
        let registerUser = {
            name: 'user',
            email: 'user@example.com',
            password: '12345',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
    it('Password more then 12 characters, return status code 400 with message', (done) => {
        let registerUser = {
            name: 'user',
            email: 'user@example.com',
            password: '1234567890123',
        }
        request(app)
            .post('/register')
            .send(registerUser)
            .then((response) => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
})

describe('POST /login', () => {
    it('Success login, return status code 200 with token', (done) => {
        let loginUser = {
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
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('email', user.email)
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
                expect(status).toBe(404)
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

// describe('PUT /profile/:id', () => {
//     it('Success update, return status code 200 with data update', (done) => {
//         let updateUser = {
//             name: 'userUpdate',
//         }
//         request(app)
//             .post(`/profile/${id}`)
//             .send(updateUser)
//             .then((response) => {
//                 const { body, status } = response
//                 expect(status).toBe(400)
//                 expect(body).toHaveProperty('name', updateUser.name)
//                 done()
//             })
//     })
//     it('Empty attributes, return status code 400 data update', (done) => {
//         let updateUser = {
//             name: '',
//         }
//         request(app)
//             .post(`/profile/${id}`)
//             .send(updateUser)
//             .then((response) => {
//                 const { body, status } = response
//                 expect(status).toBe(400)
//                 expect(body).toHaveProperty('name', expect.any(String))
//                 done()
//             })
//     })
// })

// describe(`DELETE /profile/:id`, () => {
//     it(`Success delete, return status code 200 with message`, (done) => {
//         request(app)
//             .delete(`/profile/1`)
//             .set('token', token)
//             .then((response) => {
//                 const { body, status } = response
//                 expect(status).toBe(200)
//                 expect(body).toHaveProperty('message', expect.any(String))
//                 done()
//             })
//     })
// })