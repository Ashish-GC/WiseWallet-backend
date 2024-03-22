import express from "express";
import GoalController from "../controllers/goal.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();

const goal = new GoalController();

router.post("/create-goal", authenticator, goal.createGoal);

router.get("/get-goals", authenticator, goal.getGoals);

export { router as goalRouter };
