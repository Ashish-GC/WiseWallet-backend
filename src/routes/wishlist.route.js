
import express from "express"
import authenticator from "../middlewares/authenticator.middleware.js";
import wishlistController from "../controllers/wishlist.controller.js";

const router = express.Router();
const wishlist= new wishlistController();

router.post("/toggle-wishlist",authenticator,wishlist.toggleWishlist) ;

router.get("/get-user-wishlist",authenticator,wishlist.getWishlist);

router.delete("/delete-from-wishlist/:id",authenticator,wishlist.deleteWishlist);


export {router as wishlistRouter};
