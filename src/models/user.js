import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  // otp: {
  //   type: String,
  // },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
