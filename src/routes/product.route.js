import express from "express";
import ProductController from "../controllers/product.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const product = new ProductController();

router.post("/create-product",authenticator,product.createProduct);
router.get("/get-products",authenticator,product.getProducts);

export {router as productRouter};