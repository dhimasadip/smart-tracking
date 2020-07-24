const {User} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserControllers {

    static register (req,res,next){
        
        User.findOne({where: {email: req.body.email}})
        .then(data=>{
            console.log("masuk");
            if( !data ){
                console.log("masuk2");
                let obj = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                
                return User.create(obj)
            }   else {
                console.log("masuk2");
                res.status(201).json( JSON.stringify(user) )
                // next({name: "USERNAME_SUDAH_ADA"})
            }
        })
        .then(user =>{
            console.log(user, "user usercontroller")
            res.status(201).json( JSON.stringify(user) )
        }) 
        .catch(err=>{
            console.log(JSON.stringify(err), "catch register usercontroller")
            res.status(201).json( err )
            // next(err)
        })
    }

    static login (req,res,next){
        // console.log(req.body.password, "ini req body")
        User.findOne({where: {email: req.body.email}})
        .then((user, err) =>{
            // console.log(req.body.password, user.password, "ini req body")
            // console.log(bcrypt.compareSync(req.body.password, user.password), "ini bcrypt")
            if( user && bcrypt.compareSync(req.body.password, user.password) ){
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'admin' )
                console.log("masuk login berhasil");
                res.status(200).json(token)
            } else {
                // next({name: "USERNAME_PASSWORD_SALAH"})
                console.log("else nya login User Controller")
                // next(err)
                res.status(400).json({message: "Username or password salah"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

}

module.exports = UserControllers