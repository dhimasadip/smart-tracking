const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generate_token } = require('../helpers/jwt')

class UserController {

    static register(req, res, next) {
        const { name, email, password } = req.body
        if(password.trim() == '') {
            return next({ str_code: 'REGISTRATION_VALIDATION', err_data: `Password can't be empty` })
        }

        User.create({ name, email, password })
            .then(data => {
                let {...newUser} = data.dataValues
                delete newUser.password
                delete newUser.createdAt
                delete newUser.updatedAt

                res.status(201).json(newUser)
            })
            .catch(err => {
                if (err.errors) {
                    let err_data = err.errors.map(el => {
                        if (el.message == 'email must be unique') {
                            return 'Email already exist'
                        }
                        return el.message
                    })

                    err_data = err_data.join('. ')

                    next({ str_code: 'REGISTRATION_VALIDATION', err_data })
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR' })
                }
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const { ...userData } = user.dataValues
                        delete userData.password
                        delete userData.createdAt
                        delete userData.updatedAt

                        const token = generate_token(userData)
                        userData.token = token
    
                        res.status(200).json(userData)
                    } else {
                        next({ str_code: 'INCORRECT_PASSWORD'})
                    }
                } else {
                    next({ str_code: 'EMAIL_NOT_FOUND'})
                }
            })
            .catch((err) => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }

}

module.exports = UserController