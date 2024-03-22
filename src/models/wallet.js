import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  walletCategory: {
    type: String,
  },
  bankName:{
    type:String,
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

const WalletModel = mongoose.model("Wallet", WalletSchema);

export default WalletModel;
