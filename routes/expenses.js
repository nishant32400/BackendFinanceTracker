
const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);

module.exports = router;


router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);
