'use strict';
var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var index = require("./routes/index");
var randomGen = require("./routes/randomGen");

app.set('port', process.env.PORT || 3000);
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); 
// serve public files
app.use(express.static(path.join(__dirname, 'public')));
// set views
app.use(express.static(path.join(__dirname, 'views')));

// set routes
app.use('/', index);
app.use('/randomGen', randomGen);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function(){
   console.log('Server listening on port: ' + app.get('port'));
});

module.exports = app;

