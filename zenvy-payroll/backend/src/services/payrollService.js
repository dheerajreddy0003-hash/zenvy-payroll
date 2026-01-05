
exports.calculateNetSalary = function (salaryComponents) {
  const { basic, hra, allowances, deductions } = salaryComponents;

  if (
    basic < 0 ||
    hra < 0 ||
    allowances < 0 ||
    deductions < 0
  ) {
    throw new Error('Invalid salary component values');
  }

  return basic + hra + allowances - deductions;
};
