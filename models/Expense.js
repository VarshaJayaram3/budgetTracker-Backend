import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  categoryId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: Date
});

export default mongoose.model("Expense", expenseSchema);
