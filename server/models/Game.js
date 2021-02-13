import { Schema, model } from "mongoose";
const statusGame = {
  values: ["STARTS", "GAME_OVER"],
  message: "{VALUE} is not valid!",
};

const gameConfigSchema = new Schema({
  registered: { type: Date, default: new Date(), index: true },
  winner: { type: String },
  winner_id: { type: Schema.Types.ObjectId },
  players: {
    player1: {
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      score: { type: Number, default: 0 },
    },
    player2: {
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      score: { type: Number, default: 0 },
    },
  },
  status_game: { type: String, default: "STARTS", enum: statusGame },
});

export default model("games", gameConfigSchema);
