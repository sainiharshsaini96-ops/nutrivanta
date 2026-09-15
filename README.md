# ElectroMart — Fullstack Precision Tech Commerce Platform

A modern, high-performance electronics marketplace application converted into a **React + Vite** frontend and **Node.js (Express)** backend with full REST APIs, Tailwind CSS design system, and responsive checkout flows.

---

## 🚀 Features

- **React + Vite Frontend**: Fast development server with Hot Module Replacement (HMR) and optimized build bundles.
- **Node.js & Express Backend**: REST API service providing product catalogs, category filtering, search, coupon validation, and order submission.
- **Precision Tech Design System**: Custom Tailwind configuration matching `DESIGN.md` specifications (`Plus Jakarta Sans` typography, high-contrast dark/electric blue palettes, micro-elevation shadows, and pill status chips).
- **Interactive E-Commerce Flows**:
  - **Dynamic Home Screen**: Live TechFest countdown ticker, horizontal category rail, 2-column flash deals grid, official brand partners, trust guarantee cards, and verified customer review carousel.
  - **Product Detail View (`/product/:id`)**: High-res product gallery, 360° view indicator, interactive color finish selector (Midnight Blue, Silver Platinum, Matte Black), dynamic price savings calculator, ElectroPay 0% APR installment breakdown, 2-Year Accidental Damage Protection toggle, and collapsible technical specs accordion.
  - **Checkout & Payment Flow (`/checkout`)**: 4-step progress stepper (Address, Delivery, Payment, Review), pre-populated delivery address & speed, expandable order summary preview, payment method selector (Credit/Debit Card with live card input, 1-Tap Apple/Google Pay, ElectroMart Pay Later BNPL, Digital Wallets, Cash on Delivery), interactive promo voucher validator (`TECH10` / `FLASH50`), and simulated encrypted checkout confirmation.
  - **Slide-out Cart Drawer**: Accessible from any page header or bottom nav, allowing instant quantity changes, item removal, and live subtotal/tax recalculation.
  - **Responsive Mobile Navigation**: Fixed top header and bottom bar on mobile screens.

---

## 📁 Project Structure

```
electronic web/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Header, BottomNav, Toast, CartDrawer
│   │   ├── context/            # CartContext, WishlistContext (localStorage synced)
│   │   ├── pages/              # HomePage, ProductDetailPage, CheckoutPage
│   │   ├── services/           # api.js (Axios/fetch client with offline fallback)
│   │   ├── App.jsx             # Main router & provider tree
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind directives & design tokens
│   ├── index.html              # HTML entry point with Google Fonts & Material Symbols
│   ├── tailwind.config.js      # Precision Tech Commerce design token configuration
│   ├── vite.config.js          # Vite config with /api proxy to Node backend
│   ├── package.json
│   ├── .env                    # Frontend environment variables
│   └── .env.example
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── data/               # Seeded product catalog (products.json)
│   │   ├── routes/             # Express API routes (api.js)
│   │   └── index.js            # Express server initialization & middleware
│   ├── package.json
│   ├── .env                    # Backend environment variables
│   └── .env.example
├── .gitignore                  # Production gitignore (node_modules, dist, .env, OS files)
├── .env                        # Root environment configuration
├── .env.example                # Root environment template
└── package.json                # Root orchestration scripts
```

---

## ⚙️ Environment Variables

### Root / Shared (`.env`)
```env
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
CLIENT_ORIGIN=http://localhost:5173
```

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=/api
```

---

## 🛠️ Quick Start Guide

### 1. Install Dependencies

Install dependencies for the backend and frontend:

```bash
# In the project root:
npm install

# In the server folder:
cd server
npm install

# In the client folder:
cd ../client
npm install
```

### 2. Running the Application

You can start both backend and frontend concurrently or run them separately:

#### Option A: Run Both Concurrently (From Root)
```bash
npm run dev
```

#### Option B: Run Individually
**Terminal 1 — Backend (Port 5000):**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend (Port 5173):**
```bash
cd client
npm run dev
```

Visit the application at: **`http://localhost:5173`**

---

## 📡 Backend REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | API health check & server status |
| `GET` | `/api/products` | Retrieve all products (Supports `?category=`, `?search=`, `?flash=true`) |
| `GET` | `/api/products/:id` | Retrieve single product details & technical specifications |
| `GET` | `/api/categories` | Retrieve all product categories and icons |
| `GET` | `/api/brands` | Retrieve authorized tech brand partners |
| `GET` | `/api/reviews` | Retrieve verified customer reviews |
| `POST` | `/api/promo/validate` | Validate coupon code (`TECH10` for \$20 off, `FLASH50` for \$50 off) |
| `POST` | `/api/orders` | Place and confirm order with generated Order ID |
| `POST` | `/api/newsletter` | Subscribe email for instant discount voucher |
