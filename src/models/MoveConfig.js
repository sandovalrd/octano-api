import { Schema, model } from "mongoose";

const moveConfigSchema = new Schema({
  move: {
    type: String,
    required: [true, "The name move is require!"],
  },
  move_id: { type: Schema.Types.ObjectId, ref: "moves" },
  skills: {
    type: String,
    required: [true, "The name skills is require!"],
  },
  skills_id: { type: Schema.Types.ObjectId, ref: "moves" },
  allow_delete: {
    type: Boolean,
    default: true,
  },
});

export default model("moves-config", moveConfigSchema);
