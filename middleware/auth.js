const { join } = require('path')

const asyncHandler = require(join(__dirname, 'async'))
const ErrorResponse = require(join(__dirname, 'utils', 'ErrorResponse'))
const jwt = require('jsonwebtoken')
const User = require(join(__dirname, 'models', 'User'))


module.exports.protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    else if (req.cookie.token) {
        token = req.cookie.token
    }

    else {
        return next(ErrorReponse('Not authorized to access this route', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        req.user = await User.findById(decoded.id)
    } catch (err) {
        return next(ErrorReponse('Not authorized to access this route', 401))
    }
})