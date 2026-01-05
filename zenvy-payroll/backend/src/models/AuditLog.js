
const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    action: {
      type: String,
      required: true
    },
    metadata: {
      type: Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditLog', AuditLogSchema);
