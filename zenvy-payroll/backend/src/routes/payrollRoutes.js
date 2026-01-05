
const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/run',
  authMiddleware,
  roleMiddleware('HR'),
  payrollController.runPayroll
);

router.get(
  '/employee/:employeeId',
  authMiddleware,
  roleMiddleware('HR'),
  payrollController.getPayrollForEmployee
);

router.get(
  '/me',
  authMiddleware,
  roleMiddleware('EMPLOYEE'),
  payrollController.getMyPayroll
);

module.exports = router;
