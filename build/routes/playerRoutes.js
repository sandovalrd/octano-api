"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("../models/Player"));

var _express = require("express");

var _player = _interopRequireDefault(require("../controllers/player.controller"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const player = new _player.default();
router.get("/", async (req, res) => {
  await player.searchPlayer(req, res);
});
router.get("/:id", async (req, res) => {
  await player.searchOnePlayer(req, res);
});
router.post("/", _authorization.default, async (req, res) => {
  await player.addPlayer(req, res);
});
router.put("/:id", _authorization.default, async (req, res) => {
  await player.updatePlayer(req, res);
});
var _default = router;
exports.default = _default;