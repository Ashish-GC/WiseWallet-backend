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
});

const WalletModel = mongoose.model("Wallet", WalletSchema);

export default WalletModel;
