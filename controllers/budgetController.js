
const Budget = require('../models/Budget');

exports.setBudget = async (req, res) => {
  const budget = new Budget({ ...req.body, userId: req.user.id });
  await budget.save();
  res.status(201).json(budget);
};

exports.getBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id });
  res.json(budgets);
};
