# NEW SHAHEEN SPORTS
# Comprehensive Master Implementation Plan (Phases 0–7)

**Document ID:** NSS-IMP-PLAN-001  
**Version:** 2.1  
**Project:** New Shaheen Sports Volleyball Academy Web Application  
**Execution Authority:** Antigravity  
**Architecture:** React 18 + Vite + Vercel Serverless Functions + Neon PostgreSQL + Vercel Blob Private Storage  
**Design Reference:** `docs/DESIGN-SYSTEM.md` (Modern Dark Editorial Athleticism)  
**Requirements Reference:** `docs/PRD-DRD.md` (Version 2.1 Baseline)

---

## Plan Overview & Sequential Phasing

```
[Phase 0] Setup & Dependencies ──► [Phase 1] Design Tokens & Layouts ──► [Phase 2] Public Website Pages
                                                                                     │
[Phase 5] Admin Console ◄── [Phase 4] Application Form ◄── [Phase 3] Serverless Backend & Database
        │
        ▼
[Phase 6] QA & Security Audit ──► [Phase 7] Vercel Production Deployment
```

---

## Phase 0: Project Foundation & Environment Architecture

### 0.1 Tasks
1. **Initialize `package.json`:**
   - Configure dependencies:
     - `react`, `react-dom`, `react-router-dom`
     - `lucide-react` (SVG iconography)
     - `@neondatabase/serverless` (Neon PostgreSQL driver)
     - `@vercel/blob` (Private photo & signature storage)
     - `bcryptjs` (Password hashing for single admin authentication)
     - `cookie` (Cookie parsing and serialization)
   - Configure dev dependencies:
     - `vite`, `@vitejs/plugin-react`
2. **Configure Vite (`vite.config.js`):**
   - Setup React plugin.
   - Configure local dev server proxy for `/api` serverless functions or local development harness.
3. **Configure Environment Templates (`.env.example`):**
   - `DATABASE_URL` (Neon PostgreSQL connection string with SSL)
   - `BLOB_READ_WRITE_TOKEN` (Vercel Blob token for file storage)
   - `ADMIN_USERNAME` (Single admin username)
   - `ADMIN_PASSWORD_HASH` (Bcrypt hash of admin password)
   - `SESSION_SECRET` (HMAC signing secret for session cookies)
   - `VITE_APP_URL` (Frontend URL for CORS & metadata)
4. **Database Schema Verification (`database/schema.sql`):**
   - Verify `applications` table schema with all columns, check constraints, default timestamps, and indexes.
   - Verify `application_audit_logs` table for administrative status changes.

### 0.2 Deliverables
- Working `package.json` with lean, targeted dependencies.
- `vite.config.js` and `.env.example`.
- `database/schema.sql`.

---

## Phase 1: Design System Foundation, Tokens & Shared Layouts

### 1.1 Tasks
1. **CSS Variables & Design Tokens (`src/styles/variables.css`):**
   - Implement complete color palette tokens from `docs/DESIGN-SYSTEM.md`.
   - Implement spacing tokens (`--space-1` through `--space-16`).
   - Implement typography tokens (Plus Jakarta Sans, Inter, font sizes, line heights, letter spacing).
   - Implement border radii, transitions, and shadow tokens.
2. **Global Base CSS (`src/styles/globals.css`):**
   - CSS Reset and box-sizing rules.
   - Background, typography, heading hierarchy, link defaults.
   - Custom scrollbar styling (subtle dark scrollbar).
   - `prefers-reduced-motion` global accessibility resets.
3. **Shared UI Components (`src/components/common/`):**
   - `Button.jsx`: Primary, Secondary, Ghost, Danger variants with loading spinners and accessible focus states.
   - `Badge.jsx`: Status indicators (New, Under Review, Contacted, Approved, Rejected) and category tags.
   - `SectionHeading.jsx`: Consistent editorial title with uppercase overline and high-contrast underline.
   - `Card.jsx`: Bento grid card container with 1px border highlight and subtle hover lift.
