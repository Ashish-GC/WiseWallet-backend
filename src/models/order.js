import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  completeDate: {
    type: Date,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
