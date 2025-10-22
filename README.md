# Staff Loan Portal

This is a full-stack application for managing staff loans, built as part of a practical test.  
The application consists of a secure **NestJS RESTful API** backend and a responsive **Vue.js** frontend.

---

## Features

### Backend (NestJS)

- JWT role-based authentication (`staff`, `admin`, `superadmin`)
- Secure `/login` and `/logout` endpoints
- Protected endpoints for managing loan data
- Role-based access control:
  - **Staff:** can view loans but not sensitive `totalLoan` data
  - **Admin:** can view all loan data
  - **Superadmin:** can view all data and delete loans
- API endpoint filtering by loan status (`/loans?status=...`)
- API endpoint for fetching all expired loans (`/loans/expired`)
- Global middleware for:
  - Security (`helmet`)
  - Logging (`morgan`)
  - Rate limiting (`throttler`)
  - CORS

### Frontend (Vue.js)

- Responsive login page built from Figma design
- API client with request interceptors to automatically send auth tokens
- State management with **Pinia** (`authStore`, `loanStore`)
- Token management using `sessionStorage`
- Password visibility toggle ("see/unsee")
- Protected dashboard route
- Dashboard for viewing, filtering, and deleting loans based on user role

---

## Tech Stack

**Backend:** NestJS, TypeScript, Passport (JWT), class-validator  
**Frontend:** Vue 3 (Composition API), TypeScript, Vite, Vue Router, Pinia, Axios

---

## Prerequisites

- Node.js (v18 or later recommended)
- Git

---

## Getting Started

You will need to run both the backend and frontend projects in separate terminals.

### 1. Backend (NestJS)

Clone the backend repository:

```bash
# Clone the repository
git clone https://github.com/your-username/staff-loan-api.git
cd staff-loan-api

# Install dependencies
npm install

# Create an environment file
cp .env.example .env