4. **Public Layout (`src/layouts/PublicLayout.jsx`):**
   - `PublicHeader.jsx`: Sticky backdrop-blurred navigation, academy logo & monogram, desktop links, high-emphasis "Apply Now" button, and accessible mobile drawer with focus trap.
   - `PublicFooter.jsx`: Editorial dark footer with training ground info, social links (Volleyball by Ammar), schedule summary, quick navigation, and legal copyright.
   - Scroll-to-top on route change.
5. **Admin Layout (`src/layouts/AdminLayout.jsx`):**
   - `AdminHeader.jsx`: Secure administrative navigation bar, current status indicator, and quick logout button.
   - Separate container boundaries optimized for data tables.

### 1.2 Deliverables
- Complete design system implementation in CSS.
- Reusable public and admin layout wrappers.
- Tested responsive navigation on viewports from 360px to 1920px.

---

## Phase 2: Public Website Implementation

Build each page following the editorial athletic design system in `docs/DESIGN-SYSTEM.md`:

### 2.1 Pages & Content
1. **Home (`src/pages/Home/HomePage.jsx`):**
   - Hero section with high-contrast headline, athletic imagery, and primary CTA ("Apply Now").
   - Stats row: Boys & Girls Batches, Certified Coaching, Central Karachi Court.
   - Academy Introduction & Philosophy summary.
   - Bento Grid: Training levels preview (Beginner, Intermediate, Advanced).
   - Boys' & Girls' Training highlights.
   - Schedule & Location teaser card.
   - Coaches & Founder spotlight strip.
   - High-voltage enrollment banner leading directly to `/apply`.
2. **About (`src/pages/About/AboutPage.jsx`):**
   - Academy history, journey from local training to structured academy under Volleyball by Ammar.
   - Mission, Vision, and Core Values (Discipline, Teamwork, Tenacity, Sportsmanship).
   - Court culture, safety measures, and training environment.
3. **Training & Programs (`src/pages/Training/TrainingPage.jsx`):**
   - Detailed developmental curriculum:
     - *Beginner Development:* Ball handling, passing mechanics, serving basics, court agility.
     - *Intermediate Skills:* Transition defense, setting precision, spike approach, blocking fundamentals.
     - *Advanced Competitive:* Match systems (5-1, 6-2), tactical serve receive, jump serve development, mental fortitude.
   - Gender participation: dedicated schedule slots and coaching mentorship for both boys and girls.
4. **Coaches (`src/pages/Coaches/CoachesPage.jsx`):**
   - Roster of verified coaching staff.
   - Portrait cards with designations, playing backgrounds, specializations (e.g., Setter Masterclass, Defensive Fundamentals), and coaching philosophy.
   - Placeholder for verified credentials as confirmed by academy management.
5. **Founder (`src/pages/Founder/FounderPage.jsx`):**
   - Dedicated biographical feature on Syed Ammar Ali (National Volleyball Player) and co-founder Syed Akbar Ali.
   - Story of establishing New Shaheen Sports and Volleyball by Ammar social platform.
   - Founder's message to youth athletes and parents.
6. **Schedule & Location (`src/pages/Schedule/SchedulePage.jsx`):**
   - Ground information: Shah Faisal Colony, Block 4, near Water Pump, Karachi.
   - Detailed training timetable: Boys' slots, Girls' slots, age groups.
   - Google Maps iframe directions and landmark guides.
   - What to bring on day one (athletic wear, court shoes, hydration).
7. **Contact (`src/pages/Contact/ContactPage.jsx`):**
   - Ground address and visiting hours.
   - Direct telephone link (+92 312 0206021).
   - WhatsApp direct click-to-chat button.
   - Official Facebook link (Volleyball by Ammar).
   - Clear notice directing all membership inquiries to the unified `/apply` form (no redundant public contact form).
8. **Privacy Policy (`src/pages/Privacy/PrivacyPage.jsx`):**
   - Plain-English, comprehensive explanation of data collected during membership application (photos, identity numbers, contact information).
   - Strict guardian consent disclosure for minor applicants.
   - Data retention, zero commercial resale guarantee, and deletion request mechanism.

