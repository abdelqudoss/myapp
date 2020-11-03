var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoConnectionString = "mongodb://localhost/main";
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fs = require ('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
// fs.readdirSync(__dirname+'/model').foreach(function(filename){
//     console.log("you are opened the files ");
//     if(~filename.indexof('.js')) {
//         console.log("sssssssssss");
//         require(__dirname + '/model/'+filename)};
// });
});

//read all files 
fs.readdirSync(__dirname + '/model').forEach(function(filename){
    if(~filename.indexOf('.js'))  require(__dirname + '/model/' + filename)
});

//add value to schema
var silence = new Kitten({ name: 'Silence'});
console.log(silence.name); // 'Silence'

// add / edit  method to docemont
kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
   // add speak after created 

   var fluffy = new Kitten({ name: 'fluffy' });
//    fluffy.methods.speak(); // "Meow name is fluffy"
   
//add to DB    
fluffy.save(function (err, fluffy) {
    console.log(fluffy);
    console.log("sssssssssss"+err);
    if (err) {
        console.log(err);
        return console.error(err);
    };
    console.log("start the problem ");
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })

app.get('/', indexRouter);
app.use('/users', usersRouter);

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
