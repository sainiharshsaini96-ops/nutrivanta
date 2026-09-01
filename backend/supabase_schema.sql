-- ════════════════════════════════════════════════════════════
-- NutriVanta — Supabase Database Schema Setup
-- Run this SQL in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ════════════════════════════════════════════════════════════

-- Enable UUID extension (should be enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ────────────────────────────────────────────
-- 1. USERS TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone TEXT,
    dob TEXT,
    gender TEXT,
    location TEXT,
    role TEXT DEFAULT 'NutriVanta Member',
    avatar TEXT,
    health_goals JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────
-- 2. NUTRITIONISTS TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nutritionists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    degree TEXT,
    experience TEXT,
    rating NUMERIC(3, 1) DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    location TEXT,
    next_available TEXT,
    avatar TEXT,
    about TEXT,
    expertise JSONB DEFAULT '[]'::jsonb,
    education JSONB DEFAULT '[]'::jsonb,
    packages JSONB DEFAULT '[]'::jsonb,
    reviews JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────
-- 3. BOOKINGS TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nutritionist_id UUID REFERENCES nutritionists(id) ON DELETE SET NULL,
    nutritionist_name TEXT,
    package_id TEXT NOT NULL,
    package_title TEXT,
    patient_name TEXT NOT NULL,
    patient_email TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    payment_method TEXT DEFAULT 'UPI',
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    amount INTEGER DEFAULT 0,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────
-- 4. TRANSACTIONS TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    txn_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    doctor TEXT NOT NULL,
    doctor_initials TEXT,
    service TEXT NOT NULL,
    amount INTEGER DEFAULT 0,
    method TEXT DEFAULT 'UPI',
    status TEXT DEFAULT 'Paid',
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────
-- 5. CONTACT MESSAGES TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT DEFAULT 'Consultation Inquiry',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────
-- 6. REVIEWS TABLE
-- ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    nutritionist_id UUID REFERENCES nutritionists(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ════════════════════════════════════════════════════════════
-- INDEXES for Performance
-- ════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_txn_id ON transactions(txn_id);
CREATE INDEX IF NOT EXISTS idx_reviews_nutritionist_id ON reviews(nutritionist_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);


-- ════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) Policies
-- ════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutritionists ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow all operations via the service/anon key (for backend API usage)
-- In production, tighten these policies as needed.

CREATE POLICY "Allow all for anon" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON nutritionists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON reviews FOR ALL USING (true) WITH CHECK (true);


-- ════════════════════════════════════════════════════════════
-- SEED DATA — Sample Nutritionist (Dr. Priya Sharma)
-- ════════════════════════════════════════════════════════════

INSERT INTO nutritionists (name, role, degree, experience, rating, reviews_count, location, next_available, avatar, about, expertise, education, packages, reviews)
VALUES (
    'Dr. Priya Sharma',
    'Senior Clinical Nutrition Specialist',
    'M.Sc. Clinical Nutrition, RD',
    '8+ Years',
    4.9,
    124,
    'Delhi NCR, India',
    'Tomorrow, 10:00 AM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuByZdtP7zLZpAWTBv8ka3nlF31p0c3bJnR_FPIzMZtKRviMWeeDeDT6vjIgfCEWfBKHjIwFZkYbQunvYhblITFPxCV9qWRXawd1ceFa1dVnyd-IoYQOiVd-phQlzJJfPM4YzXmimJEViJtpr4_Ov8_gLn32aZvE5HF0XQO7X8M0U70hhGdlWf_Ci9zCh2PT6o0eg6aWzPgPpA1Lc8uRo5FLFpn18vbLlu5eNzp16NksovPJwQw-XThk9g',
    'Dr. Priya Sharma is a clinical nutrition specialist focused on personalized nutrition strategies. With over 8 years of experience in clinical settings, she believes in a holistic, science-backed approach to wellness. She specializes in chronic disease management, particularly diabetes and metabolic disorders, translating complex nutritional science into actionable, everyday dietary changes for her clients.',
    '["Weight Management", "Diabetes & Insulin Resistance", "PCOS & Hormone Health", "Clinical Nutrition", "Gut Health & Microbiome", "Cardiovascular Wellness"]'::jsonb,
    '[
        {"title": "M.Sc. Clinical Nutrition & Dietetics", "institution": "All India Institute of Medical Sciences", "year": "2016"},
        {"title": "Registered Dietitian (RD) Certification", "institution": "Indian Dietetic Association", "year": "2017"},
        {"title": "B.Sc. Food & Nutrition Sciences", "institution": "Delhi University", "year": "2014"}
    ]'::jsonb,
    '[
        {"id": "initial-30", "title": "Initial Assessment", "duration": "30 Min", "price": 799, "description": "30-minute quick consultation for diet review and basic guidance.", "popular": false, "features": ["Diet History Review", "Goal Setting & Calorie Target", "General Nutrition Tips", "Q&A Session"]},
        {"id": "comprehensive-60", "title": "Comprehensive Plan", "duration": "60 Min", "price": 1299, "description": "60-minute deep dive with a personalized 2-week meal plan.", "popular": true, "features": ["Full Medical & Biochemical Review", "Customized 14-Day Meal Plan", "Macro & Micronutrient Breakdown", "1 Week Dedicated Chat Support", "Supplement & Lifestyle Guide"]}
    ]'::jsonb,
    '[
        {"id": "r1", "name": "Arjun K.", "initials": "AK", "rating": 5, "date": "14 Aug 2026", "comment": "Dr. Priya completely changed my approach to managing my diabetes. The meal plans are practical, culturally tailored, and easy to follow."},
        {"id": "r2", "name": "Sneha M.", "initials": "SM", "rating": 5, "date": "28 Jul 2026", "comment": "Very knowledgeable and patient. She listens to your dietary struggles before suggesting any sustainable changes without starving."},
        {"id": "r3", "name": "Rahul Verma", "initials": "RV", "rating": 4, "date": "19 Jul 2026", "comment": "The PCOS protocol she gave my sister showed noticeable results within 3 weeks. Highly recommend her consultation."}
    ]'::jsonb
)
ON CONFLICT DO NOTHING;


-- ════════════════════════════════════════════════════════════
-- ✅ Schema setup complete!
-- ════════════════════════════════════════════════════════════
