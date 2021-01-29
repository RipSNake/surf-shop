require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// require routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');


const app = express();

// Connect to the database
const server = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_KEY+'@cluster0.8ppim.mongodb.net/'+process.env.DB_HOST+'?retryWrites=true&w=majority';

mongoose.connect(server, { 
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errors:'));
db.once('open', () => {
  console.log('we\'re connected');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Set up session
app.use(session({
  secret: 'overloaded mind',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set title middleware
app.use(function(req, res, next) {
  res.locals.title = "Surf Shop";
  next();
});

// Routes
app.use('/', indexRouter); // 
app.use('/posts', postsRouter); // 
app.use('/posts/:id/reviews', reviewsRouter); // to have access to the id of the post the review belongs to

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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

module.exports = app;
