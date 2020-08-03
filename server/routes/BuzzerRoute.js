const router = require('express').Router()
const BuzzerConroller = require('../controllers/BuzzerConroller')
const authentication = require('../middlewares/authentication')
router.get('/:buzzerId', BuzzerConroller.deviceRead)

router.use(authentication)
router.post('/:DeviceId/on', BuzzerConroller.turnOn)
router.post('/:DeviceId/off', BuzzerConroller.turnOff)

module.exports = router