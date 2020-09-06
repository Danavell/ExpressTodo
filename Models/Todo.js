const { model, Schema } = require('mongoose')

const TodoSchema = new Schema({
    note: {
        type: String,
        required: true,
        maxLength: 50
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Todo', TodoSchema)