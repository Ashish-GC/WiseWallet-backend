import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  goalName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GoalModel = mongoose.model("Goal", GoalSchema);

export default GoalModel;
