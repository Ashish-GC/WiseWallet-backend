import TransactionModel from "../models/transaction.js";

class TransactionController {
  createTransaction = async (req, res) => {
    try {
      const { amount, type, category, date, description } = req.body;
      if (!amount || !type || !category || !date) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: amount, type, category, and date",
        });
      }
      const response = await TransactionModel.create({
        amount,
        type,
        category,
        date,
        description,
      });
      return res.status(200).json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default TransactionController;
