const { User } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserControllers {

    static register(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(data => {
                if (!data) {
                    let obj = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }
                    return User.create(obj)
                } else {
                    throw ({
                        name: 'EMAIL_ALREADY_REGISTER'
                    })
                }
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then((user, err) => {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, 'admin')
                    res.status(200).json({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token
                    })
                } else {
                    throw({ name: "USERNAME_PASSWORD_SALAH" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserControllers