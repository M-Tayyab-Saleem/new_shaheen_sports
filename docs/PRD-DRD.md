# NEW SHAHEEN SPORTS
# Product Requirements & Design Requirements Document (PRD + DRD)

**Document ID:** NSS-WEB-PRD-DRD-001  
**Version:** 2.1 (Architectural Revision & Vercel/Neon Baseline)  
**Status:** Approved Architecture Baseline — Ready for Implementation  
**Product:** New Shaheen Sports Volleyball Academy  
**Associated Social Identity:** Volleyball by Ammar  
**Platform:** Responsive Web Application (Single Unified Project)  
**Primary Market:** Karachi, Pakistan  
**Frontend:** React JS + Vite + React Router  
**Styling:** Modern CSS / CSS Modules (Design System Tokens)  
**Hosting & Serverless:** Vercel Hosting + Vercel Serverless Functions (`/api/*`)  
**Database:** Neon PostgreSQL (`@neondatabase/serverless`)  
**Storage:** Vercel Blob Private Storage (`@vercel/blob`)  
**Authentication:** Environment-variable-backed Single Administrator with Node.js Crypto Signed HttpOnly Cookies  
**Document Purpose:** Authoritative Single Source of Truth for Product, Design, Architecture, Development, Testing, and Deployment.

---

# PART A — PRODUCT REQUIREMENTS DOCUMENT

# 1. Product Overview

## 1.1 Background

New Shaheen Sports is a premier volleyball training academy operating in Karachi, Pakistan, closely associated with the prominent social media volleyball identity **Volleyball by Ammar**.

The academy delivers structured volleyball training for both boys and girls across beginner, intermediate, and advanced developmental stages.

The objective of this web platform is to establish a distinctive, modern, and professional digital home for the academy: introducing its leadership, coaching staff, training ground, and developmental curriculum, while providing a frictionless, secure digital membership application workflow for prospective student-athletes and parents.

## 1.2 Problem Statement

Prospective players and parents currently rely almost entirely on fragmented social media posts, direct messaging, and informal communication channels to discover academy details. This leads to key challenges:

1. **Fragmented Information:** Training schedules, coaching credentials, ground location, and age-group eligibility are scattered across Facebook posts and third-party fitness directory listings.
2. **Unclear Training Pathways:** Visitors cannot easily visualize training methodology, skill progression levels (beginner to competitive), or dedicated boys' vs. girls' training sessions.
3. **Decentralized Membership Registration:** Applications are handled manually or through disconnected forms, creating administrative delay and risk of lost inquiries.
4. **Lack of Centralized Review Interface:** Academy management lacks a single, secure administrative portal to review athlete applications, inspect verified photos and signatures, record interview notes, and manage athlete status from submission to court induction.

## 1.3 Product Vision

A high-performance, minimalist, editorial sports website that projects the athletic excellence, discipline, and community of New Shaheen Sports, backed by a lightweight, ultra-secure administrative console.

## 1.4 Primary Objectives

1. **Digital Brand Identity:** Establish a top-tier digital presence that positions New Shaheen Sports as Karachi's serious volleyball training institution.
2. **Curriculum & Pathways:** Transparently present the training philosophy, court discipline, and progression tiers for boys and girls.
3. **Verified People:** Showcase the founders (Syed Ammar Ali, Syed Akbar Ali) and qualified coaching staff with high-contrast, editorial photography.
4. **Operational Clarity:** Publish confirmed ground locations (Shah Faisal Colony, Karachi), Google Maps directions, and age/timing schedules.
5. **Digitized Single Application Funnel:** Provide a single centralized application route (`/apply`) with photo upload, digital signature capture, and conditional guardian authorization for minors.
6. **Unified Secure Administration:** Provide an administrative dashboard under the same domain (`/admin`) for viewing, searching, filtering, and updating applicant records with private file access.
7. **Simplicity and Maintainability:** Zero overengineering. No heavy microservices, external CMSs, or redundant third-party dependencies.

## 1.5 Success Criteria

- Visitors grasp the academy's offerings, values, and enrollment process within 5 seconds of arriving on the homepage.
- All public CTAs seamlessly guide prospective athletes to the unified `/apply` form.
- The membership application works smoothly on any mobile screen (including smooth touch signature capture and instant photo preview).
- Applications submit directly to the Vercel serverless backend, store private files securely in Vercel Blob, and generate a human-readable reference number (`NSS-YYYY-XXXXXX`).
- The administrator can review applications, inspect private documents via authenticated short-lived streaming/signed URLs, and update statuses with one click.
- Applicant personal data and media are completely isolated from public access.

