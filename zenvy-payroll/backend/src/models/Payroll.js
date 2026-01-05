
const mongoose = require('mongoose');

const SalaryComponentSchema = new mongoose.Schema(
  {
    basic: { type: Number, required: true },
    hra: { type: Number, required: true },
    allowances: { type: Number, required: true },
    deductions: { type: Number, required: true }
  },
  { _id: false }
);

const PayrollSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    month: {
      type: String,
      required: true
    },
    salaryComponents: {
      type: SalaryComponentSchema,
      required: true
    },
    netSalary: {
      type: Number,
      required: true
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    aiInsights: {
      riskLevel: String,
      reason: String
    }
  },
  { timestamps: true }
);

PayrollSchema.index(
  { companyId: 1, employeeId: 1, month: 1 },
  { unique: true }
);

module.exports = mongoose.model('Payroll', PayrollSchema);
