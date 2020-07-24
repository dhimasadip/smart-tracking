const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { User, Device } = require('../models')
const jwt = require('jsonwebtoken');

let user = {
  email: 'user@example.com',
  password: '1234567',
}
let device = {
  deviceCode: '1',
  UserId: 1,
}

let token;
let id;
let idDevice;

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      const { id, email } = data
      // token = generateToken({ id, email })
      token = jwt.sign({ id, email }, 'admin')
      done();
    })
    .catch((err) => done(err));
  Device.create(device)
    .then((data) => {
      const { id, UserId } = data
      idDevice = id
      done();
    })
})

afterAll((done) => {
  return queryInterface.bulkDelete('Histories')
    .then(() => {
      return queryInterface.bulkDelete('Devices')
    })
    .then(() => {
      return queryInterface.bulkDelete('Users')
    })
    .then(() => {
      done()
    })
})

describe('POST /devices/:id/history', () => {
  it('Success, return status code 200 with message', (done) => {
    let newHistory = {
      longtitude: 1.11,
      latitude: 2.22
    }
    request(app)
      .post(`/devices/${idDevice}/histories`)
      .set('token', token)
      .send(newHistory)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('longtitude', newHistory.longtitude)
        expect(body).toHaveProperty('latitude', newHistory.latitude)
        expect(body).toHaveProperty('UserId', expect.any(Number))
        id = body.id
        done()
      })
  })
  it('Empty attributes, return status code 400 with message', (done) => {
    let newHistory = {
      longtitude: 0,
      latitude: 0
    }
    request(app)
      .post(`/devices/${idDevice}/histories`)
      .set('token', token)
      .send(newHistory)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})

describe('GET /devices/:id/current', () => {
  it('Success find all, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${idDevice}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Array))
        done()
      })
  })
})

// describe('GET /devices/:id/histories/:id', () => {
//   it('Success, return status code 200 with data', (done) => {
//     request(app)
//       .get(`/devices/${idDevice}/histories/${id}`)
//       .set('token', token)
//       .then((response) => {
//         const { body, status } = response
//         expect(status).toBe(200)
//         expect(body).toHaveProperty('id', expect.any(Number))
//         expect(body).toHaveProperty('longtitude', expect.any(Number))
//         expect(body).toHaveProperty('latitude', expect.any(Number))
//         expect(body).toHaveProperty('UserId', expect.any(Number))
//         done()
//       })
//   })
//   it('Device not found, return status code 404 with message', (done) => {
//     request(app)
//       .get(`/devices/${idDevice}/histories/77`)
//       .set('token', token)
//       .then((response) => {
//         const { body, status } = response
//         expect(status).toBe(404)
//         expect(body).toHaveProperty('message', expect.any(String))
//         done()
//       })
//   })
// })

describe(`DELETE /devices/:id/histories/:id`, () => {
  it(`Success delete, return status code 200 with message`, (done) => {
      request(app)
      .delete(`/devices/${idDevice}/histories/1`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})