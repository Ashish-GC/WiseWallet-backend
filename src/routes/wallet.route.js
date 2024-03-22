import express from "express";
import WalletController from "../controllers/wallet.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const wallet = new WalletController();

router.post("/create-wallet", authenticator, wallet.createWallet);

router.get("/get-wallets", authenticator, wallet.getWallets);

export { router as walletRouter };
