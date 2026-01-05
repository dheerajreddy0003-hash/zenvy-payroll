
# System Architecture — ZENVY Payroll

## Overview
ZENVY Payroll is designed as a secure, scalable, multi-tenant payroll management system.
The architecture follows a clean three-tier model with clear separation of concerns.

---

## High-Level Architecture
Client (React Frontend)
        |
        |  HTTPS (REST APIs, JWT Auth)
        v
Backend (Node.js + Express)
        |
        |  Mongoose ODM
        v
MongoDB Database

---

## Frontend Layer (React)
Responsibilities:
- User authentication (Login/Register)
- Role-based navigation (HR / Employee)
- Secure API consumption using JWT
- Payroll operations (Run Payroll, View Salary Slip)

Key Characteristics:
- Protected routes using role-based guards
- Stateless UI with token-based authentication
- Axios interceptor for automatic token injection

---

## Backend Layer (Node.js + Express)
Responsibilities:
- Authentication and authorization
- Business logic enforcement
- Payroll calculation
- Attendance processing
- AI-based payroll risk evaluation
- Audit logging

Core Components:
- Controllers: Handle request/response logic
- Services: Payroll logic and AI rules
- Middleware: JWT verification, RBAC, error handling
- Models: MongoDB schemas

Security Measures:
- bcrypt password hashing
- JWT token verification
- Role-based access control
- Company-level data isolation in every query

---

## Database Layer (MongoDB)
Responsibilities:
- Persistent storage of payroll data
- Multi-tenant data separation
- High availability and scalability

Collections:
- Company
- User
- Attendance
- Payroll
- AuditLog

Indexes:
- companyId indexed across all major collections
- Composite indexes for payroll uniqueness

---

## Multi-Tenancy Design
Each request carries a companyId derived from the JWT.
All database queries are filtered using this companyId to ensure:
- Complete data isolation
- No cross-company data leakage
- Safe SaaS-style operation

---

## Payroll Workflow
1. HR initiates payroll run
2. Attendance is validated
3. Salary components are processed
4. Net salary is calculated
5. AI rules evaluate payroll risks
6. Payroll record is saved
7. Audit log is generated
8. Salary slip is available to employee

---

## AI Integration (Rule-Based)
AI is implemented as an executable rule engine:
- Detects abnormal salary increments
- Flags low-attendance payroll risks

This approach ensures:
- Real execution
- PDF compliance
- No dependency on external ML services

---

## Scalability Considerations
- Stateless backend supports horizontal scaling
- MongoDB indexes ensure performance
- Frontend served as static assets

---

## Summary
The ZENVY Payroll architecture ensures security, scalability, and clarity.
It is suitable for real-world deployment and technical evaluation.