### 2.2 Deliverables
- 8 fully functional public pages matching design system specifications.
- Verified responsive layouts across mobile, tablet, and desktop.

---

## Phase 3: Serverless Backend & Database Infrastructure

### 3.1 Tasks
1. **Neon PostgreSQL Database Helper (`api/_utils/db.js`):**
   - Initialize `@neondatabase/serverless` pool/client with connection pooling.
   - Parameterized query helper to eliminate SQL injection risks.
2. **Vercel Blob Storage Helper (`api/_utils/blob.js`):**
   - File upload handler to private Vercel Blob bucket.
   - Secure URL resolution and short-lived streaming helper.
3. **Authentication & Session Utility (`api/_utils/auth.js`):**
   - Password hash verification against `ADMIN_PASSWORD_HASH` using `bcryptjs`.
   - Cookie signing and token verification using Node.js native `crypto` HMAC-SHA256.
   - Session validation middleware for protecting `/api/applications/*` and `/api/files/*`.
4. **Serverless API Endpoints:**
   - `api/auth/login.js`: Authenticate admin, issue signed HttpOnly cookie.
   - `api/auth/logout.js`: Clear cookie.
   - `api/auth/session.js`: Validate active session and return admin profile.
   - `api/applications/submit.js`: Validate public submission, save photo & signature to private Blob, insert into Neon DB, return reference (`NSS-YYYY-XXXXXX`).
   - `api/applications/list.js`: Query applications with search (name, phone, ref), status filter, pagination, and sorting.
   - `api/applications/details.js`: Query full application record by UUID.
   - `api/applications/update.js`: Update application status and internal admin notes, logging audit entries.
   - `api/files/get.js`: Verify admin session and securely stream or redirect to private Blob asset.

### 3.2 Deliverables
- Robust serverless backend operating entirely in `/api`.
- Verified secure session cookie handling.
- Private blob file storage and authenticated retrieval.

---

## Phase 4: Centralized Membership Application (`/apply`)

### 4.1 Tasks
1. **Form State & Multi-Section Architecture (`src/pages/Apply/`):**
   - Section A: Personal Information (Full name, DOB, height with cm/feet helper, CNIC/B-Form, phone, address).
   - Section B: Volleyball Profile (Position selector, Experience radio group).
   - Section C: Emergency Contact & Minor Authorization (Conditional guardian fields when DOB indicates age < 18).
   - Section D: Photo Upload & Digital Signature (File validation, preview, canvas signature pad, declaration).
2. **Passport Photo Upload Component (`src/components/forms/PhotoUpload.jsx`):**
   - Validates MIME type (`image/jpeg`, `image/png`, `image/webp`) and file size (≤ 3MB).
   - Instant circular/rectangular preview with "Replace Photo" action.
3. **Canvas Signature Pad Component (`src/components/forms/SignaturePad.jsx`):**
   - HTML5 Canvas with smooth Bézier curve interpolation for mouse, touch, and stylus.
   - Responsive scaling with canvas DPI adjustment to avoid blur on retina screens.
   - Clear / Redraw action.
   - Normalized PNG export.
4. **Validation & Error Handling (`src/utils/validation.js`):**
   - Strict validation for Pakistani phone numbers (`+92 3XX XXXXXXX`).
   - CNIC / B-Form regex validation (`XXXXX-XXXXXXX-X`).
   - Height boundaries (100–230 cm).
   - Inline field error indicators and scroll-to-error on submission.
5. **Submission Handling & Confirmation Screen:**
   - Loading indicator with disabled submit button to prevent double-submission.
   - Success state rendering confirmation card with unique reference (`NSS-YYYY-XXXXXX`), submission date, and next steps for court induction.

### 4.2 Deliverables
- Fully working, secure membership application form.
- Smooth mobile signature and photo capture.
- Automated generation of reference codes and persistence into Neon DB.

---

## Phase 5: Administrative Console Implementation

### 5.1 Tasks
1. **Admin Login Page (`src/pages/Admin/AdminLoginPage.jsx`):**
   - Clean, minimalist dark authentication card.
   - Username and password inputs with loading states.
   - Clear error notifications on failed authentication.
   - Automatic redirect to `/admin` upon successful login.
