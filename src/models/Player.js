import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name player is require!"],
  },
  won: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: new Date(), index: true },
});

export default model("players", playerSchema);
