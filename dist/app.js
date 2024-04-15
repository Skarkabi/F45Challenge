"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));
var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressBreadcrumbs = _interopRequireDefault(require("express-breadcrumbs"));
var _homePage = _interopRequireDefault(require("./routers/homePage"));
var _allowPrototypeAccess = require("@handlebars/allow-prototype-access");
var _dotenv = require("dotenv");
var _dbConnecter = _interopRequireDefault(require("./dbConnecter"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _User = _interopRequireDefault(require("./models/User"));
(0, _dotenv.config)();
(0, _dbConnecter["default"])();

/*
const userData = {
    firstName: "Saleem",
    lastName: "Karkabi",
    team: "Blue"
}

const userData2 = {
    firstName: "Saleem",
    lastName: "Karkabi",
    team: "Red"
}

User.addUser(userData).then(output => {
    console.log(output)
}).catch(err => {
    console.error(err)
})

User.addUser(userData2).then(output => {
    console.log(output)
}).catch(err => {
    console.error(err)
})

*/
_User["default"].getAllUsers().then(function (users) {
  console.log(users);
});
_handlebars["default"].registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
_handlebars["default"].registerHelper("counter", function (index) {
  return index + 1;
});
_handlebars["default"].registerHelper("greaterThan", function (x, y) {
  console.log(x);
  console.log(y);
  if (x > y) {
    return true;
  } else {
    return false;
  }
});
_handlebars["default"].registerHelper("getElement", function (array, index, property) {
  return array[parseInt(index)][property];
});
_handlebars["default"].registerHelper("add", function (a, b) {
  return a + b;
});
_handlebars["default"].registerHelper("multiply", function (a, b) {
  return a + b;
});
_handlebars["default"].registerHelper('isdefined', function (value, compare) {
  return value === compare;
});
_handlebars["default"].registerHelper('console', function (value) {
  return console.log("Outputting " + JSON.stringify(value));
});
_handlebars["default"].registerHelper('stringify', function (value) {
  return JSON.stringify(value);
});
_handlebars["default"].registerHelper('formatDate', function (value) {
  if (value) {
    return value.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
  } else {
    return "Pending Confirmation";
  }
});
_handlebars["default"].registerHelper("getArray", function (array, spot) {
  return array[parseInt(spot)];
});
_handlebars["default"].registerHelper("inarray", function (array, value) {
  if (array) {
    var found = array.find(function (arr) {
      return arr.id === value;
    });
    return found;
  }
  return false;
});
_handlebars["default"].registerHelper("upperCaseFirst", function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});
_handlebars["default"].registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '!=':
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case '<':
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case '<=':
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case '>':
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case '>=':
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case '&&':
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case '||':
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
var app = (0, _express["default"])();
var multiHelpers = (0, _handlebarsHelpers["default"])();
// view engine setup
app.set('views', _path["default"].join(__dirname, 'views'));
app.engine('hbs', (0, _expressHandlebars["default"])({
  helpers: multiHelpers,
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/',
  handlebars: (0, _allowPrototypeAccess.allowInsecurePrototypeAccess)(_handlebars["default"])
}));
app.set('view engine', 'hbs');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _expressSession["default"])({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120 * 60 * 1000
  }
}));
app.use((0, _expressFlash["default"])());
app.use(function (req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});
app.use('/', _homePage["default"]);
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.validation_error_msg = req.flash('validation_error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(_expressBreadcrumbs["default"].init());
app.use(_expressBreadcrumbs["default"].setHome({
  name: 'Dashboard',
  url: '/'
}));
app.use('/bootstrap', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', _express["default"]["static"](_path["default"].join(__dirname, '../node_modules/jquery/dist')));
app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
});

/**
 * Error handler
 */

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
_mongoose["default"].connection.once('open', function () {
  console.log('connected to MongoDB');
});
var _default = exports["default"] = app;