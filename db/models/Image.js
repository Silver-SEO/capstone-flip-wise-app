import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  image: {
    width: { type: String },
    height: { type: String },
    url: { type: String },
  },
});

const Image = mongoose.models.User || mongoose.model("Image", userSchema);

export default Image;
