Staff Loan PortalThis is a full-stack application for managing staff loans, built as part of a practical test. The application consists of a secure NestJS RESTful API backend and a responsive Vue.js frontend.FeaturesBackend (NestJS)JWT role-based authentication (staff, admin, superadmin).Secure /login and /logout endpoints.Protected endpoints for managing loan data.Role-based access control:staff can view loans but not sensitive totalLoan data.admin can view all loan data.superadmin can view all data and delete loans.API endpoint filtering by loan status (/loans?status=...).API endpoint for fetching all expired loans (/loans/expired).Global middleware for security (helmet), logging (morgan), rate-limiting (throttler), and CORS.Frontend (Vue.js)Responsive login page built from Figma design.API client with request interceptors to automatically send auth tokens.State management with Pinia (authStore, loanStore).Token management using sessionStorage.Password visibility toggle ("see/unsee").Protected dashboard route.Dashboard for viewing, filtering, and deleting loans based on user role.Tech StackBackend: NestJS, TypeScript, Passport (JWT), class-validatorFrontend: Vue 3 (Composition API), TypeScript, Vite, Vue Router, Pinia, AxiosPrerequisitesNode.js (v18 or later recommended)GitGetting StartedYou will need to run both the backend and frontend projects in separate terminals.1. Backend (NestJS)First, clone the backend repository (staff-loan-api).# Clone the repository
git clone [https://github.com/your-username/staff-loan-api.git](https://github.com/your-username/staff-loan-api.git)
cd staff-loan-api

# Install dependencies
npm install

# Create an environment file
cp .env.example .env
Next, open the .env file and add your JWT secret:JWT_SECRET=YOUR_SUPER_STRONG_SECRET_KEY
Finally, run the development server:# Run the app
npm run start:dev
The API will be running at http://localhost:3000.2. Frontend (Vue.js)Clone the frontend repository (staff-loan-ui) in a different directory.# Clone the repository
git clone [https://github.com/your-username/staff-loan-ui.git](https://github.com/your-username/staff-loan-ui.git)
cd staff-loan-ui

# Install dependencies
npm install
The frontend is configured to find the API at http://localhost:3000 via its .env.development file.Run the development server:# Run the app
npm run dev
The frontend will be available at http://localhost:5173 (or the port specified in your terminal).