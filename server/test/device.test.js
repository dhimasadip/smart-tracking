const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { User } = require('../models')
const jwt = require('jsonwebtoken');

let user = {
  email: 'user@example.com',
  password: '1234567',
}

let token;
let id;

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      const { id, email } = data
      token = jwt.sign({ id, email }, 'admin')
      done();
    })
    .catch((err) => done(err));
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

describe('POST /devices', () => {
  it('Success add device, return status code 200 with message', (done) => {
    let newDevice = {
      DeviceCode: 1
    }
    request(app)
      .post('/devices')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
        expect(body).toHaveProperty('message', expect.any(String))
        id = body.id
        done()
      })
  })

  it('Wrong device code, return status code 400 with message', (done) => {
    let newDevice = {
      DeviceCode: '1wrong'
    }
    request(app)
      .post('/devices')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})

describe('GET /devices', () => {
  it('Success find all, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Array))
        done()
      })
  })
})

describe('GET /devices/:id', () => {
  it('Success, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${id}`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('deviceCode', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
        done()
      })
  })
  it('Device not found, return status code 404 with message', (done) => {
    request(app)
      .get(`/devices/77`)
      .set('token', token)
      .then((response) => {
        // console.log(token, '<<<<');
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})
