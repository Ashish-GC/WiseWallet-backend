import GoalModel from "../models/goal.js";

class GoalController {
  createGoal = async (req, res) => {
    try {
      const { amount, goalName, startDate, endDate } = req.body;
      if (!amount || !goalName || !startDate || !endDate) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: amount, goalName, startDate, endDate",
        });
      }
      const response = await GoalModel.create({
        amount,
        goalName,
        startDate,
        endDate,
      });
      return res.status(200).json({ response, message: "Goal created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getGoals = async (req, res) => {
    try {
      const goals = await GoalModel.find();
      return res.status(200).json({ goals });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default GoalController;
