"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("../models/Player"));

var _express = require("express");

var _game = _interopRequireDefault(require("../controllers/game.controller"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const game = new _game.default();
router.get("/", async (req, res) => {
  await game.searchGames(req, res);
});
router.post("/start", _authorization.default, async (req, res) => {
  await game.newGame(req, res);
});
router.put("/play/:id", _authorization.default, async (req, res) => {
  await game.updateGame(req, res);
});
var _default = router;
exports.default = _default;