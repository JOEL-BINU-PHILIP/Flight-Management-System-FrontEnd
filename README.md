# Flight Management System - Frontend

A modern Angular-based frontend application for the Flight Management System, providing a user interface for searching, booking, and managing flight reservations.

---

## Project Documentation

For Important Screenshots - **[Project Summary Report (PDF)](https://github.com/JOEL-BINU-PHILIP/Flight-Management-System-FrontEnd/blob/main/Project-Summary-Report.pdf)**

---

## Overview

This is the frontend application for the Flight Management System, built with Angular 21 and Bootstrap 5. It provides a responsive interface for customers to search and book flights, and for administrators to manage airlines and flight inventory.

---

## Tech Stack

- **Angular** 21.0.3
- **TypeScript** 5.9.2
- **Bootstrap** 5.3.8
- **RxJS** 7.8.0
- **Vitest** 4.0.8

---

## Prerequisites

- Node.js v18. x or higher
- npm v11.6. 4 or higher
- Angular CLI v21.0.3 (optional)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/flight-management-frontend.git
cd flight-management-frontend

# Install dependencies
npm install
```

---

## Configuration

Update the backend API URLs in service files if needed:

**src/app/services/auth. service.ts**
```typescript
const AUTH_API = 'http://localhost:8080/auth/';
```

**src/app/services/flight.service.ts**
```typescript
const FLIGHT_API = 'http://localhost:8080/api/flight/';
```

---

## Running the Application

```bash
# Start development server
npm start

# Or using Angular CLI
ng serve
```

The application will be available at `http://localhost:4200/`

---

## Available Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page |
| `/login` | Login | Public | User login |
| `/register` | Register | Public | User registration |
| `/search` | Flight Search | Protected | Search flights |
| `/flight/: id` | Flight Details | Protected | View flight details |
| `/add-airline` | Add Airline | Admin Only | Add new airline |
| `/add-flight` | Add Flight | Admin Only | Add flight inventory |

---

## API Integration

The frontend communicates with the backend microservices through an API Gateway at `http://localhost:8080`.

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (returns JWT)
- `POST /auth/logout` - Logout

### Flight Endpoints
- `POST /api/flight/search` - Search flights
- `GET /api/flight/details/:id` - Get flight details
- `POST /api/flight/airline` - Add airline (Admin)
- `POST /api/flight/airline/:id/inventory` - Add flight (Admin)

### Booking Endpoints
- `POST /api/book/book` - Book flight
- `GET /api/book/ticket/:pnr` - Get ticket
- `GET /api/book/history/: email` - Booking history
- `DELETE /api/book/cancel/:pnr` - Cancel booking

---

## Authentication

The application uses JWT-based authentication with HTTP-only cookies. Tokens are automatically injected into requests via an HTTP interceptor.

---

## Related Projects

- [Backend Microservices](https://github.com/JOEL-BINU-PHILIP/Flight-Management-System-Microservices-Architecture-With-JWT-Authentication-Docker)
- [Configuration Repository](https://github.com/JOEL-BINU-PHILIP/fms-config-repo)

