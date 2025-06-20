
const express = require('express');
const { getAllUserSpendings } = require('../controllers/adminController');
const router = express.Router();
router.get('/', getAllUserSpendings);
module.exports = router;
