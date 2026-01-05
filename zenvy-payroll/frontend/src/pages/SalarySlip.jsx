
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function SalarySlip() {
  const { payrollId } = useParams();
  const [slip, setSlip] = useState(null);

  useEffect(() => {
    api.get(`/salary-slip/${payrollId}`).then((res) => {
      setSlip(res.data);
    });
  }, [payrollId]);

  if (!slip) return <p>Loading salary slip...</p>;

  return (
    <div>
      <h2>Salary Slip</h2>

      <p><b>Employee:</b> {slip.employee.name}</p>
      <p><b>Month:</b> {slip.month}</p>

      <h4>Salary Components</h4>
      <ul>
        <li>Basic: ₹{slip.salaryComponents.basic}</li>
        <li>HRA: ₹{slip.salaryComponents.hra}</li>
        <li>Allowances: ₹{slip.salaryComponents.allowances}</li>
        <li>Deductions: ₹{slip.salaryComponents.deductions}</li>
      </ul>

      <h3>Net Salary: ₹{slip.netSalary}</h3>

      {slip.aiInsights && (
        <>
          <h4>AI Risk Analysis</h4>
          <p>{slip.aiInsights.riskLevel}</p>
          <p>{slip.aiInsights.reason}</p>
        </>
      )}
    </div>
  );
}
