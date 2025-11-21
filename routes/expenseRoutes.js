import express from "express";
import Expense from "../models/Expense.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ADD EXPENSE
router.post("/", protect, async (req, res) => {
  const { categoryId, amount, date } = req.body;

  const expense = await Expense.create({
    userId: req.user.id,
    categoryId,
    amount,
    date
  });

  res.json(expense);
});

// GET expenses for a month
router.get("/:month", protect, async (req, res) => {
  const { month } = req.params;

  const start = new Date(`${month}-01`);
  const end = new Date(`${month}-31`);

  const expenses = await Expense.find({
    userId: req.user.id,
    date: { $gte: start, $lte: end }
  });

  res.json(expenses);
});

export default router;
