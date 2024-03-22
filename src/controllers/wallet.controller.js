import WalletModel from "../models/wallet.js";

class WalletController {
  createWallet = async (req, res) => {
    try {
      const { amount, type, cardNumber, expiryDate, walletCategory } = req.body;
      if (!amount || !type) {
        return res.status(400).json({
          message: "Please provide all the required fields: amount, type",
        });
      }
      if (type == "card" && (!cardNumber || !expiryDate)) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: cardNumber, expiryDate",
        });
      }
      if (type == "upi" && !walletCategory) {
        return res.status(400).json({
          message: "Please provide all the required fields: walletCategory",
        });
      }
      const response = await WalletModel.create({
        amount,
        type,
        cardNumber,
        expiryDate,
        walletCategory,
      });
      return res.status(200).json({ response, message: "Wallet created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getWallets = async (req, res) => {
    try {
      const wallets = await WalletModel.find();
      return res.status(200).json({ wallets });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default WalletController;
