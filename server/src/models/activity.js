const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema(
  {
    text: {
      type: String,
      requried: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "board",
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("activity", activitySchema);
