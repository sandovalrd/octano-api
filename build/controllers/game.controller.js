"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Game = _interopRequireDefault(require("../models/Game"));

var _Player = _interopRequireDefault(require("../models/Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GameController {
  async searchGames(req, res) {
    _Game.default.find({}).sort({
      createdAt: "desc"
    }).exec((err, games) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        games
      });
    });
  }

  async newGame(req, res) {
    const {
      players
    } = req.body;
    const {
      player1,
      player2
    } = players;
    const validPlayer1 = await this.validatePlayer(player1.id);
    const validPlayer2 = await this.validatePlayer(player2.id);

    if (!validPlayer1 || !validPlayer2) {
      return res.status(404).send({
        status: "error",
        message: "Player not exists"
      });
    }

    const game = new _Game.default({
      players: {
        player1: {
          _id: player1.id,
          name: player1.name
        },
        player2: {
          _id: player2.id,
          name: player2.name
        }
      }
    });
    game.save((err, game) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message
        });
      }

      return res.send({
        status: "ok",
        game
      });
    });
  }

  async validatePlayer(id) {
    const valid = await _Player.default.findById({
      _id: id
    });

    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  async updateGame(req, res) {
    const {
      id
    } = req.params;
    const {
      players
    } = req.body;
    const game = await this.searhGame(id);

    if (!game) {
      return res.status(400).send({
        status: "error",
        message: "game not exist!"
      });
    }

    if (game.status_game === "GAME_OVER") {
      return res.status(400).send({
        status: "error",
        message: "Game finalized!"
      });
    }

    const {
      player1,
      player2
    } = players;
    const score = game.score.length;

    if (player1.won) {
      game.players.player1.won++;
      game.score.push({
        ronda: score + 1,
        name: game.players.player1.name
      });
    }

    if (player2.won) {
      game.players.player2.won++;
      game.score.push({
        ronda: score + 1,
        name: game.players.player2.name
      });
    }

    if (!player1.won && !player2.won) {
      game.score.push({
        ronda: score + 1,
        name: "Draw"
      });
    }

    if (game.players.player1.won === 3) {
      game.status_game = "GAME_OVER";
      game.winner = game.players.player1.name;
      game.winner_id = game.players.player1._id;
      game.finalizedAt = new Date();
      await this.updateWinner(game.winner_id);
      await this.updateLoss(game.players.player2._id);
    }

    if (game.players.player2.won === 3) {
      game.status_game = "GAME_OVER";
      game.winner = game.players.player2.name;
      game.winner_id = game.players.player2._id;
      game.finalizedAt = new Date();
      await this.updateWinner(game.winner_id);
      await this.updateLoss(game.players.player1._id);
    }

    _Game.default.findByIdAndUpdate({
      _id: id
    }, game, {
      new: true,
      runValidators: true,
      context: "query"
    }, (err, game) => {
      if (err || game === null) {
        return res.status(400).send({
          status: "error",
          message: err ? err.message : "game not exist!"
        });
      }

      return res.send({
        status: "ok",
        game
      });
    });
  }

  async searhGame(id) {
    const game = await _Game.default.findById({
      _id: id
    });

    if (game) {
      return game;
    } else {
      return false;
    }
  }

  updateWinner(id) {
    _Player.default.findOne({
      _id: id
    }).then(async player => {
      if (player) {
        player.won = player.won + 1;
        return await player.save();
      }
    });
  }

  updateLoss(id) {
    _Player.default.findOne({
      _id: id
    }).then(async player => {
      if (player) {
        player.loss = player.loss + 1;
        return await player.save();
      }
    });
  }

}

exports.default = GameController;