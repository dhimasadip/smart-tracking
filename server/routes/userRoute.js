const route = require('express').Router()
const UserControllers = require('../controllers/UserControllers')

// find one, Create Read
// name email password
// register, find one

route.post('/register', UserControllers.register)
route.post('/login', UserControllers.login)

module.exports = route