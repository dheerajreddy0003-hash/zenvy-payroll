
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function EmployeeDashboard() {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    api.get('/payroll/me').then((res) => setPayrolls(res.data));
  }, []);

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <h3>My Payroll</h3>
      <ul>
        {payrolls.map((p) => (
          <li key={p._id}>
            {p.month} — ₹{p.netSalary}
          </li>
        ))}
      </ul>
    </div>
  );
}
