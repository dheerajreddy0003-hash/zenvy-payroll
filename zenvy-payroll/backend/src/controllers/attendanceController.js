
const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;
    const { companyId } = req.user;

    const attendance = await Attendance.create({
      companyId,
      employeeId,
      date,
      status
    });

    res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceForEmployee = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const { employeeId } = req.params;

    const attendanceRecords = await Attendance.find({
      companyId,
      employeeId
    }).sort({ date: -1 });

    res.json(attendanceRecords);
  } catch (err) {
    next(err);
  }
};

exports.getMyAttendance = async (req, res, next) => {
  try {
    const { companyId, userId } = req.user;

    const attendanceRecords = await Attendance.find({
      companyId,
      employeeId: userId
    }).sort({ date: -1 });

    res.json(attendanceRecords);
  } catch (err) {
    next(err);
  }
};
