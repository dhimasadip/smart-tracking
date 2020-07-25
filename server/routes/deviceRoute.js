const route = require('express').Router()
const DeviceControllers = require('../controllers/DeviceControllers')
const {authentication} = require('../middleware/auth')

// add device
// find all device
// find one device --> find all history --> find one history

route.use(authentication)

// /device --> add device
route.post('/', DeviceControllers.addDevice)

// /device --> show semua device
route.get('/', DeviceControllers.showAllDevice)

// /device --> show satu device
route.get('/:id', DeviceControllers.showOneDevice)


route.post('/:id/histories', DeviceControllers.addHistory)

// /device/:id/history --> semua lokasi
route.get('/:id/histories', DeviceControllers.showHistory)

route.delete('/:id/histories', DeviceControllers.deleteHistory)

// /device/:id/current --> last location
route.get('/:id/current', DeviceControllers.showLastLocation)


module.exports = route