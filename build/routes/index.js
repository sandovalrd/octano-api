"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _playerRoutes = _interopRequireDefault(require("./playerRoutes"));

var _moveRoutes = _interopRequireDefault(require("./moveRoutes"));

var _auth = _interopRequireDefault(require("./auth"));

var _gameRoutes = _interopRequireDefault(require("./gameRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // Routes

app.use("/auth", _auth.default);
app.use("/players", _playerRoutes.default);
app.use("/moves", _moveRoutes.default);
app.use("/games", _gameRoutes.default);
var _default = app;
exports.default = _default;