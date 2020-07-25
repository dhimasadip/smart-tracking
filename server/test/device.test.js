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
  // console.log('XXXXXXXXXXXX');
  User.create(user)
    .then((data) => {
      // console.log(data, '<<<<< dataaaa');
      const { id, email } = data
      token = jwt.sign({ id, email }, 'admin')
      // console.log(token, '<<<<<<<<<<<  token');
      done();
    })
    .catch((err) => {
      // console.log(err, 'beforeAll');
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
        console.log(id, body, status, '<<<<< post device');
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
        // expect(body).toHaveProperty('message', expect.any(String))
        id = body.id
        done()
      })
      .catch(err => {
        // console.log(err, '<<<');
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
        // console.log(id, body, status, '<<<< body');
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
        console.log(token, id, body, status, 'ini history');
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('longitude', newHistory.longitude)
        expect(body).toHaveProperty('latitude', newHistory.latitude)
        expect(body).toHaveProperty('DeviceId', expect.any(Number))
        // id = body.id
        done()
      })
      .catch(err => {
        // console.log(err, '<<<< err history');
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
})

// describe(`DELETE /devices/:id/histories/:id`, () => {
//   it(`Success delete, return status code 200 with message`, (done) => {
//       request(app)
//       .delete(`/devices/${idDevice}/histories/1`)
//       .set('token', token)
//       .then((response) => {
//         const { body, status } = response
//         expect(status).toBe(200)
//         expect(body).toHaveProperty('message', expect.any(String))
//         done()
//       })
//   })
// })