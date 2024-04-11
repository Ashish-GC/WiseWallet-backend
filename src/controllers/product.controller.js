import ProductModel from "../models/product.js";
import NotificationModel from "../models/notification.js";
import UserModel from "../models/user.js";
import { sendNotificationEmail } from "../helpers/email.js";

class ProductController {
  createProduct = async (req, res) => {
    try {
      const {
        productName,
        productImage,
        category,
        price,
        productDescription,
        productCondition,
        programName,
        courseName,
        semester
      } = req.body;
      const userId = req.user.id;

      if (!productName || !productImage || !category || !price) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: productName, productImage, category, price",
        });
      }

      const response = await ProductModel.create({
        productName,
        productImage,
        category,
        price,
        productDescription,
        productCondition,
        owner: userId,
        programName,
        courseName,
        semester
      });
      // console.log(response);
      const notifications = await NotificationModel.find({ productName });
      if (notifications.length > 0) {
        notifications.forEach(async (notification) => {
          console.log("Sending notification to user: ", notification.userId);
          const user = await UserModel.findById(notification.userId);
          await sendNotificationEmail(user.email, productName);
          await NotificationModel.findByIdAndDelete(notification._id);
        });
      }

      return res.status(200).json({ response, message: "Product created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await ProductModel.find();
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getProductsByUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const products = await ProductModel.find({ owner: userId });
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // getProductById = async (req, res) => {
  //   try {
  //     const productId = req.params.id;
  //     const product = await ProductModel.findById(productId);
  //     return res.status(200).json({ product });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };
}
export default ProductController;
