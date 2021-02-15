import { Schema, model } from "mongoose";
const movesDefault = ["rock", "paper", "scissors"];

const moveSchema = new Schema({
  createdAt: { type: Date, default: new Date(), index: true },
  name: {
    type: String,
    required: [true, "The name move is require!"],
  },
  allow_delete: {
    type: Boolean,
    default: true,
  },
});

const Move = model("moves", moveSchema);

movesDefault.forEach(async (move) => {
  await Move.findOne({ name: move }).then((res) => {
    if (!res) {
      Move.create({ name: move, allow_delete: false });
    }
  });
});

export default model("moves", moveSchema);
