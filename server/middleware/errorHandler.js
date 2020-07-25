function errorHandler(err, req, res, next) {
    // console.log(err, "console log err error handler")

    let statusCode = null
    let errorMessage = null
    let errorCode = null

    switch(err.name){
        case 'TOKEN_ERROR':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Token not found'
            break

        case 'EMAIL_ALREADY_REGISTER':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Email already register'
            break 

        case 'USERNAME_PASSWORD_SALAH':
            statusCode = 400
            errorCode = err.name
            errorMessage = 'Username atau password salah'
            break

        case 'DEVICE_NOT_FOUND':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Device not found'
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

        case 'SequelizeDatabaseError':
            statusCode = 400
            errorCode = 'DATABASE_ERROR'
            errorMessage = err.errors || `must be number`
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