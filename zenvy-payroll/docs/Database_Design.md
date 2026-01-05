
# Database Design — ZENVY Payroll

## Overview
The ZENVY Payroll system uses MongoDB as its primary datastore.
The schema is designed to support multi-tenancy, role-based access,
and efficient payroll processing.

Each collection includes a `companyId` field to enforce strict
data isolation between organizations.

---

## Collections

### 1. Company
Stores organization-level information.

Fields:
- _id (ObjectId, PK)
- name (String, unique)
- isActive (Boolean)
- createdAt, updatedAt

Purpose:
- Root entity for multi-tenant isolation
- All users and payroll data link to a company

---

### 2. User
Stores Admin, HR, and Employee accounts.

Fields:
- _id (ObjectId, PK)
- companyId (ObjectId, FK → Company)
- name (String)
- email (String)
- passwordHash (String, bcrypt)
- role (ADMIN | HR | EMPLOYEE)
- isActive (Boolean)
- createdAt, updatedAt

Indexes:
- (companyId, email) — unique

Purpose:
- Authentication and authorization
- Role-based access control

---

### 3. Attendance
Stores daily attendance records for employees.

Fields:
- _id (ObjectId, PK)
- companyId (ObjectId, FK → Company)
- employeeId (ObjectId, FK → User)
- date (Date)
- status (PRESENT | ABSENT | LEAVE)
- createdAt, updatedAt

Indexes:
- (companyId, employeeId, date) — unique

Purpose:
- Input for payroll calculation
- Attendance compliance tracking

---

### 4. Payroll
Stores processed payroll data.

Fields:
- _id (ObjectId, PK)
- companyId (ObjectId, FK → Company)
- employeeId (ObjectId, FK → User)
- month (String, YYYY-MM)
- salaryComponents (Embedded Document)
- netSalary (Number)
- generatedBy (ObjectId, FK → User)
- aiInsights (Object)
- createdAt, updatedAt

Salary Components:
- basic
- hra
- allowances
- deductions

Indexes:
- (companyId, employeeId, month) — unique

Purpose:
- Stores final payroll results
- Used to generate salary slips

---

### 5. AuditLog
Stores logs for sensitive operations.

Fields:
- _id (ObjectId, PK)
- companyId (ObjectId, FK → Company)
- userId (ObjectId, FK → User)
- action (String)
- metadata (Object)
- createdAt

Purpose:
- Compliance
- Security auditing
- Debugging

---

## Relationships
- Company → Users (1:N)
- User → Attendance (1:N)
- User → Payroll (1:N)
- Company → Payroll (1:N)

---

## Data Integrity Rules
- Users cannot access data from other companies
- Payroll cannot be generated without attendance data
- Employees can only view their own payroll
- Only HR/Admin can generate payroll

---

## Scalability & Performance
- Indexed companyId enables fast tenant filtering
- Embedded salary components reduce joins
- Schema supports horizontal scaling

---

## Summary
This database design ensures:
- Strong multi-tenancy
- Secure access control
- Efficient payroll processing
- Compliance-ready audit logging
