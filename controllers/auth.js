const { join } = require('path')
const { access } = require('fs')

const asyncHandler = require(join(__dirname, '..', 'middleware', 'async'))
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

    res.status(200).json({
        success: true,
        user
    })
})
