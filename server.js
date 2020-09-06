const { join } = require('path')

const colors = require('colors')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')

dotenv.config({ path: join(__dirname, 'config', 'config.env') })

// MONGO DB
const connectDB = require(join(__dirname, 'config', 'db'))
connectDB()

// Express App
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body Parsing
app.use(express.json())

// Routes
const auth = require(join(__dirname, 'routes', 'auth'))
const todo = require(join(__dirname, 'routes', 'todo'))

app.use('/api/v1/auth', auth)
app.use('/api/v1/todo', todo)

// Error Handling 
const errorHandler = require(join(__dirname, 'middleware', 'error'))
app.use(errorHandler)

const PORT = process.env.PORT
const MODE = process.env.NODE_ENV
server = app.listen(PORT, () => {
    console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`.bold.red)
    server.close(process.exit(1))
})

