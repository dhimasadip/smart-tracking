const router = require('express').Router()
const userRoute = require('./userRoute')
const deviceRoute = require('./deviceRoute')

router.use('/', userRoute)
router.use('/devices', deviceRoute)

module.exports = router