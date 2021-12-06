var createError = require('http-errors');
var express = require('express');
var moment = require("moment");
moment.locale('fr');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var basicAuth = require('express-basic-auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookingRouter = require('./routes/booking');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});
const basicConf = basicAuth({
	users: { 'admin': 'AdminPass' },
	challenge: true
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);
app.use('/admin', basicConf, adminRouter );

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
  res.render('error');
});

module.exports = app;
