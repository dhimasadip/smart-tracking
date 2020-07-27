const router = require('express').Router()
const ConnectionController = require('../controllers/ConnectionController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', ConnectionController.pairing)

module.exports = router