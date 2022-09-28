// express imports
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// dotenv
require('dotenv').config()
// routers
const indexRouter = require('./routes/index.routes')
const usersRouter = require('./routes/files.routes')
// app
const app = express()
// view engine setup
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRouter)
app.use('/files', usersRouter)
app.use(function (req, res, next) {
  res.status(404).send({
    code: 404,
    message: 'Not found'
  })
})

module.exports = app
