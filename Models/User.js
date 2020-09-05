const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: string,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: string,
        required: [true, 'please add a password'],
        unique: true,
        select: false
    },
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('User', UserSchema)