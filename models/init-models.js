var DataTypes = require("sequelize").DataTypes;
var _Customers = require("./Customers");
var _Hotels = require("./Hotels");
var _NetPromotorScores = require("./NetPromotorScores");
var _Ratings = require("./Ratings");
var _Reviews = require("./Reviews");
var _SequelizeMeta = require("./SequelizeMeta");
var _tests = require("./tests");

function initModels(sequelize) {
  var Customers = _Customers(sequelize, DataTypes);
  var Hotels = _Hotels(sequelize, DataTypes);
  var NetPromotorScores = _NetPromotorScores(sequelize, DataTypes);
  var Ratings = _Ratings(sequelize, DataTypes);
  var Reviews = _Reviews(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var tests = _tests(sequelize, DataTypes);


  return {
    Customers,
    Hotels,
    NetPromotorScores,
    Ratings,
    Reviews,
    SequelizeMeta,
    tests,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
