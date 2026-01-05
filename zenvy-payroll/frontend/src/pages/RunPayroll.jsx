
import { useState } from 'react';
import api from '../api/axios';

export default function RunPayroll() {
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState('');
  const [basic, setBasic] = useState('');
  const [hra, setHra] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post('/payroll/run', {
      employeeId,
      month,
      salaryComponents: {
        basic: Number(basic),
        hra: Number(hra),
        allowances: Number(allowances),
        deductions: Number(deductions)
      }
    });

    setResult(res.data.payroll);
  };

  return (
    <div>
      <h2>Run Payroll</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Employee ID" onChange={(e) => setEmployeeId(e.target.value)} />
        <input placeholder="Month (YYYY-MM)" onChange={(e) => setMonth(e.target.value)} />
        <input placeholder="Basic" onChange={(e) => setBasic(e.target.value)} />
        <input placeholder="HRA" onChange={(e) => setHra(e.target.value)} />
        <input placeholder="Allowances" onChange={(e) => setAllowances(e.target.value)} />
        <input placeholder="Deductions" onChange={(e) => setDeductions(e.target.value)} />
        <button>Generate Payroll</button>
      </form>

      {result && (
        <div>
          <h3>Payroll Generated</h3>
          <p>Net Salary: ₹{result.netSalary}</p>
          <p>AI Risk: {result.aiInsights?.riskLevel}</p>
          <p>Reason: {result.aiInsights?.reason}</p>
        </div>
      )}
    </div>
  );
}
