import express from "express";
import Category from "../models/Category.js";
import { protect } from "../middleware/auth.js";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

const router = express.Router();

// GET ALL
router.get("/", protect, async (req, res) => {
  const categories = await Category.find({ userId: req.user.id });
  res.json(categories);
});

// CREATE
router.post("/", protect, async (req, res) => {
  const { name, color } = req.body;

  const newCat = await Category.create({
    userId: req.user.id,
    name,
    color
  });

  res.json(newCat);
});

// UPDATE
router.put("/:id", protect, async (req, res) => {
  const updated = await Category.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
// router.delete("/:id", protect, async (req, res) => {
//   await Category.deleteOne({ _id: req.params.id, userId: req.user.id });
//   res.json({ message: "Deleted" });
// });

router.delete("/:id", protect, async (req, res) => {
  const categoryId = req.params.id;

  // 1. Delete the category
  await Category.deleteOne({ _id: categoryId, userId: req.user.id });

  // 2. Delete all budgets linked to this category
  await Budget.deleteMany({ categoryId, userId: req.user.id });

  // 3. Delete all expenses linked to this category
  await Expense.deleteMany({ categoryId, userId: req.user.id });

  res.json({ message: "Category + related Budgets + related Expenses deleted" });
});


export default router;
