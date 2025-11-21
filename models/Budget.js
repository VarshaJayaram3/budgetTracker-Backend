import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  categoryId: mongoose.Schema.Types.ObjectId,
  month: String,
  limit: Number
});

export default mongoose.model("Budget", budgetSchema);
