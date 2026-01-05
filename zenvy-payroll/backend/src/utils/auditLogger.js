
const AuditLog = require('../models/AuditLog');

exports.logAction = async function ({
  companyId,
  userId,
  action,
  metadata = {}
}) {
  await AuditLog.create({
    companyId,
    userId,
    action,
    metadata
  });
};
