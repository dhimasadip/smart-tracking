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
                    // console.log(data, 'else');
                    res.status(201).json(data)
                }
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                // console.log(err, '<<<');
                next(err)
                // res.status(400).json(err)
                // res.send(err)
            })
    }

    static login(req, res, next) {
        // console.log(req.body.password, "ini req body")
        User.findOne({ where: { email: req.body.email } })
            .then((user, err) => {
                // console.log(req.body.password, user.password, "ini req body")
                // console.log(bcrypt.compareSync(req.body.password, user.password), "ini bcrypt")
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, 'admin')
                    // console.log("masuk login berhasil");
                    res.status(200).json({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token
                    })
                } else {
                    // next({name: "USERNAME_PASSWORD_SALAH"})
                    // console.log("else nya login User Controller")
                    // next(err)
                    res.status(400).json({ message: "Username or password salah" })
                }
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

}

module.exports = UserControllers