---

# 2. Product Scope

## 2.1 Included in Version 2.1

### Public Experience
1. **Home (`/`):** Dynamic athletic hero, philosophy, developmental levels, gender participation highlights, schedule preview, coaching staff teaser, founder spotlight, and prominent enrollment CTA.
2. **About (`/about`):** Detailed academy history, mission, core values (Discipline, Teamwork, Tenacity, Sportsmanship), and training culture.
3. **Training & Programs (`/training`):** In-depth curriculum breakdown for Beginner Development, Intermediate Skills, and Advanced Competitive Preparation.
4. **Coaches (`/coaches`):** Verified instructor profiles, designations, playing background, and court specializations.
5. **Founder (`/founder`):** Comprehensive biographical feature on Syed Ammar Ali (National Volleyball Player) and co-founder Syed Akbar Ali.
6. **Schedule & Location (`/schedule`):** Ground location details (Shah Faisal Colony, Block 4, near Water Pump, Karachi), boys' & girls' training slots, age brackets, and Google Maps integration.
7. **Membership Application (`/apply`):** Single, centralized application form featuring personal info, volleyball experience, emergency contacts, photo upload, canvas signature pad, and minor guardian consent.
8. **Contact (`/contact`):** Ground location, direct phone, WhatsApp shortcut, official Facebook link, and visit guidance (no redundant public message form).
9. **Privacy Policy (`/privacy`):** Transparent disclosure on applicant data protection, retention, parental consent, and data deletion requests.

### Administrative Console
1. **Admin Authentication (`/admin/login`):** Single administrative credentials verified against server-side environment variables, issuing a cryptographically signed HttpOnly, Secure, SameSite session cookie.
2. **Admin Dashboard Overview (`/admin`):** Live KPI cards for Total Applications, New, Under Review, Contacted, Approved, and Rejected.
3. **Applications Management (`/admin/applications`):** Searchable, filterable, and paginated table with sorting, applicant badges, and rapid action triggers.
4. **Application Detail (`/admin/applications/:id`):** Full athlete file containing personal info, emergency contacts, authenticated private previews of the passport photo and canvas signature, administrative notes editor, and status updater.
5. **Direct Applicant Contact:** Direct WhatsApp and phone call links pre-formatted with the applicant's reference number.
6. **Secure Logout:** Immediate session invalidation.

## 2.2 Explicitly Excluded Features

The following features must not be implemented:
- Student or parent portal/login accounts.
- Online fee payments or subscription billing.
- Live scoring, tournament fixtures, or court booking engines.
- AI chatbots, AI automated matching, or AI-generated coaching advice.
- Complex third-party CMSs (Strapi, Contentful, Sanity).
- Microservices, message queues (Kafka/RabbitMQ), or Docker production overhead.
- Redundant public contact or query forms.

---

# 3. Target Users & User Stories

## 3.1 Prospective Player
> *As a young volleyball enthusiast in Karachi, I want to review training times, find where the academy trains, and submit my application online, so that I can join the squad.*

## 3.2 Parent or Guardian
> *As a parent of a student-athlete, I want to verify the background and safety of the coaches, ensure separate/supervised training arrangements for girls and boys, and understand minor consent requirements before enrolling my child.*

## 3.3 Academy Administrator (Management)
> *As the academy director, I want to log in securely, view all incoming player applications, review player height/position/experience, verify their photo and signature, add private notes from my evaluation, and contact them directly on WhatsApp to arrange a court trial.*

---

# 4. Website Navigation & Route Structure

```
/                       ── Public Homepage
/about                  ── Academy Story & Philosophy
/training               ── Developmental Curriculum & Tiers
/coaches                ── Coaching Roster & Background
/founder                ── Leadership & Academy Story
/schedule               ── Ground Location & Timings
/apply                  ── Centralized Membership Application
/contact                ── Direct Contact, Location & Social
/privacy                ── Data Protection & Guardian Consent
/admin/login            ── Admin Authentication
/admin                  ── Admin Dashboard Overview (Protected)
/admin/applications     ── Applications List & Filter (Protected)
/admin/applications/:id ── Full Application File & Notes (Protected)
*                       ── 404 Not Found Page
```

---

# PART B — TECHNICAL SPECIFICATION & ARCHITECTURE (VERSION 2.1)

# 5. Architecture Overview

## 5.1 Architecture Decision

The system uses a consolidated, zero-maintenance modern stack designed for fast static edge delivery and serverless operations:

