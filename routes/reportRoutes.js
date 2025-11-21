import express from "express";
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET monthly report
router.get("/:month", protect, async (req, res) => {
  const month = req.params.month;

  const start = new Date(`${month}-01`);
  const end = new Date(`${month}-31`);

  const expenses = await Expense.find({
    userId: req.user.id,
    date: { $gte: start, $lte: end }
  });

  const budgets = await Budget.find({
    userId: req.user.id,
    month
  });

  // Group expenses by categoryId
  const spentMap = {};
  expenses.forEach((e) => {
    spentMap[e.categoryId] = (spentMap[e.categoryId] || 0) + e.amount;
  });

  const report = budgets.map((b) => ({
    categoryId: b.categoryId,
    budget: b.limit,
    spent: spentMap[b.categoryId] || 0,
    remaining: b.limit - (spentMap[b.categoryId] || 0)
  }));

  res.json(report);
});

export default router;
