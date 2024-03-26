import express from "express";
import NotificationController from "../controllers/notification.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const notification = new NotificationController();

router.post(
  "/create-notification",
  authenticator,
  notification.createProductNotification,
);

router.get("/get-notifications", authenticator, notification.getNotifications);

export { router as notificationRouter };
