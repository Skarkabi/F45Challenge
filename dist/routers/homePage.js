"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var _default = exports["default"] = router;