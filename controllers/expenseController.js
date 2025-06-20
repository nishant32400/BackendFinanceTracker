
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const expense = new Expense({ ...req.body, userId: req.user.id });
  await expense.save();
  res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};


exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const updated = await Expense.findOneAndUpdate({ _id: id, userId: req.user.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
