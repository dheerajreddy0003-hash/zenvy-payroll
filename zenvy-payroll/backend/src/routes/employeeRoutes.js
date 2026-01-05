
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN', 'HR'),
  employeeController.createEmployee
);

router.get(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN', 'HR'),
  employeeController.getEmployees
);

router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('ADMIN', 'HR'),
  employeeController.getEmployeeById
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('ADMIN', 'HR'),
  employeeController.updateEmployee
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  employeeController.deleteEmployee
);

module.exports = router;
