import OrderModel from "../models/order.js";
import ProductModel from "../models/product.js";
import UserModel from "../models/user.js";
import {
  sendNotificationToSeller,
  sendNotificationToBuyer,
} from "../helpers/email.js";

class OrderController {
  createOrder = async (req, res) => {
    try {
      const { product, price, orderStatus } = req.body;
      const buyer = req.user.id;

      if (!product || !price || !orderStatus) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: product, price, orderStatus, seller",
        });
      }

      const productSchema = await ProductModel.findById(product);
      if (!productSchema) {
        return res.status(404).json({ message: "Product not found" });
      }

      const seller = productSchema.owner;
      productSchema.isSold = true;
      await productSchema.save();

      const response = await OrderModel.create({
        product,
        price,
        orderStatus,
        buyer,
        seller,
      });

      const sellerDetails = await UserModel.findById(seller);
      const buyerDetails = await UserModel.findById(buyer);
      sendNotificationToSeller(
        sellerDetails.email,
        productSchema.productName,
        buyerDetails.name,
        buyerDetails.email,
        buyerDetails.mobileNo,
      );
      sendNotificationToBuyer(
        buyerDetails.email,
        sellerDetails.name,
        sellerDetails.email,
        sellerDetails.mobileNo,
      );

      return res.status(200).json({ response, message: "Order created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOrdersByBuyer = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await OrderModel.find({ buyer: userId });
      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOrders = async (req, res) => {
    try {
      const orders = await OrderModel.find();
      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      await order.deleteOne();
      return res.status(200).json({ message: "Order deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default OrderController;
