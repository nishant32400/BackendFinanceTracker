
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  category: String,
  date: Date,
  paymentMethod: String,
  notes: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);
