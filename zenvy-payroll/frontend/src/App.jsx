
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RunPayroll from './pages/RunPayroll';
import SalarySlip from './pages/SalarySlip';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/hr"
            element={
              <ProtectedRoute allowedRoles={['HR']}>
                <HRDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/run-payroll"
            element={
              <ProtectedRoute allowedRoles={['HR']}>
                <RunPayroll />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/salary-slip/:payrollId"
            element={
              <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE']}>
                <SalarySlip />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
