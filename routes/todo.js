const { join } = require('path')

const express = require('express')
const protect = require(join(__dirname, '..', 'middleware', 'auth'))

const {
    createTodo,
    deleteTodo,
    getAllTodos,
    updateTodo
} = require(join(__dirname, '..', 'controllers', 'todo'))

router = express.Router()

router
    .route('/')
    .get(protect, getAllTodos)
    .post(protect, createTodo)

router
    .route('/:id')
    .delete(protect, deleteTodo)
    .put(protect, updateTodo)

module.exports = router