
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('/employees').then((res) => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h2>HR Dashboard</h2>

      <Link to="/hr/run-payroll">Run Payroll</Link>

      <h3>Employees</h3>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} ({emp.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
