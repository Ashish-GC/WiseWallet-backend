import TransactionModel from "../models/transaction.js";

class TransactionController {
  createTransaction = async (req, res) => {
    try {
      const { amount, type, category, date, name, account } = req.body;
      const userId = req.user.id;
      if (!amount || !type || !category || !date || !name || !account) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: amount, type, category, name, account and date",
        });
      }
      const response = await TransactionModel.create({
        amount,
        type,
        category,
        date,
        account,
        name,
        userId,
      });
      return res.status(200).json({ response, message: "Transaction created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getTransactions = async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await TransactionModel.find({ userId });
      return res.status(200).json({ transactions });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default TransactionController;
