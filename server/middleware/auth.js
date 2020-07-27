const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    const { token } = req.headers
    if (!token) {
        next({ name: "TOKEN_ERROR" })
    } else {
        let decode = jwt.verify(token, 'admin')
        User.findByPk(decode.id)
            .then(data => {
                req.userData = decode
                next()
            })
    }
}

module.exports = { authentication }