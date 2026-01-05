
const express = require('express');
const router = express.Router();
const salarySlipController = require('../controllers/salarySlipController');
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/:payrollId',
  authMiddleware,
  salarySlipController.getSalarySlipById
);

module.exports = router;
