import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String },
  image: {
    height: { type: String },
    width: { type: String },
    url: { type: String },
  },
});

const Image = mongoose.models.User || mongoose.model("Image", userSchema);

export default Image;
