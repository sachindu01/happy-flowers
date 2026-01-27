# Happy Flowers (Anthurium Store) — Full Stack Web App

A full-stack e-commerce web application for an Anthurium nursery.  
Customers can browse plants publicly, and must log in to add items to a persistent cart and checkout.

## Tech Stack
- **Frontend:** React (planned)
- **Backend:** Spring Boot (Java 21), Spring Security (JWT)
- **Database:** PostgreSQL
- **Migrations:** Flyway
- **API Style:** REST (JSON)
- **Deployment (planned):** AWS

---

## Key Features (Implemented)
### Public
- View plant catalog (public endpoints)

### Admin (Single Admin)
- Admin-only plant management:
  - Create / Update / Delete plants

### Authentication
- JWT-based authentication
- Register and login endpoints
- Roles: `USER`, `ADMIN`
- Admin user seeded automatically (configurable via env vars)

### Cart (Database-backed)
- Persistent cart per user (stored in PostgreSQL)
- Add to cart / update quantity / remove items
- Total is calculated server-side

---

## Project Structure
-Happy Flowers/
-Backend/ # Spring Boot API
-Frontend/ # React app (planned / in progress)
