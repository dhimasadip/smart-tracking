const jwt = require('jsonwebtoken')

const generate_token = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY)
}

const verify = (data) => {
    return jwt.verify(data, process.env.SECRET_KEY)
}


module.exports = { generate_token, verify }