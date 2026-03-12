# Code Review — vcet.edu.in

**Reviewer:** GitHub Copilot  
**Date:** 2025  
**Scope:** Full codebase audit (components, pages, services, hooks, admin panel, config)  
**Repository:** `CyberCodezilla/vcet.edu.in`

---

## Executive Summary

The React 19 + TypeScript + Vite frontend is well-structured and the Tailwind v4 migration builds cleanly. However, the review surfaced **32 issues across four severity levels** — including security vulnerabilities that must be addressed before the site handles real user data.

| Severity | Count | Issues |
|----------|-------|--------|
| 🔴 Critical | 5 | #15, #17, #18, #20, #22 |
| 🟠 High | 8 | #23, #27, #25, #26, #28, #29, #30, #31 |
| 🟡 Medium | 12 | #32 – #43 |
| 🔵 Low | 9 | #44 – #52 |

---

## 🔴 Critical — Must Fix Before Go-Live

### [C-1] API Key Exposed in Client Bundle · #15
**File:** `vite.config.ts`

The `define` block hard-codes `GEMINI_API_KEY` into the compiled JavaScript bundle. Any visitor can extract it from DevTools → Sources.

```ts
// vite.config.ts  ← DANGER
define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY), // shipped to browser
}
```

**Fix:** Move all AI/LLM calls to a server-side function (Vercel serverless, Express route, etc.). Never put secret API keys in `define`.

---

### [C-2] Admin JWT Stored in localStorage · #17
**File:** `admin/context/AuthContext.tsx`

`localStorage` is readable by any JavaScript running on the page (XSS). A single injected script can exfiltrate the JWT and take over admin sessions.

**Fix:** Store the JWT in an `HttpOnly` cookie set by the server. The browser will send it automatically and JS cannot read it.

---

### [C-3] Dev Auth Bypass Can Reach Production · #18
**File:** `admin/context/AuthContext.tsx`

```ts
// Runs at module initialisation — not just in dev
if (process.env.NODE_ENV !== 'production') {
  setUser(DEV_USER);
}
```

Because `NODE_ENV` is injected at build time by Vite, this code is tree-shaken in a proper production build — but a misconfigured CI/CD pipeline (building without `NODE_ENV=production`) would ship the bypass to the live server.

**Fix:** Gate the bypass behind a named env var (`VITE_DEV_AUTH_BYPASS=true`) that is _never_ set in the production environment, and add a CI check that fails if it is.

---

### [C-4] All Service/Hook Files Are Empty Stubs · #20
**Files:** Every file in `services/` and `hooks/`

Every `services/*.ts` file contains only `// TODO` comments. The admission enquiry form calls `setSubmitted(true)` with no HTTP request — real user data is silently discarded.

**Fix:** Connect the service files to the Supabase/REST API before launch. Use the existing `admin/api/` implementations as the reference.

---

### [C-5] `@types/react-router-dom@5` Conflicts with `react-router-dom@7` · #22
**File:** `package.json`

The runtime package is v7 but type definitions are v5. The two APIs are incompatible; TypeScript silently accepts v5-typed calls that will throw at runtime in v7.

**Fix:**
```bash
npm uninstall @types/react-router-dom
```
React Router v7 ships its own types — no `@types/` package is needed.

---

## 🟠 High — Fix Before Each Feature Release

### [H-1] Duplicate Animation Libraries · #23
Both `framer-motion` and `motion` (its tree-shakeable successor) are installed. This adds ~200 KB to the bundle unnecessarily.

**Fix:** Remove `framer-motion`, migrate all `import { motion } from 'framer-motion'` to `import { motion } from 'motion/react'`.

---

### [H-2] No ErrorBoundary Around Lazy Routes · #27
**File:** `App.tsx`

A failed dynamic `import()` (network timeout, deploy mismatch) shows a completely blank white page. There is no error UI or recovery path.

**Fix:** Wrap the `<Suspense>` tree in a `<ErrorBoundary>` component that renders a friendly error page with a "Reload" button.

---

### [H-3] Phosphor Icons Imported as Classes, Never as Components · #25
**File:** `pages/departments/DeptComputerEngg.tsx`

Phosphor icon class names are passed as strings but the `@phosphor-icons/react` package is never imported. All department page icons render as empty boxes.

**Fix:** Either install `@phosphor-icons/react` and import icons as React components, or switch to the already-installed Heroicons/Lucide library.

---

### [H-4] Admin API Defaults to Production URL · #26
**File:** `admin/api/client.ts`

```ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.vcet.edu.in';
```

