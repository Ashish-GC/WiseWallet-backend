import UserModel from "../models/user.js";
import OTPModel from "../models/otp.js";
import sendEmail from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import JWT from "../helpers/jwt.js";

class UserController {
  requestSignUp = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      await sendEmail(email, otp);
      const hashedOTP = await hashPassword(otp.toString());
      const response = await OTPModel.create({
        email,
        otp: hashedOTP,
      });
      const token = JWT.generateToken({ id: response._id, email }, "20m");

      return res
        .status(200)
        .json({ response: true, message: "OTP sent", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  verifySignUp = async (req, res) => {
    try {
      const { name, email, mobileNo, otp } = req.body;
      if (!email || !otp || !name || !mobileNo) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: email, otp, name, and mobileNo",
        });
      }
      const otpDetails = await OTPModel.findOne({ email });
      if (!otpDetails) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const match = await comparePassword(otp.toString(), otpDetails.otp);
      if (!match) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      //delete otp
      await OTPModel.findByIdAndDelete(otpDetails._id);

      //create user
      const user = await UserModel.create({ name, email, mobileNo });

      //create token
      const token = JWT.generateToken(
        { id: user._id, email, mobileNo, name },
        "14d",
      );

      //send response
      return res.status(200).json({ message: "OTP verified", token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  requestLogIn = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      await sendEmail(email, otp);
      const hashedOTP = await hashPassword(otp.toString());
      // console.log(hashedOTP);
      // console.log(otp);
      const response = await OTPModel.create({
        email,
        otp: hashedOTP,
      });
      const token = JWT.generateToken({ id: response._id, email }, "20m");

      return res
        .status(200)
        .json({ response: true, message: "OTP sent", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  verifyLogIn = async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }
      const otpDetails = await OTPModel.findOne({ email });
      if (!otpDetails) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const match = await comparePassword(otp.toString(), otpDetails.otp);
      if (!match) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      //delete otp
      await OTPModel.findByIdAndDelete(otpDetails._id);

      const user = await UserModel.findOne({ email });

      //create token
      const token = JWT.generateToken(
        {
          id: user._id,
          email: user.email,
          mobileNo: user.mobileNo,
          name: user.name,
        },
        "14d",
      );

      //send response
      return res.status(200).json({ message: "OTP verified", token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getProfile = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default UserController;
