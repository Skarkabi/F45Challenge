"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _User = _interopRequireDefault(require("../models/User"));
var router = _express["default"].Router();

/** 
 * Express Route to Displays login page.
 */
router.get('/', function (req, res, next) {
  //Checking if a user is already logged in
  //if (req.user){
  _User["default"].getAllUsers().then(function (users) {
    res.render("homePage", {
      title: 'Home Page',
      jumbotronDescription: "Welcome! This is your dashboard and you can access everything from here easily.",
      users: users,
      totalScores: users.totalScores,
      msgType: req.flash(),
      user: req.user
    });
  });

  /*}else{
     res.redirect('/login');
   }*/
});
router.post('/', function (req, res, next) {
  console.log(req.body);
  var newUser = {
    firstName: req.body.name,
    lastName: "Tester",
    team: req.body.team
  };
  _User["default"].addUser(newUser).then(function () {
    res.redirect("/");
  });
});
router.post('/update', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("THIS ONE");
          console.log(req.body);
          i = 0;
        case 3:
          if (!(i < req.body.userScores.length)) {
            _context.next = 9;
            break;
          }
          _context.next = 6;
          return _User["default"].updateScores(req.body.userScores[i]);
        case 6:
          i++;
          _context.next = 3;
          break;
        case 9:
          res.redirect("/");
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;