2. **Route Protection Guard (`src/components/admin/ProtectedRoute.jsx`):**
   - Checks server-side session validity via `/api/auth/session`.
   - Redirects unauthenticated visitors to `/admin/login`.
3. **Dashboard Overview (`src/pages/Admin/AdminDashboardPage.jsx`):**
   - 6 KPI Stat Cards: Total, New, Under Review, Contacted, Approved, Rejected.
   - Recent applications list for quick action.
4. **Applications Listing & Table (`src/pages/Admin/ApplicationsListPage.jsx`):**
   - Instant search bar (filter by Name, Reference, Phone, NIC).
   - Status tabs (All, New, Under Review, Contacted, Approved, Rejected).
   - Dense data table: Reference, Photo thumbnail, Name, Contact, Position, Experience, Submitted Date, Status Badge, Action Button.
   - Pagination controls.
5. **Application Detail Drawer / Modal (`src/components/admin/ApplicationDetailModal.jsx`):**
   - Comprehensive athlete sheet: Personal data, physical height, address, emergency contact, guardian authorization (for minors).
   - Authenticated private previews of passport photo and canvas signature via `/api/files/get`.
   - Interactive status dropdown with immediate database sync.
   - Private internal admin notes textarea with autosave / save button.
   - Direct communication triggers: "Chat on WhatsApp" (pre-populates message with reference) and "Call Applicant".
6. **Admin Logout:**
   - Calls `/api/auth/logout`, clears session state, and redirects to `/admin/login`.

### 5.2 Deliverables
- Complete, secure administrative management suite.
- Instant search, filtering, and status updates.
- Private document inspection.

---

## Phase 6: Quality Assurance, Security & Browser Testing

### 6.1 Testing Checklist
1. **Public Website:**
   - Verify all 8 routes render without console errors.
   - Test navigation drawer and links on 360px, 390px, 768px, 1024px, 1440px viewports.
   - Test all "Apply Now" CTAs to ensure they route to `/apply`.
2. **Membership Application:**
   - Test valid submission with photo and signature.
   - Test field validation: missing fields, invalid phone, future DOB, oversized photo (> 3MB), empty signature.
   - Test minor applicant logic: verifies guardian block appears when age < 18.
   - Test duplicate submission prevention.
3. **Admin Console & Security:**
   - Test unauthorized route access: ensure direct access to `/admin` redirects to `/admin/login`.
   - Test session expiration and logout.
   - Verify applicant photographs and signatures cannot be loaded without an active admin session.
   - Test status transitions and internal notes persistence.
4. **Accessibility (WCAG 2.2 AA):**
   - Keyboard navigation audit (Tab order, Enter/Space activation, Esc closes modals).
   - Contrast check on all text tokens (minimum 4.5:1).
   - Verify `prefers-reduced-motion` disables animations.

### 6.2 Deliverables
- Comprehensive QA audit sign-off.
- Zero broken links, zero console errors, zero security leaks.

---

## Phase 7: Production Deployment & Handoff

### 7.1 Tasks
1. **Production Build Verification:**
   - Execute `npm run build` to verify clean Vite build without warnings or bundle bloat.
2. **Vercel Project Setup (`vercel.json`):**
   - Configure SPA rewrite rules for React Router:
     ```json
     {
       "rewrites": [
         { "source": "/api/(.*)", "destination": "/api/$1" },
         { "source": "/(.*)", "destination": "/index.html" }
       ]
     }
     ```
3. **Production Environment Variables:**
   - Verify documentation in `.env.example` matches production Vercel dashboard requirements.
4. **README & Deployment Documentation (`README.md`):**
   - Document project overview, local development setup, database migrations, environment variables, and Vercel deployment steps.

---

## Execution Readiness

This implementation plan is structured for linear, fail-safe execution. Antigravity will proceed phase-by-phase, validating every milestone against the PRD (`docs/PRD-DRD.md`) and Design System (`docs/DESIGN-SYSTEM.md`) before marking any phase complete.
