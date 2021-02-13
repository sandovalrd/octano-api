import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name player is require!"],
  },
});

export default model("players", playerSchema);
