# Happy Flowers (Anthurium Store) — Full Stack Web App

Happy Flowers is a full-stack e-commerce web application for an Anthurium nursery.
Anyone can browse the plant catalog publicly, but users must register/login to use the cart and checkout.
Admins can manage plant inventory and view all orders.

---

## Tech Stack

### Frontend
- React **19.2** (SPA)
- Vite **7.2** (dev server + build)
- react-router-dom **7.13** (routing)
- axios **1.13** (API client)
- React Context API (AuthContext, CartContext)

### Backend
- Spring Boot (Java 21)
- Spring Security (JWT)

### Database
- PostgreSQL (Flyway migrations)

### API
- REST (JSON)
- JWT stateless auth with roles: `USER`, `ADMIN`

### Deployment (planned)
- AWS

---

## Key Features

### Public
- Browse plant catalog
  - `GET /api/plants`
  - `GET /api/plants/:id`

### Authentication (JWT)
- Register: `POST /auth/register` (default role `USER`)
- Login: `POST /auth/login` (returns JWT)
- JWT stored in `localStorage` under key `token`
- JWT payload includes `userId`, `username`, and `role` (`USER`/`ADMIN`)

### Cart (Persistent + Database-backed)
- One cart per user (stored in PostgreSQL)
- Add/update/remove items via `/api/cart/*`
- Cart totals are computed server-side (prevents client-side price manipulation)
- Checkout:
  - `POST /api/orders/checkout` (places order + clears cart)
- Order history:
  - `GET /api/orders`

### Admin (ADMIN only)
- Plant inventory management (CRUD)
  - `/api/admin/plants/*`
- View all customer orders
  - `GET /api/admin/orders`
- Admin user is seeded automatically at startup (configurable via environment variables)

---
