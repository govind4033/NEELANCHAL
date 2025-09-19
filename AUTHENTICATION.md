# Authentication System

This document describes the authentication system implemented for the Neelanchal platform.

## Overview

The authentication system has been converted from a simple role selection landing page to a full authentication system with login and registration capabilities.

## Features

### Frontend Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state across the application
   - Provides login, register, and logout functions
   - Handles token storage in localStorage
   - Auto-redirects authenticated users

2. **Login Page** (`src/pages/Login.tsx`)
   - Username and password form
   - Password visibility toggle
   - Error handling and loading states
   - Link to registration page

3. **Register Page** (`src/pages/Register.tsx`)
   - Username, password, and role selection
   - Visual role selection with descriptions
   - Password confirmation validation
   - Link to login page

4. **Protected Routes** (`src/components/ProtectedRoute.tsx`)
   - Wraps protected pages
   - Redirects unauthenticated users to login
   - Optional role-based access control

### Backend Integration

The system integrates with the existing backend authentication endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## User Roles

The system supports four user roles:

1. **Community** - Upload geo-tagged field data, track submissions
2. **NGO** - Validate and aggregate community data
3. **Government** - Approve projects, issue credits, monitor registry
4. **Investor** - Browse verified projects, purchase/retire credits

## Usage

### Starting the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Authentication Flow

1. **Landing Page**: Shows platform overview with "Get Started" button
2. **Login/Register**: Users can sign in or create new accounts
3. **Role Selection**: During registration, users select their role
4. **Dashboard**: After authentication, users are redirected to their role-specific dashboard
5. **Logout**: Users can logout from the navigation dropdown

### Protected Routes

All main application routes are now protected:
- `/dashboard` - Main dashboard (role-specific)
- `/registry` - Credit registry
- `/mrv` - Measurement, Reporting & Verification
- `/marketplace` - Credit marketplace
- `/reports` - Analytics and reports
- `/notifications` - User notifications

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Token storage in localStorage
- Automatic token validation
- Role-based access control
- Protected route guards

## Development Notes

- The authentication context is provided at the app level
- All protected routes are wrapped with `ProtectedRoute` component
- User state persists across browser sessions
- Automatic logout on token expiration (handled by backend)
- Responsive design for mobile and desktop

## Testing

To test the authentication system:

1. Register a new user with any role
2. Login with the created credentials
3. Verify access to protected routes
4. Test logout functionality
5. Verify redirect behavior for unauthenticated users
