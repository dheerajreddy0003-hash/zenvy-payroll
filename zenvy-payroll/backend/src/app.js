
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const salarySlipRoutes = require('./routes/salarySlipRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/salary-slip', salarySlipRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'ZENVY Payroll Backend' });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
