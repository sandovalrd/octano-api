"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env_config = require("../env_config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  authToken(req, res) {
    const {
      password
    } = req.body;

    if (password === undefined) {
      return res.status(400).send({
        status: "Error",
        message: "Missing parameters!"
      });
    }

    if (password !== _env_config.PassWord) {
      return res.status(400).send({
        status: "error",
        message: "Invalid credentials!"
      });
    }

    const tokenData = {
      sub: "1234567890",
      name: "Octano Sotfware",
      admin: true
    };

    const token = _jsonwebtoken.default.sign(tokenData, _env_config.seedToken, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours

    });

    return res.send({
      status: "Ok",
      token: token
    });
  }

}

exports.default = AuthController;