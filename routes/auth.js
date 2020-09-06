const { join } = require('path')

const express = require('express')
const {
    login,
    register
} = require(join(__dirname, '..', 'controllers', 'auth'))

router = express.Router()

router
    .post('/register', register)
    .post('/login', login)

module.exports = router