const route = require('express').Router()
const DeviceControllers = require('../controllers/DeviceControllers')
const {authentication} = require('../middleware/auth')

route.use(authentication)
route.post('/', DeviceControllers.addDevice)
route.get('/', DeviceControllers.showAllDevice)
route.get('/:id', DeviceControllers.showOneDevice)
route.post('/:id/histories', DeviceControllers.addHistory)
route.get('/:id/histories', DeviceControllers.showHistory)
route.delete('/:id/histories', DeviceControllers.deleteHistory)
route.get('/:id/current', DeviceControllers.showLastLocation)

module.exports = route