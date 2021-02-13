import Move from "../models/Move";

export default class MoveController {
  searchMoves(req, res) {
    Move.find({})
      .sort("name")
      .exec((err, moves) => {
        if (err) {
          return res.status(400).send({
            status: "error",
            message: err.message,
          });
        }

        return res.send({
          status: "ok",
          moves,
        });
      });
  }

  searchOneMove(req, res) {
    const { id } = req.params;
    Move.findById(id, (err, name) => {
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

  addMove(req, res) {
    const body = req.body;
    const { name } = body;

    const move = new Move({
      name,
    });

    move.save((err, item) => {
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

  deleteMove(req, res) {
    const { id } = req.params;
    Move.findOneAndDelete({ _id: id }, (err, name) => {
      if (err || !name) {
        return res.status(400).send({
          status: "error",
          message: "Move not exits!",
        });
      }

      return res.send({
        status: "ok",
        name,
      });
    });
  }
}
