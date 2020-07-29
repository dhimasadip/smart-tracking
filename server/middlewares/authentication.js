const { verify } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req,res,next) => {
    
    const { token } = req.headers
    if (!token) return next({ str_code: 'TOKEN_NOT_FOUND'})
    
    try {
        const decode = verify(token)
        User.findByPk(decode.id)
        .then(data => {
            if (data) {
                req.user = decode
                next()
            } 
        })
    } catch {
        next({ str_code: 'INVALID_TOKEN' })
    }
}