
const User = require('../models/User');
const Expense = require('../models/Expense');

exports.getAllUserSpendings = async (req, res) => {
  const users = await User.find({});
  const results = await Promise.all(users.map(async (user) => {
    const expenses = await Expense.find({ userId: user._id });
    const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    return { email: user.email, totalSpending: total };
  }));
  res.json(results);
};
