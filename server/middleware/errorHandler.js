function errorHandler(err, req, res, next) {
    console.log(err, "console log err error handler")

    let statusCode = null
    let errorMessage = null
    let errorCode = null

    switch(err.name){
        case 'TOKEN_ERROR':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Token not found'
            break

        case 'USER_NOT_FOUND':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'User not found'
            break 

        case 'CART_NOT_FOUND':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Cart not found'
        break 

        case 'AUTHENTICATION_FAILED':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Authentication failed'
            break 

        case 'USERNAME_SUDAH_ADA':
            statusCode = 401
            errorCode = err.name
            errorMessage = ['Username sudah ada']
            break 

        case 'USERNAME_PASSWORD_SALAH':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Username atau password salah'
            break

        case 'PRODUCT_NOT_FOUND':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Product not found'
            break
            
        case 'STOCK_KURANG':
            statusCode = 400
            errorCode = err.name
            errorMessage = 'Stock tidak cukup'
            break 
        
        case 'MINIMUM_PURCHASE':
            statusCode = 400
            errorCode = err.name
            errorMessage = 'Minimal 1'
            break 

        case 'NOT_AUTHRORIZED':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Ure not authorized'
            break 

        case 'SequelizeValidationError':
            statusCode = 400
            errorCode = 'VALIDATION_ERROR'
            const validationErrors = []
            err.errors.forEach(element => {
                validationErrors.push(element.message)
            });
            errorMessage = validationErrors
            break 

        default:
            statusCode = 500
            errorMessage = 'internal server error'
            errorCode = 'INTERNAL_SERVER_ERROR'
    }

    return res.status(statusCode).json({
        message: errorMessage
    })

}

module.exports = errorHandler