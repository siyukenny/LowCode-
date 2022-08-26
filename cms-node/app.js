const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const config = require('./config')
const logs = require('./utils/logger')
const routes= require('./routes')
const login = require('./utils/login')

const { input, logger } = config.common.extend
const { controller, service } = require('./extend')

app.use(controller(app))
app.use(service(app))
app.use(input())

// view engine setup
app.set('views', path.join(__dirname, 'ejs'));
app.set('view engine', 'ejs');


app.use(logger())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/cms/swagger',express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(login())
app.use(routes(app, config))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  logs.error(err)
  res.status(err.status || 500);
  next()
});

module.exports = app;
