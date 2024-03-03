import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    expires: 600, // Set TTL to 10 minutes (10 * 60 seconds)
  },
);

const OTPModel = mongoose.model("OTP", OTPSchema);

export default OTPModel;
