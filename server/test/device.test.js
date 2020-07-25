const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { User } = require('../models')
const jwt = require('jsonwebtoken');

let user = {
  name: 'user',
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
    .catch((err) => {
      done(err)
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

describe('POST /devices', () => {
  it('Success add device, return status code 200 with message', (done) => {
    let newDevice = {
      DeviceCode: 3
    }
    request(app)
      .post('/devices')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
        id = body.id
        done()
      })
      .catch(err => {
        done(err)
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
        expect(body).toHaveProperty('DeviceCode', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
        done()
      })
  })
  it('Device not found, return status code 404 with message', (done) => {
    request(app)
      .get(`/devices/77`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})

describe('POST /devices/:id/history', () => {
  it('Success, return status code 200 with message', (done) => {
    let newHistory = {
      longitude: 1.11,
      latitude: 2.22
    }
    request(app)
      .post(`/devices/${id}/histories`)
      .set('token', token)
      .send(newHistory)
      .then((response) => {

        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('longitude', newHistory.longitude)
        expect(body).toHaveProperty('latitude', newHistory.latitude)
        expect(body).toHaveProperty('DeviceId', expect.any(Number))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty attributes, return status code 400 with message', (done) => {
    let newHistory = {
      longtitude: '',
      latitude: ''
    }
    request(app)
      .post(`/devices/${id}/histories`)
      .set('token', token)
      .send(newHistory)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(Array))
        done()
      })
  })
})

describe('GET /devices/:id/histories', () => {
  it('Success find all, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${id}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Array))
        done()
      })
  })
})

describe('GET /devices/:id/current', () => {
  it('Success find all, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${id}/current`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Array))
        done()
      })
  })
  it(`Device not found, return status code 404 with message`, (done) => {
    request(app)
      .delete(`/devices/77/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})

describe(`DELETE /devices/:id/histories/`, () => {
  it(`Success delete, return status code 200 with message`, (done) => {
    request(app)
      .delete(`/devices/${id}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })

  it(`Device not found, return status code 404 with message`, (done) => {
    request(app)
      .delete(`/devices/77/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})

token = ''

describe('GET /devices/:id/histories', () => {
  it(`Token not found, return status code 404 with message`, (done) => {
    token = ''
    request(app)
      .get(`/devices/${id}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})
describe('DELETE /devices/:id/histories/', () => {
  it(`Token not found, return status code 404 with message`, (done) => {
    token = ''
    request(app)
      .delete(`/devices/${id}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
  })
})