"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _env_config = require("../env_config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    _mongoose.default.connect(_env_config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }, (req, res) => {
      if (req) {
        console.log("Database OFFLINE");
      } else {
        console.log("Database ONLINE");
      }
    });
  }

}

var _default = new Database();

exports.default = _default;