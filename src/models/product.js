import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  outOfStock:{
    type:Boolean
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
