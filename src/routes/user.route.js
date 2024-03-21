import express from "express";
import UserController from "../controllers/user.controller.js";
import authenticator from "../middlewares/authenticator.middleware.js";

const router = express.Router();
const user = new UserController();

router.post("/request-signup", user.requestSignUp);
router.post("/request-login", user.requestLogIn);
router.post("/verify-signup", authenticator, user.verifySignUp);
router.post("/verify-login", authenticator, user.verifyLogIn);
router.put("/update-profile", authenticator, user.updateProfile);
router.get("/profile", authenticator, user.getProfile);

export { router as userRouter };
