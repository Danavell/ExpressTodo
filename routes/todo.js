const { join } = require('path')

const express = require('express')
const protect = require(join(__dirname, '..', 'middleware', 'auth'))

const {
    createTodo,
    deleteTodo,
    getAllTodos,
    markCompletion,
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

router
    .route('/completed/:id')
    .put(protect, markCompletion)

module.exports = router