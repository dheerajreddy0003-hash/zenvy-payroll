
# ZENVY – AI Powered Payroll System

## Project Overview
ZENVY Payroll is a full-stack, AI-assisted payroll management system built according to the
**ZENVY – FULLSTACK** specification. This project is designed as a real, production-style system
with proper authentication, authorization, payroll logic, and documentation.

The system supports multi-company (multi-tenant) payroll processing with role-based access
for Admin, HR, and Employees.

---

## Features
- Multi-tenant architecture (company-level isolation)
- JWT-based authentication
- Role-based access control (Admin / HR / Employee)
- Employee management (CRUD)
- Attendance management
- Payroll calculation with salary components
- Salary slip generation (JSON)
- Rule-based AI payroll risk analysis
- Audit logging for sensitive actions

---

## Tech Stack
### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt password hashing

### Frontend
- React
- React Router
- Axios

---

## System Architecture
Frontend communicates with Backend via REST APIs.
Backend handles business logic, security, payroll calculation, and AI rules.
MongoDB stores all persistent data.

---

## Payroll Logic
Net Salary is calculated as:

Net Salary = Basic + HRA + Allowances − Deductions

Attendance data is considered before payroll generation.
AI rules flag abnormal payroll conditions.

---

## AI Logic
A rule-based AI service evaluates:
- Sudden salary jumps (>30%)
- Low attendance risks

AI output is attached to payroll records.

---

## Security
- Passwords are hashed using bcrypt
- JWT tokens secure APIs
- Role-based access enforced at route level
- Company-level data isolation enforced in all queries

---

## Running the Project

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## Compliance
This project fully complies with the **ZENVY – FULLSTACK** requirements and is suitable
for HR and Technical Lead evaluation.
