# VCET — Vidyavardhini's College of Engineering and Technology

**Live reference (old website):** https://vcet.edu.in

This repository is the full redevelopment of the official VCET website.
The old website is the single source of truth for all content — text, numbers, names, dates, department information, faculty details, and any other factual data.
You are free to redesign layouts, improve UI/UX, and add new features, but the information displayed must be accurate and consistent with the old website at all times.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Repository Structure](#repository-structure)
3. [Getting Started](#getting-started)
4. [API & Dynamic Data](#api--dynamic-data)
5. [Admin Panel](#admin-panel)
6. [Content Rules](#content-rules)
7. [Contributing — Git Workflow](#contributing--git-workflow)
8. [GitHub Rules and Engineering Standards](#github-rules-and-engineering-standards)
9. [Contributors](#contributors)

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 19, TypeScript, Vite 6            |
| Styling   | Tailwind CSS                            |
| Routing   | React Router v7                         |
| Animation | Framer Motion                           |
| Backend   | Laravel 12, PHP 8.5 (REST JSON API)     |
| Auth      | Laravel Sanctum (Bearer tokens)         |
| Database  | SQLite (dev) / MySQL (production)       |
| Hosting   | Bluehost (frontend) + separate API host |

---

## Repository Structure

```
vcet.edu.in/
|
|-- App.tsx                    # Root router — all lazy-loaded page routes
|-- index.tsx                  # React entry point
|-- index.html                 # HTML shell
|-- types.ts                   # Shared TypeScript types
|-- vite.config.ts             # Vite build config
|-- tsconfig.json
|-- package.json
|
|-- components/                # Reusable UI components (homepage sections + shared layout)
|   |-- TopBanner.tsx          # Top bar with logos and contact
|   |                          # (includes nav dropdown: Departments > MMS)
|   |-- Header.tsx             # Navigation menu
|   |-- Hero.tsx               # Hero / banner section
|   |-- About.tsx              # About stats block
|   |-- Departments.tsx        # Departments overview
|   |-- Placements.tsx         # Placements highlights
|   |-- Recruiters.tsx         # Recruiter logos
|   |-- Achievements.tsx       # Achievements section
|   |-- ExploreUs.tsx          # Explore VCET section
|   |-- Gallery.tsx            # Photo gallery
|   |-- Testimonials.tsx       # Student testimonials
|   |-- Facilities.tsx         # Facilities showcase
|   |-- Naac.tsx               # NAAC accreditation block
|   |-- Footer.tsx             # Site footer
|   |-- PageLayout.tsx         # Shared wrapper for all inner pages
|   |-- PageBanner.tsx         # Page-level hero banner
|   |-- SectionHeader.tsx      # Reusable section heading
|   |-- Button.tsx             # Shared button component
|   |-- ScrollToTop.tsx        # Scroll restoration on route change
|   |-- SplashScreen.tsx       # Initial splash/loader
|   |-- DepartmentPage.tsx     # Generic department page template
|   |-- Admissions.tsx         # Admissions info component
|   |
|   |-- mms/                   # ★ MMS-specific shared components
|       |-- MMSLayout.tsx      # Wrapper for all MMS pages (MMS header + footer)
|       |-- MMSHeader.tsx      # MMS internal nav bar with own menu & dropdown
|       |-- MMSHero.tsx        # MMS hero image carousel
|       |-- MMSEnquirePopup.tsx # Global "Enquire Now" floating button + modal
|
|-- pages/                     # All route-level page components (lazy loaded)
|   |-- about/                 # Institute information
|   |   |-- AboutVCET.tsx
|   |   |-- PresidentsDesk.tsx
|   |   |-- PrincipalsDesk.tsx
|   |   |-- GoverningCouncil.tsx
|   |   |-- OrganizationalStructure.tsx
|   |   |-- Administration.tsx
|   |   |-- StrategicPlan.tsx
|   |   |-- CodeOfConduct.tsx
|   |
|   |-- admissions/            # Admissions information
|   |   |-- CoursesIntake.tsx
|   |   |-- FeesStructure.tsx
|   |   |-- Scholarships.tsx
|   |   |-- Brochure.tsx
|   |   |-- DocumentsRequired.tsx
|   |   |-- CutOff.tsx
|   |
|   |-- departments/           # Department pages (one per dept)
|   |   |-- DeptComputerEngg.tsx
|   |   |-- DeptCSDS.tsx
|   |   |-- DeptIT.tsx
|   |   |-- DeptAIDS.tsx
|   |   |-- DeptMech.tsx
|   |   |-- DeptENTC.tsx
|   |   |-- DeptCivil.tsx
|   |   |-- DeptFE.tsx
|   |
|   |-- academics/             # Academic programs and resources
|   |   |-- DeanAcademics.tsx
|   |   |-- AcademicCalendar.tsx
|   |   |-- TeachingLearning.tsx
|   |   |-- SwayamNPTEL.tsx
|   |   |-- HonoursMinor.tsx
|   |   |-- ExamCell.tsx
|   |   |-- Downloads.tsx
|   |
|   |-- research/              # Research and publications
|   |   |-- ResearchIntro.tsx
|   |   |-- FundedResearch.tsx
|   |   |-- Publications.tsx
|   |   |-- ConsultancyProjects.tsx
|   |   |-- ResearchFacility.tsx
|   |   |-- ResearchConventions.tsx
|   |   |-- ResearchPolicy.tsx
|   |   |-- NIRF.tsx
|   |
|   |-- facilities/            # Campus facilities
|   |   |-- CentralComputing.tsx
|   |   |-- Library.tsx
|   |   |-- CounselingCell.tsx
|   |   |-- LadiesCommonRoom.tsx
|   |   |-- SportsGymkhana.tsx
|   |   |-- HealthFacilities.tsx
|   |   |-- DifferentlyAbled.tsx
|   |
|   |-- student-life/          # Student activities and organizations
|   |   |-- CareerAtVCET.tsx
|   |   |-- CulturalCommittee.tsx
|   |   |-- SportsCommittee.tsx
|   |   |-- Literati.tsx
|   |   |-- NSS.tsx
|   |   |-- EBSB.tsx
|   |   |-- StudentsClub.tsx
|   |   |-- Hackathon.tsx
|   |   |-- NSDC.tsx
|   |   |-- Training.tsx
|   |   |-- ECell.tsx
|   |   |-- IIIC.tsx
|   |   |-- Parents.tsx
|   |
|   |-- clubs/                 # Technical and professional clubs
|   |   |-- IEEE.tsx
|   |   |-- CSI.tsx
|   |   |-- IETE.tsx
|   |   |-- ISHRAE.tsx
|   |   |-- VMEA.tsx
|   |   |-- IGBC.tsx
|   |   |-- IIC.tsx
|   |
|   |-- committees/            # Statutory and welfare committees
|   |   |-- CollegeDevelopmentCommittee.tsx
|   |   |-- IQAC.tsx
|   |   |-- GrievanceRedressal.tsx
|   |   |-- SRGCCommittee.tsx
|   |   |-- AntiRagging.tsx
|   |   |-- SCSTCommittee.tsx
|   |   |-- InternalComplaint.tsx
|   |   |-- EqualOpportunity.tsx
|   |   |-- SEDGCell.tsx
|   |
|   |-- naac/                  # NAAC accreditation documents
|   |   |-- NAACScore.tsx
|   |   |-- SSS.tsx
|   |   |-- SSSReport.tsx
|   |   |-- SSRCycle1.tsx
|   |   |-- SSRCycle2.tsx
|   |   |-- BestPractices.tsx
|   |
|   |-- contact/
|   |   |-- ContactUs.tsx
|   |
|   |-- mms/                         # ★ MMS (MBA) mini-site — routes under /mms/*
|       |-- MMSHome.tsx               # /mms — MMS landing page
|       |
|       |-- about/                    # /mms/about/*
|       |   |-- MMSAbout.tsx          # /mms/about (tab: About)
|       |   |-- MMSPrincipalsDesk.tsx # /mms/about/principals-desk
|       |   |-- MMSHODsDesk.tsx       # /mms/about/hods-desk
|       |   |-- MMSFaculty.tsx        # /mms/about/faculty
|       |   |-- MMSVisionMission.tsx  # /mms/about/vision-mission
|       |   |-- MMSDAB.tsx            # /mms/about/dab (Departmental Advisory Board)
|       |   |-- MMSProgramOutcomes.tsx # /mms/about/program-outcomes
|       |
|       |-- admission/
|       |   |-- MMSAdmission.tsx      # /mms/admission
|       |
|       |-- experiential-learning/
|       |   |-- MMSExperientialLearning.tsx  # /mms/experiential-learning
|       |                                    # tabs: Info, Role Play, Group Discussion,
|       |                                    #       Entrepreneurial Drive, Financial
|       |                                    #       Literacy Program, NESCO Bombay
|       |                                    #       Exhibition Centre, 3D Model Making
|       |
|       |-- training-placement/
|       |   |-- MMSTraining.tsx       # /mms/training-placement/training
|       |   |                         # tabs: Training, Events, Career Guidance,
|       |   |                         #       Internship, Gallery
|       |   |-- MMSPlacement.tsx      # /mms/training-placement/placement
|       |
|       |-- students-life/
|       |   |-- MMSStudentsLife.tsx   # /mms/students-life
|       |                             # tabs: V-Ecstatic, DLLE, Book Review,
|       |                             #       Add-on Courses (Power BI / Advance Excel),
|       |                             #       Industry Expert Session, NSIM Training,
|       |                             #       Oscillations, IDEATHON 1.0, Rankers
|       |
|       |-- facilities/
|       |   |-- MMSFacilities.tsx     # /mms/facilities
|       |                             # tabs: Computer Labs, Library, Seminar Hall,
|       |                             #       Classroom, Gymkhana
|       |
|       |-- faqs/
|           |-- MMSFAQs.tsx           # /mms/faqs (13 Q&A items)
|
|-- ui/                        # Reusable base UI elements (e.g. Shadcn/Radix components)
|-- utils/                     # Helper functions and utilities
|-- styles/                    # Global CSS and Tailwind definitions
|-- scripts/                   # Utility and build/automation scripts
|-- recruiters/                # Data related to recruiters
|-- wiki/                      # Additional local documentation
|
|-- services/                  # Public API fetch functions (main website, no auth)
|   |-- api.ts                 # Base fetch client — reads VITE_API_URL env var
|   |-- heroSlides.ts          # GET /api/hero-slides
|   |-- newsTicker.ts          # GET /api/news-ticker
|   |-- notices.ts             # GET /api/notices
|   |-- events.ts              # GET /api/events
|   |-- achievements.ts        # GET /api/achievements
|   |-- testimonials.ts        # GET /api/testimonials
|   |-- gallery.ts             # GET /api/gallery
|   |-- placements.ts          # GET /api/placements
|   |-- placementPartners.ts   # GET /api/placement-partners
|   |-- enquiries.ts           # POST /api/enquiries (admission form submit)
|
|-- hooks/                     # React data hooks wrapping services
|   |-- useFetch.ts            # Generic { data, loading, error, refetch }
|   |-- useHeroSlides.ts       # → components/Hero.tsx
|   |-- useNewsTicker.ts       # → components/TopBanner.tsx
|   |-- useNotices.ts          # → Notices page
|   |-- useEvents.ts           # → Events page
|   |-- useAchievements.ts     # → components/Achievements.tsx
|   |-- useTestimonials.ts     # → components/Testimonials.tsx
|   |-- useGallery.ts          # → components/Gallery.tsx
|   |-- usePlacements.ts       # → components/Placements.tsx
|   |-- usePlacementPartners.ts # → components/Recruiters.tsx
|   |-- useEnquiryForm.ts      # → Admissions / contact form
|
|-- context/
|   |-- SiteDataContext.tsx    # Preloads shared API data once at app mount
|
|-- admin/                     # React Admin Panel (routes under /admin/*)
|   |-- types.ts               # Admin-specific TypeScript types
|   |-- api/                   # Admin API modules (Bearer auth, full CRUD)
|   |   |-- client.ts          # Authenticated fetch client
|   |   |-- auth.ts            # POST /api/login, POST /api/logout
|   |   |-- notices.ts         # CRUD /api/notices
|   |   |-- events.ts          # CRUD /api/events
|   |   |-- placements.ts      # CRUD /api/placements
|   |   |-- heroSlides.ts      # CRUD /api/hero-slides
|   |   |-- newsTicker.ts      # CRUD /api/news-ticker
|   |   |-- achievements.ts    # CRUD /api/achievements
|   |   |-- testimonials.ts    # CRUD /api/testimonials
|   |   |-- gallery.ts         # Upload+delete /api/gallery
|   |   |-- placementPartners.ts # CRUD /api/placement-partners
|   |   |-- enquiries.ts       # GET /api/enquiries (read-only)
|   |-- context/
|   |   |-- AuthContext.tsx    # Auth state, login/logout, token persistence
|   |-- components/
|   |   |-- Sidebar.tsx        # Navigation with all 10 resource sections
|   |   |-- ProtectedRoute.tsx # Redirect to login if not authed
|   |   |-- AdminLayout.tsx    # Sidebar + main content wrapper
|   |-- pages/
|   |   |-- Login.tsx
|   |   |-- Dashboard.tsx
|   |   |-- notices/           NoticesList.tsx, NoticeForm.tsx
|   |   |-- events/            EventsList.tsx, EventForm.tsx
|   |   |-- placements/        PlacementsList.tsx, PlacementForm.tsx
|   |   |-- hero-slides/       HeroSlidesList.tsx, HeroSlideForm.tsx
|   |   |-- news-ticker/       NewsTickerList.tsx, NewsTickerForm.tsx
|   |   |-- achievements/      AchievementsList.tsx, AchievementsForm.tsx
|   |   |-- testimonials/      TestimonialsList.tsx, TestimonialsForm.tsx
|   |   |-- gallery/           GalleryPage.tsx
|   |   |-- placement-partners/ PlacementPartnersList.tsx, PlacementPartnersForm.tsx
|   |   |-- enquiries/         EnquiriesList.tsx
|
|-- public/                    # Static assets served by Vite at root /
|   |-- Images/
|       |-- Banner/
|       |-- gallery/
|       |-- Home background/
|       |-- LOGO/
|       |-- Packages/
|       |-- PLACEMENT/
|       |-- recriters/
|       |-- Remarkable Acheivements/
|       |-- testimonials/
|       |
|       |-- mms/               # ★ MMS-specific image assets
|           |-- logo/          # VCETLOGO.png, VCET.BANNER.png
|           |-- hero/          # Hero carousel images (gal1–gal5, _MG_0233, _MG_0244, _MG_0252)
|           |-- internships/   # Summer internship company logos (l2, l7, logo1)
|           |-- events/        # Events carousel images (e1, e2, e3)
|           |-- about/         # About page images (img4.jpeg)
|           |-- facilities/    # Facilities images (cl1, cl2, inf5)
|           |-- syllabus/      # FY.pdf, SY_syllabus.pdf (downloadable syllabi)
|
|-- Images/                    # Source image assets (mirrored to public/Images/)
|-- .htaccess                  # Apache rewrite rules for SPA routing
|-- DEPLOYMENT.md              # Step-by-step Bluehost deployment guide
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Production build

```bash
npm run build
```

Output goes to `dist/`. See [DEPLOYMENT.md](./DEPLOYMENT.md) for full hosting instructions.

---

## API & Dynamic Data

*(**Note:** See [wiki/Backend-Integration-Status.md](./wiki/Backend-Integration-Status.md) for details on the current implementation differences between the frontend expectations and backend Laravel Inertia monolith).*

The backend is a **Laravel 12 REST API** hosted in a separate repository: [ivory-26/vcet](https://github.com/ivory-26/vcet).

### Backend & Database Setup
If you are running the backend locally or deploying a new instance:

1. **MySQL Configuration**:
   - Create a database named `vcet`.
   - Update your `.env` with the database credentials (use `DB_PORT=4000` for TiDB Cloud).
2. **Migrations & Seeding**:
   - Run `php artisan migrate --seed` to set up tables and the admin user (`admin@vcet.edu.in` / `password`).
3. **Environment Variables**:
   - Ensure `VITE_API_URL` in your frontend `.env` points to your running backend (e.g., `http://localhost:8000/api` or `https://vcet-api.onrender.com/api`).

### Data flow
```
Backend (Laravel) → services/ → hooks/ → components/
```

| Layer | Folder | Role |
|-------|--------|------|
| API functions | `services/` | Raw fetch calls, no React state |
| React hooks | `hooks/` | Wrap services with `loading`, `error`, `data` |
| Shared context | `context/SiteDataContext.tsx` | Fetch once at app mount for data used by multiple components |
| Admin CRUD | `admin/api/` | Authenticated (Bearer token), full CRUD |

### Public endpoints (main website reads)

| Endpoint | Hook | Component |
|----------|------|-----------|
| `GET /api/hero-slides` | `useHeroSlides` | `Hero.tsx` |
| `GET /api/news-ticker` | `useNewsTicker` | `TopBanner.tsx` |
| `GET /api/notices` | `useNotices` | Notices page |
| `GET /api/events` | `useEvents` | Events page |
| `GET /api/achievements` | `useAchievements` | `Achievements.tsx` |
| `GET /api/testimonials` | `useTestimonials` | `Testimonials.tsx` |
| `GET /api/gallery` | `useGallery` | `Gallery.tsx` |
| `GET /api/placements` | `usePlacements` | `Placements.tsx` |
| `GET /api/placement-partners` | `usePlacementPartners` | `Recruiters.tsx` |
| `POST /api/enquiries` | `useEnquiryForm` | Admissions / contact form |

See [wiki/API-Endpoint-Map.md](./wiki/API-Endpoint-Map.md) for the full 38-endpoint reference including all admin CRUD routes.
Also, review the internal [Backend Architecture Data Flow](./wiki/Backend-Architecture.md) to understand the current routing mechanics of the Laravel repository.

---

## Admin Panel

The admin panel lives at `/admin/login` and manages all dynamic content.
It uses **Sanctum Bearer token auth** — credentials are managed in the backend repo.

| Section | Route | Resources managed |
|---------|-------|------------------|
| Dashboard | `/admin` | Overview counts |
| Notices | `/admin/notices` | Homepage notices |
| Events | `/admin/events` | College events |
| Hero Slides | `/admin/hero-slides` | Homepage banner slides |
| News Ticker | `/admin/news-ticker` | Top scrolling ticker |
| Achievements | `/admin/achievements` | Stat cards |
| Testimonials | `/admin/testimonials` | Student quotes |
| Gallery | `/admin/gallery` | Photo grid |
| Placements | `/admin/placements` | Placement records |
| Partners | `/admin/placement-partners` | Recruiter logos |
| Enquiries | `/admin/enquiries` | Admission enquiries (read-only) |

See [wiki/Admin-Panel-Guide.md](./wiki/Admin-Panel-Guide.md) for full usage instructions.

---

## Content Rules

These rules are non-negotiable for every contributor.

1. **The old website is the content reference.**
   Every page on this site has a corresponding page on https://vcet.edu.in.
   All facts — NAAC grade, NBA status, intake numbers, fee structure, faculty names, department info, placement statistics — must match or be more current. Do not invent, estimate, or copy from unofficial sources.

2. **Design is yours to own.**
   You can redesign any page from scratch — layout, colors, typography, animations, component structure. Creativity is encouraged. The constraint is on content, not presentation.

3. **New features are welcome but must be relevant.**
   Additions like a live event ticker, a placement graph, a course comparison tool, or a campus map are accepted. Features that are off-brand, unrelated to a college website, or that compromise performance without clear benefit will be rejected in review.

4. **Do not modify `admin/api/` or `services/` without coordinating** with the team lead. These modules define the contract with the backend. Breaking changes here can affect live data.

5. **Never commit credentials.**
   `.env.local` contains your `VITE_API_URL` and any secrets. This file is in `.gitignore`. Never commit it. If you accidentally push credentials, notify the project lead immediately.

6. **Image assets go into `public/Images/`.**
   Any new images you add must be placed in the correct subfolder under `public/Images/`. Do not use external image URLs for content that should be hosted locally.

---

## Contributing — Git Workflow

### Branch strategy

```
main              <- production-ready code. Protected. No direct commits.
develop           <- integration branch. Merge your feature branches here.
feature/<name>    <- your working branch for any new feature or page
fix/<name>        <- bug fixes
chore/<name>      <- refactoring, dependency updates, tooling
```

### Step-by-step for every change

```bash
# 1. Always start from an updated develop branch
git checkout develop
git pull origin develop

# 2. Create your branch
git checkout -b feature/your-feature-name

# 3. Work, commit often with clear messages
git add <specific files>
git commit -m "feat(admissions): add animated fee breakdown table"

# 4. Push your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request into develop — never into main
```

### Pull Request rules

- Every PR must have a clear title and a short description of what changed and why.
- A PR must be reviewed and approved by at least one other team member before merging.
- The author of a PR cannot approve their own PR.
- A PR with failing TypeScript checks will not be merged.
- Resolve all review comments before requesting a re-review.

### Commit message format (Conventional Commits)

```
<type>(<scope>): <short summary>

Types:
  feat      — a new feature or page
  fix       — a bug fix
  style     — visual/CSS changes with no logic change
  refactor  — code restructure with no behavior change
  chore     — tooling, dependencies, config
  docs      — documentation only
  content   — text, image, or data updates

Examples:
  feat(departments): add DeptENTC page with faculty table
  fix(header): correct mobile menu z-index overlap
  content(placements): update 2025 batch placement data
  chore(deps): upgrade framer-motion to v12
```

---

## GitHub Rules and Engineering Standards

These are the practices followed by professional engineering teams at companies like Google, Meta, Microsoft, and Netflix. Treat this project with the same discipline.

### 1. main is always deployable

The `main` branch must at all times contain code that builds successfully and is safe to deploy. No exceptions. If something is broken in `main`, fixing it is the highest priority for the entire team.

### 2. Never force push to shared branches

Force-pushing to `main` or `develop` rewrites history that others have based their work on. It causes irreversible divergence. This is a hard ban.

### 3. Small, focused pull requests

A PR should do one thing. A PR that adds a new page, refactors the header, updates three dependencies, and fixes a typo is difficult to review and hard to revert if something breaks. Keep PRs atomic. If you are working on a large feature, break it into sequential PRs.

### 4. Review code, not people

All PR comments must be about the code. Be specific, constructive, and objective. Suggest an improvement, explain the reason, and if needed, provide an example. Never leave a vague comment like "this is wrong". Write "this approach causes unnecessary re-renders — consider memoizing with useMemo because...".

### 5. Do not leave dead code

If you remove a feature, remove all associated code, imports, and assets. Dead code increases cognitive load for everyone who reads the file after you. If you are unsure whether something will be needed, use a comment with a date and your name explaining why it was left.

### 6. Self-review before requesting review

Before opening a PR, read your own diff from top to bottom as if you are the reviewer. Check for console logs, commented-out code, placeholder text, hardcoded values that should be constants, and TypeScript errors. The result is a cleaner PR and faster reviews.

### 7. Keep dependencies intentional

Do not add an npm package to solve a problem that can be solved with 10 lines of standard code. Every dependency is a maintenance liability and a potential security surface. Any new dependency requires a comment in the PR explaining why it was chosen over alternatives.

### 8. No hardcoded environment-specific values

Strings like API base URLs, site names, or feature flags that change between environments must not be scattered across components. Define them in a central config file or use `vite.config.ts` environment variables.

### 9. Write code for the next developer

Variable names must be descriptive. Functions must do one thing. A developer who has never seen this codebase should be able to read a component and understand what it does without running the app. Readability is not optional.

### 10. Sync with the base branch before opening a PR

Before opening a PR, rebase or merge the latest `develop` into your branch. Submitting a PR that is 30 commits behind the base wastes review time and creates merge conflicts.

```bash
git fetch origin
git rebase origin/develop
```

### 11. Tag releases

When a version is ready to go live, create a Git tag on `main`.

```bash
git tag -a v1.0.0 -m "Initial production release"
git push origin v1.0.0
```

### 12. The Git log is documentation

Your commit history tells the story of this project. Write commit messages as if the person reading them has no context. A message like `fix stuff` is useless six months later. A message like `fix(hero): remove duplicate IntersectionObserver on remount` tells exactly what broke and where.

---

## Contributors

This project is built by an amazing team of developers committed to creating a website for VCET. Special thanks to:

| # | Contributor | GitHub |
|---|-------------|--------|
| 1 | **frag2win**/**shubham pawar** | [@frag2win](https://github.com/frag2win) |
| 2 | **Sahil2802-coder** | [@Sahil2802-coder](https://github.com/Sahil2802-coder) |
| 3 | **yashhh-23** | [@yashhh-23](https://github.com/yashhh-23) |
| 4 | **RedRex101** | [@RedRex101](https://github.com/RedRex101) |
| 5 | **ivory-26** | [@ivory-26](https://github.com/ivory-26) |
| 6 | **sawantshreya008** | [@sawantshreya008](https://github.com/sawantshreya008) |
| 7 | **sumritasawant101-droid** | [@sumritasawant101-droid](https://github.com/sumritasawant101-droid) |
| 8 | **dakshata2405956201-svg** | [@dakshata2405956201-svg](https://github.com/dakshata2405956201-svg) |
| 9 | **shweta1909patil-maker** | [@shweta1909patil-maker](https://github.com/shweta1909patil-maker) |
| 10 | **Sumit Vishwakarma** | [@Sumitc0de](https://github.com/Sumitc0de) |
| 11 | **antarikshsingh** | [@antarikshsingh](https://github.com/antarikshsingh) |
| 12 | **PratikRavale24** | [@PratikRavale24](https://github.com/PratikRavale24) |
| 13 | **Pranish Harish Shetty** | [@pranishshetty](https://share.google/b5ZkgP5lON5wfUw4y) |
| 14 | **Rehan Pinjari** | [@rehanw1](https://github.com/rehanw1) |
| 15 | **Pritiyadav** | [@Pritiyadav6](https://github.com/Pritiyadav6) |



### How to contribute

If you would like to contribute to this project, please follow the guidelines outlined in the [Contributing — Git Workflow](#contributing--git-workflow) and [GitHub Rules and Engineering Standards](#github-rules-and-engineering-standards) sections above as. We welcome bug reports, feature suggestions, and pull requests from the community.
