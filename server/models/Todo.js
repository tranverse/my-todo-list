import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Todo", TodoSchema);
