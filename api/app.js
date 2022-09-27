// express imports
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// dotenv
require('dotenv').config()
// routers
const indexRouter = require('./routes/index.routes')
const usersRouter = require('./routes/files.routes')
// app
const app = express()
// view engine setup
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRouter)
app.use('/files', usersRouter)

module.exports = app
