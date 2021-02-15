"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MoveConfig = _interopRequireDefault(require("../models/MoveConfig"));

var _Move = _interopRequireDefault(require("../models/Move"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MoveConfigController {
  async addMovesConfig(req, res) {
    const {
      move_id,
      move,
      skills,
      skills_id
    } = req.body;
    const validMove = await this.validateMove(move_id);
    const validSkills = await this.validateMove(skills_id);
    const validConfig = await this.validateMoveConfig(move_id, skills_id);

    if (!validMove || !validSkills) {
      return res.status(404).send({
        status: "error",
        message: "Move or Skill no valid"
      });
    }

    if (validConfig) {
      return res.status(400).send({
        status: "error",
        message: "Move config exists!"
      });
    }

    await _MoveConfig.default.create({
      move: move,
      move_id: move_id,
      skills: skills,
      skills_id: skills_id
    }).then(item => {
      return res.send({
        status: "ok",
        item
      });
    }).catch(err => {
      return res.status(400).send({
        status: "error",
        message: err.message
      });
    });
  }

  async searchMovesConfig(req, res) {
    await _MoveConfig.default.find({}).then(async movesConfig => {
      if (movesConfig.length === 0) {
        return await this.InsertConfigDefaultMoves(req, res);
      }

      return res.send({
        status: "ok",
        movesConfig
      });
    }).catch(err => {
      return res.status(400).send({
        status: "error",
        message: err.message
      });
    });
  }

  async validateMove(id) {
    const valid = await _Move.default.findById({
      _id: id
    });

    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  async validateMoveConfig(move_id, skills_id) {
    const valid = await _MoveConfig.default.findOne({
      skills_id,
      move_id
    });

    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  deleteConfigMove(req, res) {
    const {
      id
    } = req.params;

    _MoveConfig.default.findOneAndDelete({
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

  async InsertConfigDefaultMoves(req, res) {
    const configDefault = ["rock", "paper", "scissors"];
    let idRock;
    let idPaper;
    let idScissors;
    const movesConfig = [];
    configDefault.forEach(async (move, idx) => {
      await _Move.default.findOne({
        name: move
      }).then(resp => {
        if (resp) {
          move === "rock" && (idRock = resp._id);
          move === "paper" && (idPaper = resp._id);
          move === "scissors" && (idScissors = resp._id);
        }
      });

      if (idx === 2) {
        movesConfig.push(await _MoveConfig.default.create({
          move: configDefault[0],
          move_id: idRock,
          skills: configDefault[2],
          skills_id: idScissors,
          allow_delete: false
        }));
        movesConfig.push(await _MoveConfig.default.create({
          move: configDefault[2],
          move_id: idScissors,
          skills_id: idPaper,
          skills: configDefault[1],
          allow_delete: false
        }));
        movesConfig.push(await _MoveConfig.default.create({
          move: configDefault[1],
          move_id: idPaper,
          skills: configDefault[0],
          skills_id: idRock,
          allow_delete: false
        }));
        return res.send({
          status: "ok",
          movesConfig
        });
      }
    });
  }

}

exports.default = MoveConfigController;