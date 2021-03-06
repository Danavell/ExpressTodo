const { join } = require('path')

const asyncHandler = require(join(__dirname, '..', 'middleware', 'async'))
const ErrorResponse = require(join(__dirname, '..', 'utils', 'ErrorResponse'))
const sendTokenResponse = require(join(__dirname, '..', 'utils', 'sendTokenResponse'))
const User = require(join(__dirname, '..', 'models', 'User'))

// @desc        Register User
// @route       POST api/v1/auth/register
// @access      Public
module.exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    //Create User
    const user = await User.create({
        name,
        email,
        password
    })

    sendTokenResponse(user, 200, res)
})


// @desc        Login User
// @route       POST api/v1/auth/login
// @access      Public
module.exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // validation that email and password exist
    if (!email || !password) {
        return next(new ErrorResponse('please provide an email or password', 500))
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    const isMatch = user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    sendTokenResponse(user, 200, res)
})
