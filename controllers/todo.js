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


exports.getAllTodos = asyncHandler(async (req, res, next) => {
    console.log(req.user._id.toString())

    let query = Todo
        .find({ userId: { $eq: req.user._id.toString() } })
        .select({ "_id": 1, "note": 1, "createdAt": 1 })

    const today = moment().startOf('day')
    const yesterday = moment(today).add(-1, 'days').startOf('day')
    const tomorrow = moment(today).add(+1, 'days').startOf('day')

    const yesterdayTodos = await query.find({
        createdAt: {
            $gte: yesterday.toDate(),
            $lte: today.toDate()
        }
    })

    const todayTodos = await query.find({
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    })

    const tomorrowTodos = await query.find({
        createdAt: {
            $gte: tomorrow.toDate(),
            $lte: moment(tomorrow).endOf('day').toDate()
        }
    })

    res.status(200).json({
        success: true,
        yesterday: yesterdayTodos,
        today: todayTodos,
        tomorrow: tomorrowTodos
    })
})


// module.exports.deleteTodo = asyncHandler(async (req, res) => {
//     await Todo.findByIdAndRemove(req.params.id)

//     res.status(200).json({
//         success: true,
//         data: {}
//     })
// })


// module.exports.updateTodo = asyncHandler(async (req, res) => {
//     const data = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     })
//     res.status(200).json({
//         success: true,
//         data
//     })
// })
