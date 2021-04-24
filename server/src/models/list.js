import mongoose from "mongoose";

const { Schema } = mongoose;
const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("list", listSchema);
