import Game from "../models/Game";
import Player from "../models/Player";

export default class GameController {
  async searchGames(req, res) {
    Game.find({})
      .sort("registered")
      .exec((err, games) => {
        if (err) {
          return res.status(400).send({
            status: "error",
            message: err.message,
          });
        }

        return res.send({
          status: "ok",
          games,
        });
      });
  }
  async newGame(req, res) {
    const { players } = req.body;
    const { player1, player2 } = players;
    const validPlayer1 = await this.validatePlayer(player1.id);
    const validPlayer2 = await this.validatePlayer(player2.id);

    if (!validPlayer1 || !validPlayer2) {
      return res.status(404).send({
        status: "error",
        message: "Player not exists",
      });
    }

    const game = new Game({
      players: {
        player1: {
          _id: player1.id,
          name: player1.name,
        },
        player2: {
          _id: player2.id,
          name: player2.name,
        },
      },
    });

    game.save((err, item) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message,
        });
      }

      return res.send({
        status: "ok",
        item,
      });
    });
  }

  async validatePlayer(id) {
    const valid = await Player.findById({ _id: id });
    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  async updateGame(req, res) {
    const { id } = req.params;
    const { players } = req.body;
    const game = await this.searhGame(id);

    if (!game) {
      return res.status(400).send({
        status: "error",
        message: "game not exist!",
      });
    }

    const { player1, player2 } = players;

    player1.won && game.players.player1.score++;
    player2.won && game.players.player2.score++;

    if (game.players.player1.score === 3) {
      game.status_game = "GAME_OVER";
      game.winner = game.players.player1.name;
      game.winner_id = game.players.player1._id;
    }

    if (game.players.player2.score === 3) {
      game.status_game = "GAME_OVER";
      game.winner = game.players.player2.name;
      game.winner_id = game.players.player2._id;
    }

    Game.findByIdAndUpdate(
      { _id: id },
      game,
      { new: true, runValidators: true, context: "query" },
      (err, item) => {
        if (err || game === null) {
          return res.status(400).send({
            status: "error",
            message: err ? err.message : "game not exist!",
          });
        }

        return res.send({
          status: "ok",
          item,
        });
      }
    );
  }

  async searhGame(id) {
    const game = await Game.findById({ _id: id });
    if (game) {
      return game;
    } else {
      return false;
    }
  }
}
