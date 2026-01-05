
exports.evaluatePayrollRisk = function ({
  currentNetSalary,
  previousNetSalary,
  attendanceCount
}) {
  let riskLevel = 'LOW';
  let reason = 'No anomalies detected';

  if (
    previousNetSalary &&
    currentNetSalary > previousNetSalary * 1.3
  ) {
    riskLevel = 'HIGH';
    reason = 'Salary increased by more than 30% compared to last month';
  }

  if (attendanceCount < 15) {
    riskLevel = 'MEDIUM';
    reason = 'Low attendance detected for payroll period';
  }

  return {
    riskLevel,
    reason
  };
};
