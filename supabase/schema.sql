-- ==============================================================================
-- SUBSATHI - SUPABASE DATABASE SCHEMA MIGRATION
-- Execute this script in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Streaming',
    price NUMERIC NOT NULL DEFAULT 499,
    original_price NUMERIC NOT NULL DEFAULT 699,
    stock INTEGER NOT NULL DEFAULT 50,
    rating NUMERIC DEFAULT 5.0,
    total_sales INTEGER DEFAULT 0,
    is_flash_sale BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    is_combo BOOLEAN DEFAULT false,
    short_description TEXT,
    long_description TEXT,
    logo_url TEXT,
    plans JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount_amount NUMERIC NOT NULL DEFAULT 0,
    coupon_code TEXT,
    payment_method TEXT NOT NULL DEFAULT 'whatsapp',
    transaction_id TEXT,
    status TEXT NOT NULL DEFAULT 'Pending Verification',
    customer_notes TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    id TEXT PRIMARY KEY,
    config JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount NUMERIC NOT NULL DEFAULT 10,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SUPPORT TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    order_id TEXT,
    category TEXT NOT NULL DEFAULT 'General',
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allow public read/write access for storefront operations & admin management
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Products Policies
CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert on products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on products" ON public.products FOR DELETE USING (true);

-- Orders Policies
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);

-- Store Settings Policies
CREATE POLICY "Allow public read on store_settings" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on store_settings" ON public.store_settings FOR ALL USING (true);

-- Coupons Policies
CREATE POLICY "Allow public read on coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Allow public insert on coupons" ON public.coupons FOR ALL USING (true);

-- Support Tickets Policies
CREATE POLICY "Allow public insert on support_tickets" ON public.support_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on support_tickets" ON public.support_tickets FOR SELECT USING (true);
CREATE POLICY "Allow public update on support_tickets" ON public.support_tickets FOR UPDATE USING (true);

-- ==============================================================================
-- REALTIME SUBSCRIPTIONS
-- Enable realtime updates on products, orders, and tickets
-- ==============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.store_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;
