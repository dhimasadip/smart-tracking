const router = require('express').Router()
const UserRoute = require('./UserRoute')
const DeviceRoute = require('./DeviceRoute')
const BuzzerRoute = require('./BuzzerRoute')
const StatusRoute = require('./StatusRoute')
const HistoryRoute = require('./HistoryRoute')
const ConnectionRoute = require('./ConnectionRoute')

router.get('/', (req, res, next) => {
    res.status(200).json({ 
        message: 'Welcome Smart Tracking',
    })
})

router.use('/', UserRoute)
router.use('/devices', DeviceRoute)
router.use('/pairing', ConnectionRoute)
router.use('/buzzer', BuzzerRoute)
router.use('/status', StatusRoute)
router.use('/location', HistoryRoute)

module.exports = router