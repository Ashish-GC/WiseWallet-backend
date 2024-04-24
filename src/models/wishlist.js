import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  { productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    },
    product: {
      type: Object,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestams: true },
);

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

export default WishlistModel;