1. **Frontend:** React 18 + Vite running as a Single Page Application (SPA) deployed to Vercel CDN.
2. **Backend:** Vercel Serverless Functions in `/api` handling authentication, application ingestion, file proxying, and database interaction.
3. **Database:** Neon Serverless PostgreSQL, connected via `@neondatabase/serverless` using raw SQL queries for peak efficiency and zero ORM overhead.
4. **Storage:** Vercel Blob Private Storage (`@vercel/blob`) for applicant photos and digital signatures.
5. **Authentication:** Serverless session management using Node.js native `crypto` HMAC-SHA256 signatures, `bcryptjs` password verification, and HttpOnly cookies.

## 5.2 Serverless API Endpoints

| Endpoint | Method | Access | Purpose |
|---|---|---|---|
| `/api/auth/login` | POST | Public | Authenticates admin username/password, sets HttpOnly session cookie |
| `/api/auth/logout` | POST | Admin | Clears session cookie |
| `/api/auth/session` | GET | Admin | Verifies session validity and returns admin status |
| `/api/applications/submit` | POST | Public | Validates form fields, uploads files to private Vercel Blob, inserts record into Neon DB, returns reference |
| `/api/applications/list` | GET | Admin | Returns paginated list of applications with status filter, search query, and sorting |
| `/api/applications/details?id=...` | GET | Admin | Returns full record for a specific application |
| `/api/applications/update` | POST | Admin | Updates status (`New`, `Under Review`, `Contacted`, `Approved`, `Rejected`) and internal admin notes |
| `/api/files/get?path=...` | GET | Admin | Streams or redirects to private blob file after verifying admin session |

## 5.3 Database Schema (`database/schema.sql`)

```sql
-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_reference VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  height_cm NUMERIC(5,1) NOT NULL,
  nic_number VARCHAR(64) NOT NULL,
  contact_number VARCHAR(32) NOT NULL,
  address TEXT NOT NULL,
  playing_position VARCHAR(64) NOT NULL,
  experience_level VARCHAR(32) NOT NULL CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  emergency_contact_number VARCHAR(32) NOT NULL,
  passport_photo_url TEXT NOT NULL,
  signature_url TEXT NOT NULL,
  guardian_name VARCHAR(255),
  guardian_relationship VARCHAR(64),
  guardian_contact VARCHAR(32),
  guardian_consent BOOLEAN DEFAULT FALSE,
  status VARCHAR(32) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Contacted', 'Approved', 'Rejected')),
  admin_note TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_applications_ref ON applications(application_reference);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted ON applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_search ON applications(full_name, contact_number, nic_number);

-- Audit log for status transitions & notes
CREATE TABLE IF NOT EXISTS application_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  action VARCHAR(64) NOT NULL,
  previous_status VARCHAR(32),
  new_status VARCHAR(32),
  note TEXT,
  actor VARCHAR(64) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 5.4 Unique Reference Generator

Format: `NSS-YYYY-XXXXXX` (e.g. `NSS-2026-000101`).
- `YYYY` represents the current calendar year.
- `XXXXXX` is a zero-padded sequential or cryptographically verified monotonic identifier derived from database sequences or verified count.

---

# PART C — APPLICATION FORM SPECIFICATION

# 6. Membership Application Workflow

## 6.1 Form Structure

The form on `/apply` is divided into four sequential, well-spaced visual sections:

### Section A: Personal Information
- **Passport Photo Upload:** Allowed types: `image/jpeg`, `image/png`, `image/webp`. Max size: 3MB. Client preview + replace capability.
- **Full Name:** Text, 3–100 characters.
- **Date of Birth:** Date picker, cannot be in the future. If age < 18, triggers minor authorization fields.
- **Height (cm):** Number input with quick conversion helper (e.g., 5'10" = 178 cm). Must be between 100 cm and 230 cm.
- **NIC / B-Form Number:** Text, formatted for Pakistani CNIC / B-Form (e.g. `42201-XXXXXXX-X`).
- **Contact Number:** Phone number with Pakistani format validation (`+92 3XX XXXXXXX`).
- **Address:** Complete residential address.

### Section B: Volleyball Profile
- **Playing Position:** Select from:
  - *Setter*
  - *Outside Hitter*
  - *Opposite Hitter*
  - *Middle Blocker*
  - *Libero*
  - *Defensive Specialist*
  - *Not Yet Decided*
- **Experience Level:** Radio selector:
  - *Beginner* (0–1 years, foundational interest)
  - *Intermediate* (1–3 years, club/school experience)
  - *Advanced* (3+ years, competitive tournament player)

### Section C: Emergency & Minor Authorization
- **Emergency Contact Number:** Telephone input, required.
- **Conditional Guardian Block (Required if Applicant < 18):**
  - Guardian Full Name
  - Relationship (Parent / Legal Guardian)
  - Guardian Contact Number
  - Guardian Acknowledgment & Medical Consent Checkbox

### Section D: Digital Signature & Declaration
- **Canvas Signature Pad:** Responsive canvas with mouse, touch, and stylus support. Instant "Clear" action. Exports normalized high-contrast PNG (max 1MB).
- **Declaration Statement:** Explicit agreement to academy rules, training safety, and factual accuracy.
- **Auto-Populated Date:** Server-verified submission timestamp.

## 6.2 Submission Lifecycle & Data Protection

1. **Client Pre-Flight:** Validates fields, previews photo, ensures signature canvas is non-empty.
2. **Payload Submission:** Posts `multipart/form-data` or base64 JSON payload to `/api/applications/submit`.
3. **Server Validation:** Edge function validates types, sizes, regex, and date boundaries.
4. **Vercel Blob Storage:** Photos and signatures stored in private Blob storage under `applications/{uuid}/photo` and `applications/{uuid}/signature`.
5. **Database Persistence:** Transactionally written into Neon PostgreSQL.
6. **Instant Response:** Returns `{ success: true, reference: "NSS-2026-000101", submittedAt: "..." }`.
7. **Success Screen:** Displays confirmation card with the reference number, clear next steps, and direct WhatsApp contact for inquiries.

---

# PART D — ADMINISTRATIVE CONSOLE SPECIFICATION

# 7. Administrator Capabilities

## 7.1 Single Admin Security
- The system recognizes exactly one administrator configured via environment variables:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD_HASH`
  - `SESSION_SECRET`
