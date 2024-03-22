import express from "express";
import BudgetController from "../controllers/budget.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const budget = new BudgetController();

router.post("/create-budget", authenticator, budget.createBudget);

router.get("/get-budgets", authenticator, budget.getBudgets);

export { router as budgetRouter };
