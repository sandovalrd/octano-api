"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env_config = require("../env_config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (req, res, next) => {
  const token = req.get("Authorization");

  _jsonwebtoken.default.verify(token, _env_config.seedToken, (err, user) => {
    if (err) {
      return res.status(401).send({
        status: "error",
        message: err.message
      });
    }

    req.usuario = user;
    next();
  });
};

exports.default = _default;