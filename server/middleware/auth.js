const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    const { token } = req.headers
    if (!token) {
        next({ name: "TOKEN_ERROR" })
    } else {
        let decode = jwt.verify(token, 'admin')
        req.userData = decode
        User.findByPk(req.userData.id)
            .then(data => {
                next()
            })
    }
}

module.exports = { authentication }