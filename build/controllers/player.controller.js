"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Player = _interopRequireDefault(require("../models/Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerController {
  searchPlayer(req, res) {
    _Player.default.find({}).sort("createdAt").exec((err, players) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        players
      });
    });
  }

  searchOnePlayer(req, res) {
    const {
      id
    } = req.params;

    _Player.default.findById({
      _id: id
    }, (err, name) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        name
      });
    });
  }

  addPlayer(req, res) {
    const body = req.body;
    const {
      name
    } = body;
    const player = new _Player.default({
      name
    });
    player.save((err, user) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        user
      });
    });
  }

  updatePlayer(req, res) {
    const {
      id
    } = req.params;
    const body = req.body;

    _Player.default.findByIdAndUpdate({
      _id: id
    }, body, {
      new: true,
      runValidators: true,
      context: "query"
    }, (err, name) => {
      if (err || name === null) {
        return res.status(400).send({
          status: "error",
          message: err ? err.message : "player not exist!"
        });
      }

      return res.send({
        status: "ok",
        name
      });
    });
  }

}

exports.default = PlayerController;