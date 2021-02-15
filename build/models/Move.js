"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const movesDefault = ["rock", "paper", "scissors"];
const moveSchema = new _mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
    index: true
  },
  name: {
    type: String,
    required: [true, "The name move is require!"]
  },
  allow_delete: {
    type: Boolean,
    default: true
  }
});
const Move = (0, _mongoose.model)("moves", moveSchema);
movesDefault.forEach(async move => {
  await Move.findOne({
    name: move
  }).then(res => {
    if (!res) {
      Move.create({
        name: move,
        allow_delete: false
      });
    }
  });
});

var _default = (0, _mongoose.model)("moves", moveSchema);

exports.default = _default;