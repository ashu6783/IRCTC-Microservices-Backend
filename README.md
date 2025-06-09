# IRCTC Microservices Backend

A modular backend system built with microservices architecture to simulate an IRCTC-like train booking platform. This project divides backend functionality into independent microservices for scalability, maintainability, and ease of deployment. Each microservice handles a specific domain such as authentication, user management, train data, booking, payments, and notifications.

## Microservices & Ports

| Service                | Description                                  | Default Port |
|------------------------|----------------------------------------------|--------------|
| **auth-service**        | User registration, login, and JWT handling  | 5001         |
| **user-service**        | User profiles and preferences                | 5002         |
| **train-service**       | Train information, schedules, availability  | 5003         |
| **booking-service**     | Ticket booking, cancellation, PNR generation| 5004         |
| **payment-service**     | Payment processing and status tracking       | 5005         |
| **notification-service**| Email/SMS notifications                      | 5006         |

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- RESTful APIs for service communication

## Features

- Microservices architecture for modular development  
- Independent databases and deployments per service  
- JWT authentication with token validation  
- CRUD APIs for users, trains, and bookings  
- Integrated booking workflow with payment and notifications  

## Prerequisites

- Node.js (v16 or above)  
- MongoDB running locally or remote  
- (Optional) Postman for API testing

## Setup & Run Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/IRCTC-Microservices-Backend.git
   cd IRCTC-Microservices-Backend
   ```

2. Install dependencies for each service:

   ```bash
   cd auth-service
   npm install
   # Repeat for other services as needed
   ```

3. Set up environment variables for each service (see `.env` in `auth-service` for example).

4. Start each service:

   ```bash
   npm start
   ```

5. Access the APIs at their respective ports.

## Folder Structure

```
api-gateway/
auth-service/
booking-service/
notification-service/
payment-service/
train-service/
```

Each service contains its own `package.json`, routes, controllers, and configuration.

## Example: Auth Service Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/users` — Get all users (admin only, protected)

## License

MIT
