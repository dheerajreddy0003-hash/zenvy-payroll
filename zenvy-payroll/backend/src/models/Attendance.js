
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'LEAVE'],
      required: true
    }
  },
  { timestamps: true }
);

AttendanceSchema.index(
  { companyId: 1, employeeId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);
