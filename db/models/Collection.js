import mongoose from "mongoose";
import "./User";

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  flashcards: [{ type: Schema.Types.ObjectId, ref: "Flashcard" }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
