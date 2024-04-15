"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bluebird = _interopRequireDefault(require("bluebird"));
var _mongodb = require("mongodb");
var _mongoose = _interopRequireDefault(require("mongoose"));
var dbConnecter = function dbConnecter() {
  _mongoose["default"].connect('mongodb+srv://saleemkarkabi:wRdYU6H7Hb0hpanU@f45challenge.yj4oaup.mongodb.net/').then(function () {
    console.log("Connected");
  })["catch"](function (err) {
    console.error(err);
  });
};

/*
dbConnecter.connectToCluster = () => {
    return new Bluebird((resolve, reject) => {
        let mongoClient = new MongoClient(process.env.DB_URI);
        console.log('Connecting to MongoDB Atlas cluster...');
        mongoClient.connect().then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
            mongoClient.db('school');
            resolve(mongoClient);
        }).catch(error => {
            console.error('Connection to MongoDB Atlas failed!', error);
            reject(process.exit());
        })
    })
    
}
*/
var _default = exports["default"] = dbConnecter;