const { join } = require('path')

const express = require('express')
const protect = require(join(__dirname, '..', 'middleware', 'auth'))

const {
    createTodo,
    getAllTodos
} = require(join(__dirname, '..', 'controllers', 'todo'))

// console.log(protect)
// console.log(createTodo)

router = express.Router()

router
    .route('/')
    .post(protect, createTodo)
    .get(protect, getAllTodos)

module.exports = router