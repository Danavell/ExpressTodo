const { join } = require('path')

const express = require('express')
const {
    register
} = require(join(__dirname, '..', '..', 'controllers', 'auth'))

router = express.Router()

router
    .post('/register', register)

module.exports = router