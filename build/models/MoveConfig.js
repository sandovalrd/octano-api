"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const moveConfigSchema = new _mongoose.Schema({
  move: {
    type: String,
    required: [true, "The name move is require!"]
  },
  move_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "moves"
  },
  skills: {
    type: String,
    required: [true, "The name skills is require!"]
  },
  skills_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "moves"
  },
  allow_delete: {
    type: Boolean,
    default: true
  }
});

var _default = (0, _mongoose.model)("moves-config", moveConfigSchema);

exports.default = _default;