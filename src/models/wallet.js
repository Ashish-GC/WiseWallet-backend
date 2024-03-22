import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
});

const WalletModel = mongoose.model("Wallet", WalletSchema);

export default WalletModel;
