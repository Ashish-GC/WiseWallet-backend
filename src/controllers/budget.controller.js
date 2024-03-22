import BudgetModel from "../models/budget.js";

class BudgetController {
  createBudget = async (req, res) => {
    try {
      const { amount, budgetName, startDate, endDate } = req.body;
      const userId = req.user.id;
      if (!amount || !budgetName || !startDate || !endDate) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: amount, budgetName, startDate, endDate",
        });
      }
      const response = await BudgetModel.create({
        amount,
        budgetName,
        startDate,
        endDate,
        userId,
      });
      return res.status(200).json({ response, message: "Budget created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getBudgets = async (req, res) => {
    try {
      const userId = req.user.id;
      const budgets = await BudgetModel.find({ userId });
      return res.status(200).json({ budgets });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default BudgetController;
