import NotificationModel from "../models/notification";

class NotificationController {
  createProductNotification = async (req, res) => {
    try {
      const { message, userId, productName } = req.body;
      if (!message || !userId || !productName) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: message, userId, productName",
        });
      }
      const response = await NotificationModel.create({
        message,
        userId,
        productName,
      });
      return res
        .status(200)
        .json({ response, message: "Notification created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getNotifications = async (req, res) => {
    try {
      const userId = req.user.id;
      const notifications = await NotificationModel.find({ userId });
      return res.status(200).json({ notifications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default NotificationController;
