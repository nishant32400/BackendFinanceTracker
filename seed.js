
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Expense = require('./models/Expense');

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Expense.deleteMany();

  const user1 = new User({ email: 'admin@example.com', password: 'admin123' });
  const user2 = new User({ email: 'user@example.com', password: 'user123' });
  await user1.save();
  await user2.save();

  const expenses = [
    { userId: user1._id, amount: 1000, category: 'Food', date: new Date(), paymentMethod: 'UPI', notes: '' },
    { userId: user1._id, amount: 3000, category: 'Travel', date: new Date(), paymentMethod: 'Cash', notes: '' },
    { userId: user2._id, amount: 2000, category: 'Shopping', date: new Date(), paymentMethod: 'Card', notes: '' },
  ];

  await Expense.insertMany(expenses);
  console.log('Seeded successfully');
  process.exit();
};

seed();
