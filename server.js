const { join } = require('path')

const colors = require('colors')
const dotenv = require('dotenv')
const express = require('express')

dotenv.config({ path: join(__dirname, 'config', 'config.env') })

// Routes
const auth = require(join(__dirname, 'routes', 'auth', 'auth'))
const errorHandler = require(join(__dirname, 'middleware', 'error'))

// MONGO DB
const connectDB = require(join(__dirname, 'config', 'db'))
connectDB()

const app = express()
app.use(express.json())

app.use('/api/v1/auth/', auth)
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

