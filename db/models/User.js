import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  themeMode: { type: String, default: "dark", required: true },
  image: {
    height: { type: String, default: null, required: true },
    width: { type: String, default: null, required: true },
    url: { type: String, default: null, required: true },
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
