require('dotenv').config();
//MONGODB_URI=mongodb://localhost:27017/dev-project--module2
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60
    }),
    secret: process.env.SESS_SECRET,
    resave: true, 
    saveUninitialized: false, 
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      }
  })
)

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'iStock';

const index = require('./routes/index');
app.use('/', index);

const account = require('./routes/account');
app.use('/account', account);

const list = require('./routes/list');
app.use('/list', list);

const authRouter = require('./routes/auth');
app.use('/', authRouter);

const detailRouter = require('./routes/detail');
app.use('/detail', detailRouter);

module.exports = app;