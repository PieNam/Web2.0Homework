var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

module.exports = function(db) {
  var routes = require('./routes/index')(db);
  var app = express();
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: 'Web Homework is annoying yet interesting'
  }));
  // asign static dir (for including *.css, *.js)
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

  return app;
}
