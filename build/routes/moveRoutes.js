"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("../models/Player"));

var _express = require("express");

var _move = _interopRequireDefault(require("../controllers/move.controller"));

var _moveConfig = _interopRequireDefault(require("../controllers/moveConfig.controller"));

var _validateDelete = _interopRequireDefault(require("../middleware/validateDelete"));

var _validMoviConfig = _interopRequireDefault(require("../middleware/validMoviConfig"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const move = new _move.default();
const moveConfig = new _moveConfig.default(); // Config moves

router.get("/config", async (req, res) => {
  await moveConfig.searchMovesConfig(req, res);
});
router.delete("/config/:id", [_authorization.default, _validateDelete.default], async (req, res) => {
  await moveConfig.deleteConfigMove(req, res);
});
router.post("/config", [_authorization.default, _validMoviConfig.default], async (req, res) => {
  console.log(1);
  await moveConfig.addMovesConfig(req, res);
}); // Moves

router.get("/", async (req, res) => {
  await move.searchMoves(req, res);
});
router.get("/:id", async (req, res) => {
  await move.searchOneMove(req, res);
});
router.post("/", _authorization.default, async (req, res) => {
  await move.addMove(req, res);
});
router.delete("/:id", _authorization.default, _validateDelete.default, async (req, res) => {
  await move.deleteMove(req, res);
});
var _default = router;
exports.default = _default;