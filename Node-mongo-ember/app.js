var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/RampUsersDB')
mongoose.connect('mongodb://localhost:27017/userRamps')

var routes = require('./routes/index');
var user = require('./routes/user');


var app = express();


/*
var userFeatures = require('./model/RampUsersFeaturesDB.js')

userFeatures.create({customerNo: "0aj", features: {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "2cj", features: {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "3dj", features: {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "4ej", features: {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }}, function(error, object) {
  console.log(object);
});
*/

/*
userFeatures.create({customerNo: "0aj", features: "Authentication", settings: false}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "0aj", features: "Instrumentation", settings: true}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "0aj", features: "Notificaitons", settings: false}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "0aj", features: "Email_marketting", settings: true}, function(error, object) {
  console.log(object);
});

userFeatures.create({customerNo: "0aj", features: "GoSocial", settings: true}, function(error, object) {
  console.log(object);
});
*/
/*
var model = require('./model/model.js')
model.create({customerNo: "1bj", username: "pani", password: "pani"}, function(error, object) {
  console.log(object);
});

model.create({customerNo: "2cj", username: "pani1", password: "pani1"}, function(error, object) {
  console.log(object);
});

model.create({customerNo: "3dj", username: "pani2", password: "pani2"}, function(error, object) {
  console.log(object);
});

model.create({customerNo: "4ej", username: "pani3", password: "pani3"}, function(error, object) {
  console.log(object);
});
*/

/*
var feature = require("./model/Features.js");
feature.create({features: {"Logging" : true, "Authentication": false, "Instrumentation" : true, "Notificaitons": false, "Email_marketting": true, "GoSocial": true }}, function(error, object) {
  console.log(object);
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    // Handle the get for this route
});

app.post('/user', function(req, res, next) {
    // Handle the post for this route
    //alert(req.body);
});

app.use('/index', routes);
app.use('/user', user);
app.use('/user/addUser', user);
app.use('/user/listUsers', user);
app.use('/user/getSettings', user);
app.use('/user/getUser', user);
app.use('/user/getUserSettings', user);
app.use('/user/saveSettings', user);
app.use('/user/saveDefaultSettings', user);



// catch 404 and forward     to error handler
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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
