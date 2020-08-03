const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { User } = require('../models')
const { generate_token } = require('../helpers/jwt');

let user = {
  name: 'user',
  email: 'user@example.com',
  password: '12345678',
}

let token;
let id;
let userId;
let buzzerId;

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      const { id, email } = data
      userId = id
      token = generate_token({ id, email })
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
      return queryInterface.bulkDelete('Connections')
    })
    .then(() => {
      return queryInterface.bulkDelete('StatusDevices')
    })
    .then(() => {
      done()
    })
})

describe('POST /devices', () => {
  it('Success add device, return status code 201 with data', (done) => {
    let newDevice = {
      deviceSerial: '3123asd'
    }
    request(app)
      .post('/devices')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        const { device, alarm } = body
        expect(status).toBe(201)
        expect(device).toHaveProperty('id', expect.any(Number))
        expect(device).toHaveProperty('deviceSerial', newDevice.deviceSerial)
        expect(alarm).toHaveProperty('id', expect.any(Number))
        expect(alarm).toHaveProperty('DeviceId', device.id)
        expect(alarm).toHaveProperty('isActive', false)
        id = device.id
        buzzerId = device.deviceSerial
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Empty deviceSerial, return status code 400 with message', (done) => {
    let newDevice = {
      deviceSerial: ''
    }
    request(app)
      .post('/devices')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Serial can't be empty`)
        done()
      })
  })
})

describe('POST /status', () => {
  it('Success add status device, return status code 201 with data', (done) => {
    let newDevice = {
      deviceSerial: '3123asd',
      statusDevice: 'Online'
    }
    request(app)
      .post('/status')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('deviceSerial', newDevice.deviceSerial)
        expect(body).toHaveProperty('statusDevice', newDevice.statusDevice)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty device serial, return status code 400 with data', (done) => {
    let newDevice = {
      deviceSerial: '',
      statusDevice: 'Online'
    }
    request(app)
      .post('/status')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Serial can't be empty`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty status device, return status code 400 with data', (done) => {
    let newDevice = {
      deviceSerial: '3123asd',
      statusDevice: ''
    }
    request(app)
      .post('/status')
      .set('token', token)
      .send(newDevice)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Status device can't be empty`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('POST /location', () => {
  it('Success add location device, return status code 201 with data', (done) => {
    let location = {
      latitude: 12.12,
      longitude: 23.23,
      deviceSerial: '3123asd',
    }
    request(app)
      .post('/location')
      .set('token', token)
      .send(location)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('latitude', location.latitude)
        expect(body).toHaveProperty('longitude', location.longitude)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty latitude device, return status code 201 with data', (done) => {
    let location = {
      latitude: '',
      longitude: 12.12,
      deviceSerial: '3123asd',
    }
    request(app)
      .post('/location')
      .set('token', token)
      .send(location)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `latitude can't be empty`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Empty longitude device, return status code 201 with data', (done) => {
    let location = {
      latitude: 12.12,
      longitude: '',
      deviceSerial: '3123asd',
    }
    request(app)
      .post('/location')
      .set('token', token)
      .send(location)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `longitude can't be empty`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('POST /pairing', () => {
  it('Success pairing device, return status code 200 with data', (done) => {
    let device = {
      deviceSerial: '3123asd'
    }
    request(app)
      .post(`/pairing`)
      .set('token', token)
      .send(device)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('DeviceId', expect.any(Number))
        expect(body).toHaveProperty('UserId', userId)
        done()
      })
  })
  it('Device unknown, return status code 400 with message', (done) => {
    let device = {
      deviceSerial: '3123asdasd'
    }
    request(app)
      .post(`/pairing`)
      .set('token', token)
      .send(device)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Unknown`)
        done()
      })
  })
  it('Device already paired, return status code 400 with message', (done) => {
    let device = {
      deviceSerial: '3123asd'
    }
    request(app)
      .post(`/pairing`)
      .set('token', token)
      .send(device)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `You already pair with device`)
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
        expect(body).toHaveProperty('deviceSerial', expect.any(String))
        expect(body).toHaveProperty('statusDevice', expect.any(String))
        done()
      })
  })
  it('Device unknown, return status code 400 with message', (done) => {
    request(app)
      .get(`/devices/77`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Device Unknown')
        done()
      })
  })
})

describe('GET /devices/:id/histories', () => {
  it('Success, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${id}/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Array))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Device unknows, return status code 400 with message', (done) => {
    request(app)
      .get(`/devices/77/histories`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Device Unknown')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('GET /devices/:id/current', () => {
  it('Success find current location, return status code 200 with data', (done) => {
    request(app)
      .get(`/devices/${id}/current`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('latitude', expect.any(Number))
        expect(body).toHaveProperty('longitude', expect.any(Number))
        expect(body).toHaveProperty('DeviceId', id)
        done()
      })
  })
  it(`Device not found, return status code 404 with message`, (done) => {
    request(app)
      .get(`/devices/77/current`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Device Unknown')
        done()
      })
  })
})

describe('GET /buzzer/:buzzerId', () => {
  it('Success get buzzer, return status 200 with data', (done) => {
    request(app)
      .get(`/buzzer/${buzzerId}`)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('isActive', false)
        done()
      })
  })
  it('Device unknown, return status 400 with message', (done) => {
    request(app)
      .get(`/buzzer/77`)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Unknown`)
        done()
      })
  })
})

describe('GET /buzzer/:DeviceId/on', () => {
  it('Success set buzzer on, return status 200 with data', (done) => {
    request(app)
      .post(`/buzzer/${id}/on`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('isActive', true)
        done()
      })
  })
  it('Device unknown, return status 400 with message', (done) => {
    request(app)
      .post(`/buzzer/77/on`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Unknown`)
        done()
      })
  })
})

describe('GET /buzzer/:DeviceId/off', () => {
  it('Success set buzzer off, return status 200 with data', (done) => {
    request(app)
      .post(`/buzzer/${id}/off`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('isActive', false)
        done()
      })
  })
  it('Device unknown, return status 400 with message', (done) => {
    request(app)
      .post(`/buzzer/77/off`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Device Unknown`)
        done()
      })
  })
})

describe('GET /buzzer/:DeviceId/off', () => {
  it('Token invalid, return status 200 with data', (done) => {
    token = 'token_invalid'
    request(app)
      .post(`/buzzer/${id}/off`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Invalid token`)
        done()
      })
  })
  it('Token not found, return status 200 with data', (done) => {
    token = ''
    request(app)
      .post(`/buzzer/${id}/off`)
      .set('token', token)
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', `Token not found`)
        done()
      })
  })
})