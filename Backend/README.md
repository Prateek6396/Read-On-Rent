# 📚 Read on Rent — Backend

Complete REST API for the Read on Rent book rental platform, built with Node.js, Express, and MongoDB — matching the architecture described in the project's Backend Setup Guide.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (jsonwebtoken + bcryptjs)
- **Validation**: express-validator
- **Email**: nodemailer (falls back to console logging if SMTP isn't configured)
- **Payments**: Razorpay (falls back to a mock order if no keys are configured)
- **Security**: helmet, cors, express-rate-limit
- **File uploads**: multer

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# then edit .env with your MongoDB URI, JWT secret, etc.

# 3. Seed the database (66 demo books + admin/test users)
npm run seed:all

# 4. Run in development (auto-restart on changes)
npm run dev

# ...or run in production mode
npm start
```

The server starts on `http://localhost:3000` by default. Check it's alive:

```bash
curl http://localhost:3000/health
```

## Demo Credentials (after seeding)

| Role  | Email                  | Password      |
|-------|-------------------------|---------------|
| Admin | admin@readonrent.com    | Admin@12345   |
| User  | test@example.com        | password      |

(Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before seeding to use your own admin credentials.)

## Project Structure

```
backend/
├── src/
│   ├── models/        # Mongoose schemas (User, Book, Order, Cart, Review, Rental, Reward, Wishlist)
│   ├── routes/         # Express routers, one per resource
│   ├── controllers/    # Business logic for each route
│   ├── middleware/      # auth, error handling, validation, upload, rate limiting
│   ├── utils/           # jwt, email, payment, validators, constants
│   ├── config/          # env, database connection, app constants
│   └── seeders/         # seedBooks.js, seedUsers.js, seedCategories.js, booksData.js
├── tests/               # Jest + Supertest tests
├── server.js            # App entry point
├── .env.example
└── package.json
```

## API Overview

All endpoints are prefixed with `/api`. Routes marked 🔒 require `Authorization: Bearer <token>`; 🔒👑 require an admin account.

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in, receive a JWT |
| POST | `/auth/logout` | 🔒 Logout (stateless, client discards token) |
| GET | `/auth/verify` | 🔒 Verify current token / get user |

### Books
| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | List books (`?category=&sort=rating\|price\|-price&page=&limit=`) |
| GET | `/books/:id` | Get a single book |
| GET | `/books/search?q=` | Search by title/author/category |
| GET | `/categories` | List all categories |

### Reviews
| Method | Endpoint | Description |
|---|---|---|
| POST | `/reviews` | 🔒 Add a review (`bookId, rating, comment`) |
| GET | `/reviews/:bookId` | Get all reviews for a book |

### Cart 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/cart` | Get current user's cart |
| POST | `/cart/add` | Add item (`bookId, rentalDuration, quantity`) |
| PUT | `/cart/:bookId` | Update quantity |
| DELETE | `/cart/:bookId` | Remove item |
| POST | `/cart/checkout` | Checkout (`deliveryAddress, paymentMethod`) → creates an Order + Rentals |
| POST | `/cart/clear` | Empty the cart |

### Orders 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/orders` | List current user's orders |
| GET | `/orders/:id` | Get order details |
| POST | `/orders/:id/track` | Get a status timeline |
| POST | `/orders/:id/cancel` | Cancel an order & restock |
| POST | `/orders/:id/return` | Submit a return request |

### Users 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/profile` | Get profile |
| PUT | `/users/profile` | Update name/phone/address |
| PUT | `/users/password` | Change password |

### Rentals 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/rentals` | Rental history |
| GET | `/rentals/:id` | Rental details |
| POST | `/rentals/:id/return` | Mark returned → awards reward points |

### Rewards 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/rewards` | Current point balance |
| GET | `/rewards/history` | Point transaction ledger |
| POST | `/rewards/redeem` | Redeem points (`points, orderId?`) |

### Wishlist 🔒 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/wishlist` | Get wishlist |
| POST | `/wishlist/add` | Add a book (`bookId`) |
| DELETE | `/wishlist/:bookId` | Remove a book |
| GET | `/wishlist/:bookId` | Check if a book is wishlisted |

### Admin 🔒👑 (all routes)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/users` | List all users (paginated) |
| GET | `/admin/books` | List all books (incl. inactive) |
| POST | `/admin/books` | Create a book |
| PUT | `/admin/books/:id` | Update a book |
| DELETE | `/admin/books/:id` | Soft-delete (deactivate) a book |
| GET | `/admin/orders` | List all orders (`?status=`) |
| GET | `/admin/reports` | Dashboard analytics |
| POST | `/admin/seed/books` | Re-seed the 66-book demo catalog via API (per the Deployment Guide) |

## Auth Flow

1. Register or log in → receive a JWT (`JWT_EXPIRE`, default 7 days).
2. Store the token client-side (e.g. `localStorage`, matching the frontend's current demo-mode approach).
3. Send it on every protected request: `Authorization: Bearer <token>`.
4. `authMiddleware` verifies the token and loads the user onto `req.user`; `adminOnly` additionally checks `role === 'admin'`.

## Demo Book Catalog

`src/seeders/booksData.js` programmatically generates **66 books across the 8 categories** (Fiction, Romance, Mystery, Business, Sci-Fi, Fantasy, Self-Help, Non-Fiction) using well-known public book titles/authors as placeholder metadata — mirroring the frontend's `mockData.js`. Swap this file out with your real catalog (e.g. exported from the frontend) whenever you're ready.

## Notes on Optional Integrations

- **Email**: if `SMTP_HOST/USER/PASS` aren't set, emails are just logged to the console instead of failing requests — handy for local dev.
- **Payments**: if `RAZORPAY_KEY_ID/SECRET` aren't set, `createPaymentOrder` returns a mock order and checkout proceeds with `paymentStatus: 'completed'` for demo purposes. Wire up real signature verification (`verifyPaymentSignature`) before going live.
- **File uploads**: `multer` writes to `/uploads` (create this folder, or point `storage.destination` elsewhere) and is wired up but not yet mounted to a specific route — attach it to `admin/books` routes if you want image upload support.

## Deployment

See the project's Deployment Guide for the full Render + MongoDB Atlas walkthrough. Quick version:

1. Push this folder to its own GitHub repo (`read-on-rent-backend`).
2. On Render: **New → Web Service**, Build Command `npm install`, Start Command `npm start`.
3. Add all `.env` variables in Render's dashboard (never commit `.env`).
4. After deploy, seed the database: `npm run seed:all` locally against the Atlas URI, or call `POST /api/admin/seed/books` (as an admin) once the server is live.
5. Update the frontend's `VITE_API_URL` to point at your Render backend URL.

## Testing

```bash
npm test
```

Includes a starter health-check test (`tests/health.test.js`). Add more under `tests/` following the same Supertest pattern — you'll want a test database (or `mongodb-memory-server`) for anything that touches Mongoose models.
