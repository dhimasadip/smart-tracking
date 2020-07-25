const {User, Device} = require('../models')
const jwt = require('jsonwebtoken')

function authentication (req,res,next) {
    const {token} = req.headers
    if( !token ){
        next({name: "TOKEN_ERROR"})
    } else {
        let decode = jwt.verify( token, 'admin' )
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(data=>{
            if( data ){
                next()
            } else {
                next({name: "USER_NOT_FOUND"})
            }
        })
    }
}

function cartAuthentication (req,res,next) {
    const {token} = req.headers
    if( !token ){
        next({name: "TOKEN_ERROR"})
    } else {
        let decode = jwt.verify( token, 'admin' )
        req.userData = decode
        Customer.findByPk(req.userData.id)
        .then(data=>{
            if( data ){
                next()
            } else {
                next({name: "USER_NOT_FOUND"})
            }
        })
    }
}

function cartAuthorization (req,res,next) {
    const id = req.params.id
    Cart.findByPk(id)
    .then(data=>{
        if( !data ){
            next({name: "CART_NOT_FOUND"})
        } else if( data.CustomerId !== req.userData.id ){
            next({name: "NOT_AUTHRORIZED"})
        } else {
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

function authorization (req,res,next) {
    User.findOne({where: {id: req.userData.id}})
    .then(data=>{
        if( !data ){
            next({name: "USER_NOT_FOUND"})
        } else if( data.role !== 'admin' ){
            console.log(data," inidata auth admin atau bukan")
            next({name: "NOT_AUTHRORIZED"})
        } else {
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = { authentication, authorization, cartAuthorization, cartAuthentication }