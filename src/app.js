var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


let authRouter = require('./routes/authRouter');
let moviesRouter = require('./routes/moviesRouter');
let authToken = require('./middlewares/authToken');
let characterRouter = require('./routes/charactersRouter');

var app = express();


app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'images')));
app.use('/auth', authRouter);

// se requiere token
// app.use(authToken);
app.use('/characters', characterRouter);
app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
