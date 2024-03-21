import express from "express";
import { userRouter } from "./user.route.js";
import { transactionRouter } from "./transaction.route.js";

const router = express.Router();

// Define your routes here
router.use("/user", userRouter);

router.use("/transaction", transactionRouter);

export default router;
