const { join } = require('path')

const express = require('express')
const protect = require(join(__dirname, '..', 'middleware', 'auth'))

const {
    createTodo,
    deleteTodo,
    getAllTodos
} = require(join(__dirname, '..', 'controllers', 'todo'))

router = express.Router()

router
    .route('/')
    .delete(protect, deleteTodo)
    .get(protect, getAllTodos)
    .post(protect, createTodo)

module.exports = router