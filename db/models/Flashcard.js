import mongoose from "mongoose";
import "./Collection";
const { Schema } = mongoose;

const flashcardSchema = new Schema({
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
