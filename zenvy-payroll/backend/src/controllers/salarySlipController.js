
const Payroll = require('../models/Payroll');

exports.getSalarySlipById = async (req, res, next) => {
  try {
    const { payrollId } = req.params;
    const { companyId, userId, role } = req.user;

    const payroll = await Payroll.findOne({
      _id: payrollId,
      companyId
    }).populate('employeeId', 'name email');

    if (!payroll) {
      return res.status(404).json({ message: 'Salary slip not found' });
    }

    if (
      role === 'EMPLOYEE' &&
      payroll.employeeId._id.toString() !== userId
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      employee: payroll.employeeId,
      month: payroll.month,
      salaryComponents: payroll.salaryComponents,
      netSalary: payroll.netSalary,
      aiInsights: payroll.aiInsights,
      generatedAt: payroll.createdAt
    });
  } catch (err) {
    next(err);
  }
};
