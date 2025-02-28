import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  themeMode: { type: String, default: "dark", required: true },
  image: {
    height: { type: String },
    width: { type: String },
    url: { type: String },
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
