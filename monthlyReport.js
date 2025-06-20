const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Expense = require('./models/Expense');
const Budget = require('./models/Budget');

dotenv.config();
fs.mkdirSync('./reports-sql', { recursive: true });
const db = new sqlite3.Database('./reports-sql/reports.db');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const userIds = await Expense.distinct('userId');
  const month = new Date().toISOString().slice(0, 7);

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      month TEXT,
      total_spent REAL,
      top_category TEXT,
      overbudget_categories TEXT
    )`);
  });

  for (let userId of userIds) {
    const expenses = await Expense.find({ userId });
    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);

    const categorySpend = {};
    expenses.forEach(e => {
      categorySpend[e.category] = (categorySpend[e.category] || 0) + e.amount;
    });

    const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const budgets = await Budget.find({ userId });
    const overbudget = budgets.filter(b => {
      const spent = categorySpend[b.category] || 0;
      return spent >= b.limit * 0.8;
    }).map(b => `${b.category} (${Math.round((categorySpend[b.category] || 0) / b.limit * 100)}%)`);

    db.run(`INSERT INTO reports (user_id, month, total_spent, top_category, overbudget_categories)
            VALUES (?, ?, ?, ?, ?)`,
      [userId, month, totalSpent, topCategory, overbudget.join(', ')]);
  }

  console.log('Monthly reports saved to SQLite.');
  process.exit();
});
