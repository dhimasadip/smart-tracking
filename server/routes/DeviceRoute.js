const router = require('express').Router()
const DeviceController = require('../controllers/DeviceController')
const HistoryController = require('../controllers/HistoryController')
const StatusDeviceController = require('../controllers/StatusDeviceController')
const authentication = require('../middlewares/authentication')

router.post('/', DeviceController.addDevice)
router.use(authentication)
router.get('/', DeviceController.listDevice)
router.get('/:id', StatusDeviceController.getStatus)
router.get('/:id/histories', HistoryController.getHistory)
router.get('/:id/current', HistoryController.currentLocation)


module.exports = router