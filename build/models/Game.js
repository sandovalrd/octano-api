"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const statusGame = {
  values: ["STARTS", "GAME_OVER"],
  message: "{VALUE} is not valid!"
};
const gameConfigSchema = new _mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
    index: true
  },
  finalizedAt: {
    type: Date
  },
  winner: {
    type: String
  },
  winner_id: {
    type: _mongoose.Schema.Types.ObjectId
  },
  players: {
    player1: {
      _id: {
        type: _mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      won: {
        type: Number,
        default: 0
      }
    },
    player2: {
      _id: {
        type: _mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      won: {
        type: Number,
        default: 0
      }
    }
  },
  score: [{
    ronda: {
      type: Number,
      default: 0
    },
    name: {
      type: String
    }
  }],
  status_game: {
    type: String,
    default: "STARTS",
    enum: statusGame
  }
});

var _default = (0, _mongoose.model)("games", gameConfigSchema);

exports.default = _default;