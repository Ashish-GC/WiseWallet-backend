import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
   name: {
    type: String,
    required:true,
  },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;
