# 🚀 SubSathi – Nepal's Premier Digital Subscriptions Store

SubSathi is a fast, modern, and production-ready e-commerce platform for digital subscriptions, software licenses, AI tools, and OTT platforms in Nepal.

---

## 🌟 Key Features

- **⚡ Instant Local Payments:** Built for Nepali consumers with **eSewa, Khalti, and Mobile Banking** payment gateways.
- **📱 WhatsApp Order & Activation Dispatch:** Direct WhatsApp checkout and credentials delivery workflow.
- **🔐 Admin CRM Suite (`/aresxayu6720`):** Full dashboard for managing Products, Orders, Live Badges, Coupons, Store Settings, and CRM Leads.
- **🛡️ 100% Replacement Warranty & Support Desk:** Real-time ticketing system with WhatsApp forward sync.
- **🌐 Standalone Dedicated Policy Pages:** About Us, Contact, How It Works, Refund Policy, Privacy Policy, Terms & Conditions, Warranty Policy, and Support Desk.
- **☁️ Supabase Cloud & Local Hybrid Database:** Operates smoothly with local storage and syncs seamlessly with Supabase PostgreSQL cloud.

---

## 🚀 Deployment Guide

### 1. 🐙 GitHub Setup

1. Initialize Git in the project directory:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SubSathi production build"
   ```

2. Create a new repository on [GitHub](https://github.com/new).

3. Link and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/subsathi.git
   git push -u origin main
   ```

---

### 2. ⚡ Vercel Deployment (Frontend Hosting)

1. Go to [Vercel](https://vercel.com) and click **"Add New" ➔ "Project"**.
2. Select your `subsathi` GitHub repository.
3. **Build and Output Settings** (automatically detected from `vercel.json`):
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. In **Environment Variables**, add:
   ```env
   VITE_STORE_NAME=SubSathi
   VITE_WHATSAPP_PHONE=9779744723372
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. Click **Deploy**. Your store will be live in ~30 seconds!

---

### 3. 🗄️ Supabase Setup (PostgreSQL Cloud Database)

1. Create a free account at [Supabase](https://supabase.com) and click **New Project**.
2. Set your Project Name (e.g. `subsathi-db`) and database password.
3. Navigate to **SQL Editor** in the left sidebar.
4. Open [`supabase/schema.sql`](./supabase/schema.sql) from this project, paste its entire content into the SQL Editor, and click **Run**.
5. Go to **Project Settings ➔ API**:
   - Copy **Project URL** ➔ set as `VITE_SUPABASE_URL` in your `.env` and Vercel.
   - Copy **anon / public key** ➔ set as `VITE_SUPABASE_ANON_KEY` in your `.env` and Vercel.

---

## 🔐 Admin Secret Portal Access

- **Route:** `http://localhost:3000/?view=aresxayu6720` (or `https://your-domain.vercel.app/?view=aresxayu6720`)
- **Default Master Password:** `Aryan7834#$2&*`

*(Password can be updated anytime inside the Admin Portal ➔ Settings tab).*

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
kathmandudigi/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD
├── public/                       # Payment logos & static assets
├── src/
│   ├── components/               # UI components & pages
│   │   ├── admin/                # Full Admin & CRM Suite
│   │   ├── PolicyPages.jsx       # 8 Dedicated policy pages
│   │   └── ...
│   ├── context/CartContext.jsx   # Store state & routing engine
│   ├── lib/supabase.js           # Supabase client & sync helpers
│   └── data/                     # Initial store catalog & config
├── supabase/
│   └── schema.sql                # Complete Supabase database schema
├── .env.example                  # Environment configuration template
├── vercel.json                   # Vercel SPA routing & headers
├── package.json
└── vite.config.js
```
