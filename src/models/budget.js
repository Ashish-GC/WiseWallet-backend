import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  moneySpent: {
    type: Number,
  },
  budgetName: {
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

const BudgetModel = mongoose.model("Budget", BudgetSchema);

export default BudgetModel;
