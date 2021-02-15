"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const playerSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name player is require!"]
  },
  won: {
    type: Number,
    default: 0
  },
  loss: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date(),
    index: true
  }
});

var _default = (0, _mongoose.model)("players", playerSchema);

exports.default = _default;