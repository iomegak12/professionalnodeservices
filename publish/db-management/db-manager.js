"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbManager = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schemas = require("../schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DbManager {
  constructor() {
    try {
      this.connection = _mongoose.default;
      this.connection.Promise = global.Promise;
      this.customerModel = this.connection.model("customers", _mongoose.default.Schema(_schemas.CustomerSchema));
    } catch (error) {
      throw error;
    }
  }

}

exports.DbManager = DbManager;