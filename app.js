const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');
const adminRoutes = require('./routes/admin');

const app = express();

// ✅ Enable CORS for Vercel
app.use(cors({
  origin: 'https://frontend-finance-tracker-git-master-nishants-projects-3489f8e5.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Handle preflight requests (OPTIONS)
app.options('*', cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
