import OrderModel from "../models/order";

class OrderController {
  createOrder = async (req, res) => {
    try {
      const { product, price, orderStatus, seller } = req.body;
      const buyer = req.user.id;

      if (!product || !price || !orderStatus || !seller) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: product, price, orderStatus, seller",
        });
      }

      const response = await OrderModel.create({
        product,
        price,
        orderStatus,
        buyer,
        seller,
      });

      return res.status(200).json({ response, message: "Order created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await OrderModel.find({ buyer: userId });
      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default OrderController;
