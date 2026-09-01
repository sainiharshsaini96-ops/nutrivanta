# 🌿 NutriVanta Backend API

**FastAPI + Supabase** backend for the NutriVanta Personalized Nutrition Platform.

---

## 📂 Project Structure

```
backend/
├── .env                    # Environment variables (Supabase creds, JWT secret)
├── .env.example            # Template for environment variables
├── .gitignore
├── requirements.txt        # Python dependencies
├── main.py                 # FastAPI app entry point
├── supabase_schema.sql     # Database schema (run in Supabase SQL Editor)
├── README.md
└── app/
    ├── __init__.py
    ├── config.py           # Settings loaded from .env
    ├── database.py         # Supabase client singleton
    ├── auth.py             # JWT + bcrypt auth utilities
    ├── schemas.py          # Pydantic request/response models
    └── routes/
        ├── __init__.py
        ├── auth_routes.py          # POST /register, /login, GET /me
        ├── user_routes.py          # GET/PUT /profile, GET /stats
        ├── nutritionist_routes.py  # GET/POST /nutritionists
        ├── booking_routes.py       # POST/GET /bookings, PATCH cancel
        ├── transaction_routes.py   # GET /transactions
        ├── contact_routes.py       # POST/GET /contact
        └── review_routes.py        # POST /reviews, GET by nutritionist
```

---

## 🚀 Quick Start

### 1. Set Up Supabase Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open **SQL Editor**
3. Paste and run the contents of `supabase_schema.sql`
4. This creates all 6 tables + indexes + RLS policies + seed data

### 2. Install Dependencies

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

### 3. Configure Environment

The `.env` file is already set up. Verify it contains:
```
SUPABASE_URL=https://ejixerzbepwudoeroobu.supabase.co
SUPABASE_KEY=your_key_here
```

### 4. Run the Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be live at:
- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login & get token | ❌ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |

### 👤 Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/users/profile` | Get user profile | ✅ |
| PUT | `/api/v1/users/profile` | Update user profile | ✅ |
| GET | `/api/v1/users/stats` | Get user statistics | ✅ |

### 🩺 Nutritionists
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/nutritionists/` | List all nutritionists | ❌ |
| GET | `/api/v1/nutritionists/{id}` | Get nutritionist profile | ❌ |
| POST | `/api/v1/nutritionists/` | Create nutritionist (admin) | ❌ |

### 📅 Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/bookings/` | Create a booking | ✅ |
| GET | `/api/v1/bookings/` | List user's bookings | ✅ |
| GET | `/api/v1/bookings/{id}` | Get booking details | ✅ |
| PATCH | `/api/v1/bookings/{id}/cancel` | Cancel a booking | ✅ |

### 💳 Transactions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/transactions/` | List user's transactions | ✅ |
| GET | `/api/v1/transactions/{id}` | Get transaction details | ✅ |

### 📬 Contact
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/contact/` | Submit contact form | ❌ |
| GET | `/api/v1/contact/` | List messages (admin) | ❌ |

### ⭐ Reviews
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/reviews/` | Submit a review | ✅ |
| GET | `/api/v1/reviews/nutritionist/{id}` | Get reviews | ❌ |

---

## 🔒 Authentication Flow

1. **Register** → POST `/api/v1/auth/register` → Returns JWT token
2. **Login** → POST `/api/v1/auth/login` → Returns JWT token
3. **Use Token** → Add `Authorization: Bearer <token>` header to protected routes

---

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with profile info & health goals |
| `nutritionists` | Nutritionist profiles with packages, education, reviews |
| `bookings` | Consultation bookings |
| `transactions` | Payment transaction history |
| `contact_messages` | Contact form submissions |
| `reviews` | User reviews for nutritionists |
