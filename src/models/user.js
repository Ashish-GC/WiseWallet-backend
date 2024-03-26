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
  },
  profileImage: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
