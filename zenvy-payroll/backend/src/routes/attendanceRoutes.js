
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('HR'),
  attendanceController.markAttendance
);

router.get(
  '/employee/:employeeId',
  authMiddleware,
  roleMiddleware('HR'),
  attendanceController.getAttendanceForEmployee
);

router.get(
  '/me',
  authMiddleware,
  roleMiddleware('EMPLOYEE'),
  attendanceController.getMyAttendance
);

module.exports = router;
