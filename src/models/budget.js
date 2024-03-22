import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
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
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

export default BudgetModel;
