//express imports
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//dotenv
require('dotenv').config();
//routers
var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/files.routes');
//app
var app = express();
//view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/files', usersRouter);

module.exports = app;
