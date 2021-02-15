"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Move = _interopRequireDefault(require("../models/Move"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MoveController {
  searchMoves(req, res) {
    _Move.default.find({}).sort({
      createdAt: "asc"
    }).exec((err, moves) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        moves
      });
    });
  }

  searchOneMove(req, res) {
    const {
      id
    } = req.params;

    _Move.default.findById(id, (err, name) => {
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

  addMove(req, res) {
    const body = req.body;
    console.log("req.body", req.body);
    const {
      name
    } = body;
    const move = new _Move.default({
      name
    });
    move.save((err, item) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        item
      });
    });
  }

  deleteMove(req, res) {
    const {
      id
    } = req.params;

    _Move.default.findOneAndDelete({
      _id: id
    }, (err, name) => {
      if (err || !name) {
        return res.status(400).send({
          status: "error",
          message: "Move not exits!"
        });
      }

      return res.send({
        status: "ok",
        name
      });
    });
  }

}

exports.default = MoveController;