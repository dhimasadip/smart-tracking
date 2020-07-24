const router = require('express').Router()
const userRoute = require('./userRoute')
const deviceRoute = require('./deviceRoute')

router.get("/", function (req, res) {
    res.send({status_code: 200, message: 'Home'})
})

router.use('/', userRoute)
router.use('/devices', deviceRoute)

module.exports = router