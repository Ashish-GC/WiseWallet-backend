import express from "express";
import TransactionController from "../controllers/transaction.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const transaction = new TransactionController();

router.post(
  "/create-transaction",
  authenticator,
  transaction.createTransaction,
);

export { router as transactionRouter };
