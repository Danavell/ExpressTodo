const path = require('path')

const moment = require('moment')

const asyncHandler = require(path.join(__dirname, '..', 'middleware', 'async'))
const Todo = require(path.join(__dirname, '..', 'models', 'Todo'))
const ErrorResponse = require(path.join(__dirname, '..', 'utils', 'ErrorResponse'))

exports.createTodo = asyncHandler(async (req, res, next) => {
    const { note } = req.body
    const id = req.user._id

    const data = await Todo.create({
        note,
        userId: id
    })

    res.status(200).json({
        success: true,
        data
    })
})


