# ROADMAP.md — Portfolio & Backoffice Development Plan

> Master roadmap pembangunan Website Portfolio + Backoffice Admin  
> Architecture: Modular Monolith (DDD)  
> Stack: Next.js 15 + Prisma + Turso + Tailwind + Shadcn + Zod

---

# 🎯 PROJECT VISION

Membangun sistem portfolio profesional dengan:

- Landing page publik (SEO optimized)
- Dashboard admin untuk CRUD
- High performance (SSR / ISR)
- Clean modular architecture
- Production-ready deployment di Vercel

---

# 🏗 PHASE 1 — FOUNDATION

## Objective
Menyiapkan environment dan fondasi arsitektur.

## Tasks

### 1. Project Setup
- Init Next.js 15 (App Router)
- Enable TypeScript strict mode
- Setup ESLint & Prettier
- Configure absolute import path

### 2. Styling & UI
- Install Tailwind CSS
- Setup Shadcn UI
- Install Lucide Icons
- Setup base layout system

### 3. Database Setup
- Install Prisma
- Install @prisma/adapter-libsql
- Install @libsql/client
- Setup Turso connection
- Configure previewFeatures = ["driverAdapters"]
- Setup prisma client singleton

### 4. Folder Structure (Modular Monolith)
src/
├── app/
├── components/
├── lib/
├── modules/
│ ├── portfolio/
│ ├── resume/
│ └── admin/
└── hooks/


## Deliverable
- App running locally
- Prisma connected to Turso
- Prisma client generated successfully
- Clean folder architecture ready

---

# 🗄 PHASE 2 — DATABASE DESIGN

## Objective
Mendesain schema database production-ready.

## Core Models

### Profile
- id (cuid/uuid)
- name
- title
- bio
- avatarUrl
- githubUrl
- linkedinUrl
- createdAt
- updatedAt

### Project
- id
- title
- description
- techStack (String[])
- githubUrl
- liveUrl
- featured (Boolean)
- createdAt
- updatedAt

### Experience
- id
- company
- position
- type (String — validated via Zod)
- startDate
- endDate
- description
- createdAt
- updatedAt

## Database Rules
- No native enum (SQLite limitation)
- Gunakan String + Zod validation
- Gunakan cuid() atau uuid()
- Selalu schema-first

## Deliverable
- Migration berhasil
- Database Turso terupdate
- Tidak ada runtime error

---

# 🔐 PHASE 3 — BACKOFFICE (ADMIN)

## Objective
Membangun sistem admin lengkap dengan autentikasi & CRUD.

## Authentication
- Setup NextAuth
- Middleware route protection
- Protect /admin/*
- Session validation

## Dashboard Layout
- Sidebar navigation
- Top header
- Logout button
- Protected layout wrapper

## CRUD Implementation

Gunakan:
- React Query
- Zod validation
- Reusable form component
- Server actions / API routes

CRUD untuk:
- Profile
- Project
- Experience

## Validation Strategy
- Zod schema per domain
- Shared validation file di setiap module
- Type inference dari Zod

## Deliverable
- Admin login working
- Semua CRUD functional
- Validation error muncul dengan benar
- No client-side crash

---

# 🌍 PHASE 4 — PUBLIC PORTFOLIO

## Objective
Membangun landing page yang cepat, SEO-friendly, dan clean.

## Home Page Structure
- Hero section
- About section
- Featured projects
- Experience timeline
- Contact section

## Rendering Strategy
- SSR untuk homepage
- ISR untuk projects
- Static optimization jika memungkinkan

## SEO Optimization
- Metadata API Next.js
- Open Graph tags
- Structured headings
- Sitemap (optional)

## Performance Optimization
- Image optimization
- Lazy loading
- Avoid unnecessary client components
- Minimize bundle size

## Accessibility
- Semantic HTML
- Proper alt text
- Keyboard navigation
- Accessible forms

## Deliverable
- Lighthouse score > 90
- Fully responsive
- SEO validated
- No hydration error

---

# 🚀 PHASE 5 — DEPLOYMENT

## Objective
Deploy production-ready system ke Vercel.

## Environment Variables
DATABASE_URL=libsql://portfolio-diasgsputra.aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzE4MDEyNjUsImlkIjoiYmJmZGY1ZDQtMDA2Yi00YTM2LWEzYWYtN2QzODY3OGY4NGE4IiwicmlkIjoiZTczYTFmOTgtOTEzMC00YmJmLWFiZjktODU4M2U4YjliY2I0In0.twy0A67vbrQpcO0jWyJRNSGe5WmD_oLmXZu5Uypv9rkYdNngFmE8m1eh9np3-5vSK_14B8XBeoerlQ-6qQr9BA



## Build Command
npx prisma generate && npx prisma migrate deploy && next build


## Deployment Steps
1. Push project ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy production build
5. Monitor logs

## Post-Deployment Checklist
- Test login admin
- Test CRUD create/update/delete
- Test public pages
- Verify DB persistence
- Verify session persistence
- Check production logs
- Confirm no runtime error

---

# 📈 FUTURE IMPROVEMENTS

- Dark mode toggle
- Blog module
- CMS-style rich text editor
- Image upload with external storage
- Analytics integration
- Rate limiting admin routes
- Audit logging system
- Role-based access control
- Caching layer optimization

---

# 🧠 CORE ENGINEERING PRINCIPLES

- Schema First > UI First
- Modular > Chaos
- Validation > Assumption
- Clean Code Always
- Separation of Concerns
- Production mindset from day one
- Maintainability > Shortcut

---

END OF ROADMAP