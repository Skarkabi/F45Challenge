"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bluebird = _interopRequireDefault(require("bluebird"));
var Schema = _mongoose["default"].Schema;
var dates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  scores: {
    type: [Number],
    "default": dates,
    required: true
  }
});
var User = _mongoose["default"].model('User', userSchema);
function getTotalScore(scores) {
  var total = 0;
  for (var i = 0; i < scores.length - 1; i++) {
    total = total + scores[i];
  }
  scores.push(total);
}
function getAllUsersScore(users) {
  var total = 0;
  for (var i = 0; i < users.length; i++) {
    total = total + users[i].scores[users[i].scores.length - 1];
    console.log(total);
  }
  users.totalScores = total;
}
User.addUser = function (userData) {
  return new _bluebird["default"](function (resolve, reject) {
    User.create(userData).then(function () {
      resolve("User Created");
    })["catch"](function (err) {
      reject(err);
    });
  });
};
User.getAllUsers = function () {
  return new _bluebird["default"](function (resolve, reject) {
    User.find({}).then(function (users) {
      for (var i = 0; i < users.length; i++) {
        getTotalScore(users[i].scores);
      }
      getAllUsersScore(users);
      resolve(users);
    })["catch"](function (err) {
      reject(err);
    });
  });
};
User.updateScores = function (userData) {
  return new _bluebird["default"](function (resolve, reject) {
    var totalScore = 0;
    for (var i = 0; i < userData.scores.length - 1; i++) {
      totalScore = totalScore + parseFloat(userData.scores[i]);
    }
    userData.scores[userData.scores.length - 1] = totalScore;
    User.updateOne({
      _id: userData.id
    }, {
      scores: userData.scores
    }).then(function () {
      resolve("Updated");
    })["catch"](function (err) {
      reject(err);
    });
  });
};
var _default = exports["default"] = User;