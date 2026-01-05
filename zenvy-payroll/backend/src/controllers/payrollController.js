
const Payroll = require('../models/Payroll');
const Attendance = require('../models/Attendance');
const { calculateNetSalary } = require('../services/payrollService');
const { evaluatePayrollRisk } = require('../services/aiService');
const { logAction } = require('../utils/auditLogger');

exports.runPayroll = async (req, res, next) => {
  try {
    const { employeeId, month, salaryComponents } = req.body;
    const { companyId, userId } = req.user;

    const attendanceCount = await Attendance.countDocuments({
      companyId,
      employeeId,
      date: {
        $gte: new Date(`${month}-01`),
        $lte: new Date(`${month}-31`)
      }
    });

    const netSalary = calculateNetSalary(salaryComponents);

    const previousPayroll = await Payroll.findOne({
      companyId,
      employeeId
    }).sort({ createdAt: -1 });

    const aiInsights = evaluatePayrollRisk({
      currentNetSalary: netSalary,
      previousNetSalary: previousPayroll?.netSalary,
      attendanceCount
    });

    const payroll = await Payroll.create({
      companyId,
      employeeId,
      month,
      salaryComponents,
      netSalary,
      generatedBy: userId,
      aiInsights
    });

    await logAction({
      companyId,
      userId,
      action: 'RUN_PAYROLL',
      metadata: { payrollId: payroll._id }
    });

    res.status(201).json({
      message: 'Payroll generated successfully',
      payroll
    });
  } catch (err) {
    next(err);
  }
};

exports.getPayrollForEmployee = async (req, res, next) => {
  try {
    const { companyId } = req.user;
    const { employeeId } = req.params;

    const payrolls = await Payroll.find({
      companyId,
      employeeId
    }).sort({ createdAt: -1 });

    res.json(payrolls);
  } catch (err) {
    next(err);
  }
};

exports.getMyPayroll = async (req, res, next) => {
  try {
    const { companyId, userId } = req.user;

    const payrolls = await Payroll.find({
      companyId,
      employeeId: userId
    }).sort({ createdAt: -1 });

    res.json(payrolls);
  } catch (err) {
    next(err);
  }
};
