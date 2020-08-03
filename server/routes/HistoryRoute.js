const router = require('express').Router()
const HistoryController = require('../controllers/HistoryController')

router.post('/', HistoryController.send)

module.exports = router