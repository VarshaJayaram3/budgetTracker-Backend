import express from "express";
import Budget from "../models/Budget.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET budgets for a month
router.get("/:month", protect, async (req, res) => {
  const budgets = await Budget.find({
    userId: req.user.id,
    month: req.params.month
  });
  res.json(budgets);
});

// CREATE
router.post("/", protect, async (req, res) => {
  const { categoryId, month, limit } = req.body;

  const existing = await Budget.findOne({
    userId: req.user.id,
    categoryId,
    month
  });

  if (existing) {
    existing.limit = limit;
    await existing.save();
    return res.json(existing);
  }

  const newBudget = await Budget.create({
    userId: req.user.id,
    categoryId,
    month,
    limit
  });

  res.json(newBudget);
});

// DELETE
// router.delete("/:id", protect, async (req, res) => {
//   await Budget.deleteOne({ _id: req.params.id, userId: req.user.id });
//   res.json({ message: "Deleted" });
// });

router.delete("/:categoryId/:month", async (req, res) => {
  const { categoryId, month } = req.params;

  await Budget.deleteOne({ categoryId, month });
  res.json({ message: "Budget cleared" });
});


export default router;
