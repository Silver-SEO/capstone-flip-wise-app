import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  themeMode: { type: String, default: "dark", required: true },
  title: { type: String },
  image: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    url: { type: String, required: true },
  },
  content: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
