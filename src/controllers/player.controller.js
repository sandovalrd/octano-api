import Player from "../models/Player";

export default class PlayerController {
  searchPlayer(req, res) {
    Player.find({})
      .sort("createdAt")
      .exec((err, players) => {
        if (err) {
          return res.status(400).send({
            status: "error",
            message: err.message,
          });
        }

        return res.send({
          status: "ok",
          players,
        });
      });
  }

  searchOnePlayer(req, res) {
    const { id } = req.params;
    Player.findById({ _id: id }, (err, name) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message,
        });
      }
      return res.send({
        status: "ok",
        name,
      });
    });
  }

  addPlayer(req, res) {
    const body = req.body;
    const { name } = body;

    const player = new Player({
      name,
    });

    player.save((err, user) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          message: err.message,
        });
      }

      return res.send({
        status: "ok",
        user,
      });
    });
  }

  updatePlayer(req, res) {
    const { id } = req.params;
    const body = req.body;

    Player.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true, context: "query" },
      (err, name) => {
        if (err || name === null) {
          return res.status(400).send({
            status: "error",
            message: err ? err.message : "player not exist!",
          });
        }

        return res.send({
          status: "ok",
          name,
        });
      }
    );
  }
}