When `VITE_API_URL` is unset (e.g. a fresh clone), all admin API calls hit the production database — including writes from `localhost`.

**Fix:** Default to `http://localhost:3000` and add a CI check that `VITE_API_URL` is explicitly set before any deploy.

---

### [H-5] Stale Closure in `About.tsx` StatCard · #28
`start` and `onVisible` are missing from the `useEffect` dependency array, so the counter animation reads the initial (zero) value on every re-render.

---

### [H-6] Memory Leak in `Placements.tsx` · #29
`setTimeout` callbacks are not cancelled in the `useEffect` cleanup. If the user navigates away mid-animation, the callbacks fire against unmounted state and log React warnings in production.

---

### [H-7] Admission Form Discards User Data · #30
**File:** `components/Hero.tsx`

The enquiry form calls `setSubmitted(true)` but makes zero HTTP requests. Every form submission is silently lost.

---

### [H-8] `NAACScore.tsx` uses `window.location.replace` · #31
Hard navigation breaks the SPA back-button, reloads the full page bundle, and cannot be intercepted by the router for loading states.

**Fix:** Use React Router's `useNavigate` hook, or if the destination is truly external, use `window.open` with `rel="noopener noreferrer"`.

---

## 🟡 Medium — Address in Current Sprint

| # | Issue | File(s) |
|---|-------|---------|
| #32 M-1 | SectionHeader renders title twice | `components/SectionHeader.tsx` |
| #33 M-2 | Array index as React key | Recruiters, Testimonials, Gallery, Achievements |
| #34 M-3 | Double scroll-to-top on navigation | `App.tsx` + dept pages |
| #35 M-4 | Footer uses raw `<a>` tags (full reload) | `components/Footer.tsx` |
| #36 M-5 | TypeScript strict mode disabled | `tsconfig.json` |
| #37 M-6 | Placeholder / Lorem ipsum visible to users | Dashboard, ExploreUs |
| #38 M-7 | Admissions CTA buttons are inert | `components/Admissions.tsx` |
| #39 M-8 | Hardcoded hex colours bypass design tokens | Hero, DepartmentPage, about pages |
| #40 M-9 | Recruiter data duplicated in three places | Recruiters, services, pages/placements |
| #41 M-10 | IntersectionObserver rebuilt on every tab change | `components/DepartmentPage.tsx` |
| #42 M-11 | Social icon links missing `aria-label` | Footer, Header |
| #43 M-12 | TopBanner ticker is hardcoded | `components/TopBanner.tsx` |

---

## 🔵 Low — Backlog / Polish

| # | Issue | File(s) |
|---|-------|---------|
| #44 L-1 | Debug comment `// commit test` in App.tsx | `App.tsx` |
| #45 L-2 | Dead `tailwind.config.js` legacy file | `tailwind.config.js` |
| #46 L-3 | Gallery fetches from Unsplash not local assets | `components/Gallery.tsx` |
| #47 L-4 | Footer placeholder `href="#"` links | `components/Footer.tsx` |
| #48 L-5 | No per-page `<title>` tag (SEO) | All pages |
| #49 L-6 | Below-fold images missing `loading="lazy"` | Gallery, Recruiters, Testimonials |
| #50 L-7 | `font-serif` used instead of `font-display` token | Hero, About, dept pages |
| #51 L-8 | Patents import points to `Parents.tsx` (typo) | `App.tsx` |
| #52 L-9 | Dev server binds to `0.0.0.0` (LAN-exposed) | `vite.config.ts` |

---

## Recommended Fix Order

```
Phase 1 (Security — before any real traffic):
  C-1 → C-2 → C-3 → H-4

Phase 2 (Correctness — before launch):
  C-4 → H-7 → H-3 → C-5 → H-8 → L-8

Phase 3 (Stability — first sprint after launch):
  H-1 → H-2 → H-5 → H-6 → M-5 (TypeScript strict)

Phase 4 (UX / polish — ongoing):
  M-1 through M-12, then L-1 through L-9
```

---

## Positive Notes

- **Architecture is clean** — separation of `services/`, `hooks/`, `components/`, `pages/`, `admin/` is well-thought-out and scalable.
- **Tailwind v4 migration** is complete and the build pipeline is healthy.
- **Admin panel structure** is solid; the `ProtectedRoute` + `AuthContext` pattern is the right approach — the JWT storage location just needs to move to `HttpOnly` cookies.
- **Lazy-loading all routes** in `App.tsx` is excellent for initial bundle size.
- **Design token system** in `index.css @theme` is well-designed — it just needs to be used consistently everywhere.
