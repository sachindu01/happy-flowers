# Happy Flowers (Anthurium Store) — Full Stack Web App

A full-stack e-commerce web application for an Anthurium nursery.  
Customers can browse plants publicly, and must log in to add items to a persistent cart and checkout.

---

## Tech Stack
- **Frontend:** React
- **Backend:** Spring Boot (Java 21), Spring Security (JWT)
- **Database:** PostgreSQL
- **Migrations:** Flyway
- **API Style:** REST (JSON)
- **Deployment (planned):** AWS

---

## Key Features

### Public
- Browse plant catalog (public access)

### Authentication
- Register and login endpoints
- JWT-based authentication
- Roles: `USER`, `ADMIN`
- Admin user seeded automatically (configurable via environment variables)

### Cart (Database-backed)
- Persistent cart per user (stored in PostgreSQL)
- Add to cart / update quantity / remove items
- Cart total calculated server-side

### Admin (Single Admin)
- Admin-only plant management:
  - Create / Update / Delete plants

---

