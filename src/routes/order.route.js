import express from "express";
import OrderController from "../controllers/order.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const order = new OrderController();

router.post("/create-order", authenticator, order.createOrder);

router.get("/get-orders-by-buyer", authenticator, order.getOrdersByBuyer);

router.get("/get-orders", authenticator, order.getOrders);

router.delete("/delete-order/:id", authenticator, order.deleteOrder);

export { router as orderRouter };
