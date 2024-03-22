import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
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
  }
});

const GoalModel = mongoose.model("Goal", GoalSchema);

export default GoalModel;
