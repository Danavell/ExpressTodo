const { join } = require('path')

const ErrorResponse = require(join(__dirname, '..', 'utils', 'ErrorResponse'))


const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    console.log(err.name)

    if (err.name === 'CastError') {
        message = `Resource with id: ${err.value} not found`
        error = new ErrorResponse(message, 404)
    }

    if (err.code === 11000) {
        message = 'Duplicate value provided'
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500)
        .json({
            success: false,
            message: error.message || 'ServerError'
        })
}

module.exports = errorHandler