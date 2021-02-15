"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _express = require("express");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const auth = new _auth.default();
router.post("/", (req, res) => {
  auth.authToken(req, res);
});
var _default = router;
exports.default = _default;