- Login rate-limiting: max 5 failed attempts per 15 minutes per IP.
- Session stored in signed, HttpOnly, SameSite=Strict cookie with an 8-hour expiry.

## 7.2 Dashboard & Records Management
- **Metrics Bar:** 6 key counters: Total Applications, New, Under Review, Contacted, Approved, Rejected.
- **Filter Bar:** Real-time search by Reference, Name, or Phone, plus status dropdown tabs.
- **Applications Table:** Clean, data-dense table with applicant avatar preview, position badge, experience pill, status selector, and submission timestamp.
- **Detailed Drawer / Modal / View:**
  - Full personal and volleyball profile.
  - Authenticated private photo and signature viewer.
  - Direct WhatsApp launcher (`https://wa.me/923XXXXXXXXX?text=Hello%20[Name],%20regarding%20your%20application%20[Ref]%20for%20New%20Shaheen%20Sports...`).
  - Interactive status dropdown with immediate save.
  - Internal administrative evaluation notes editor.

---

# PART E — DIRECTORY STRUCTURE (VERSION 2.1)

```text
new-shaheen-sports/
│
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   ├── logout.js
│   │   └── session.js
│   ├── applications/
│   │   ├── submit.js
│   │   ├── list.js
│   │   ├── details.js
│   │   └── update.js
│   └── files/
│       └── get.js
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── founders/
│       ├── instructors/
│       └── academy/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── admin/
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Training/
│   │   ├── Coaches/
│   │   ├── Founder/
│   │   ├── Schedule/
│   │   ├── Apply/
│   │   ├── Contact/
│   │   ├── Privacy/
│   │   └── Admin/
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── styles/
│   │   ├── variables.css
│   │   ├── globals.css
│   │   └── admin.css
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validation.js
│   ├── App.jsx
│   └── main.jsx
│
├── database/
│   └── schema.sql
│
├── docs/
│   ├── PRD-DRD.md
│   └── DESIGN-SYSTEM.md
│
├── .env.example
├── package.json
└── vite.config.js
```

---

# PART F — QUALITY ASSURANCE & VERIFICATION

1. **Accessibility (WCAG 2.2 AA):**
   - High contrast ratio: ≥ 4.5:1 for body text, ≥ 3.0:1 for large display titles.
   - Visible keyboard focus rings on every interactive component.
   - Semantic HTML elements (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`).
   - Screen-reader friendly error announcements on form submission.
2. **Performance Metrics:**
   - LCP ≤ 2.0s on 4G networks.
   - CLS ≤ 0.05.
   - Zero layout shifts caused by dynamic image loads.
3. **Zero Security Vulnerabilities:**
   - No sensitive applicant files exposed through public CDN links.
   - Strict server-side verification of all incoming inputs.
   - Private Blob URLs streamed or signed with short expiration.
