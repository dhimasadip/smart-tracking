const router = require('express').Router()
const StatusDeviceController = require('../controllers/StatusDeviceController')

router.post('/', StatusDeviceController.sendStatus)

module.exports = router