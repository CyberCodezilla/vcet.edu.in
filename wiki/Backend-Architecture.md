# API & Data Flow Architecture Analysis

This document provides a comprehensive analysis of dynamic data interactions, internal APIs, frontend data fetching strategies, and external service usage within the VCET web platform.

---

## 1. Dynamic Data Interactions & Data Flow

### How Data Flows Between Frontend and Backend
Since this project uses the **Laravel + Inertia.js (React)** stack, it does not rely on traditional heavily separated REST APIs for standard page interactions. Data flow occurs as follows:

1. **Initial Page Load:** Laravel route handles the GET request, gathers necessary data (Eloquent DB queries), and returns an `Inertia::render('PageName', [...props])` response. This sends both the initial HTML and a JSON payload describing the page state and props.
2. **Client-side Navigation:** When a user clicks an Inertia `<Link>`, Inertia makes an **XHR (AJAX)** request back to Laravel. Laravel detects the Inertia header and simply returns the JSON props for the new page instead of a full HTML document.
3. **Form Submissions:** The application uses Inertia's `useForm` (or the new `<Form>` component wrapper). Submissions seamlessly perform XHR requests using Axios (under the hood by Inertia). Form validation errors are automatically caught as HTTP 422 responses and injected dynamically back into the React components as `errors` props.
4. **Wayfinder Integration:** The project uniquely uses **Laravel Wayfinder** to directly bind React form actions to Laravel Controllers ensuring exact type safety between backend parameter requirements and frontend form payloads. For example: `ProfileController.update.form()`.

### Mechanism Breakdown
- **AJAX / Axios:** Managed entirely under the hood by Inertia.js and Wayfinder.
- **Fetch Usage:** Found a direct `fetch()` implementation specifically in `resources/js/hooks/use-two-factor-auth.ts`, configured to hit specific JSON-returning Laravel controllers to retrieve QR Code SVGs and secret keys outside the standard Inertia page load lifecycle.
- **External Services:** The project relies on `https://fonts.bunny.net` to serve variable fonts to the frontend. No direct Stripe, Google Maps, or analytical services are injected yet.

---

## 2. Internal API Endpoint Catalog

Based on scanning `routes/web.php`, `routes/settings.php`, and standard **Laravel Fortify** implementations.

| HTTP Method | Route Path | File/Origin | Purpose | Expected Request | Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | `web.php` | Returns the Welcome landing page. | None | Inertia JSON / HTML |
| **GET** | `/dashboard` | `web.php` | Renders the authenticated dashboard. | None | Inertia JSON / HTML |
| **GET** | `/settings/profile` | `settings.php` | View profile update page. | None | Inertia JSON / HTML |
| **PATCH** | `/settings/profile` | `settings.php` | Update user profile information. | `{ name: string, email: string }` | Inertia Redirect / Validation Errors |
| **DELETE** | `/settings/profile` | `settings.php` | Delete user account permanently. | `{ password: string }` | Inertia Redirect |
| **PUT** | `/settings/password` | `settings.php` | Update user password. | `{ current_password, password, password_confirmation }` | Inertia Redirect |
| **GET** | `/user/two-factor-qr-code` | `Fortify / routes` | Gets 2FA SVG. Hit manually via `fetch()`. | None | JSON `{"svg": "<svg>..."}` |
| **GET** | `/user/two-factor-secret-key` | `Fortify / routes` | Gets manual 2FA setup text key. | None | JSON `{"secretKey": "text..."}` |
| **GET** | `/user/two-factor-recovery-codes` | `Fortify / routes` | Gets emergency recovery codes. | None | JSON `["code1", "code2"]` |
| **POST** | `/login` | `Fortify / routes` | Authenticate the user. | `{ email, password, remember }` | Redirect / Auth Session |
| **POST** | `/register` | `Fortify / routes` | Register a new user. | `{ name, email, password, password_confirmation }` | Redirect / Auth Session |
| **POST** | `/logout` | `Fortify / routes` | Invalidates the active session. | None | Redirect back |

---

## 3. Frontend API Call Identifiers

- **Inertia `<Form>` & `useForm()`:** The primary vehicle for mutating data (e.g. `ProfileController.update.form()` inside `resources/js/pages/settings/profile.tsx`).
- **Fetch (`fetch()`):** `fetchJson(url)` utility located inside `use-two-factor-auth.ts` specifically designed to request strict JSON representations of Fortify endpoints.
- **Axios & XMLHttpRequest:** The Inertia library heavily uses Axios underneath automatically to intercept anchor tag clicks and form submissions securely passing CSRF tokens back to Laravel automatically.
- **Socket.IO / WebSockets:** Not currently identified within the source code. The app is mostly a traditional stateless HTTP request/response model.

---

## 4. Endpoint Categorization

- **Public Endpoints (No Auth Required):**
  - `GET /` (Welcome Homepage)
  - `POST /login`, `GET /login`
  - `POST /register`, `GET /register`

- **Protected/Authenticated Endpoints (Requires Login):**
  - `GET /dashboard`
  - `GET /settings/*`
  - `PATCH /settings/profile`, `PUT /settings/password`
  - `DELETE /settings/profile`
  - All 2FA retrieval endpoints (`/user/two-factor-qr-code`, etc.)

- **Admin-Only Endpoints:**
  - Standard roles/permissions are not implicitly defined in standalone specific route scopes yet (`admin.php` is missing). Users only currently interact with their own isolated data (`auth` middleware).

- **Database-Connected Endpoints:**
  - Virtually all `POST`, `PUT`, `PATCH`, and `DELETE` requests trigger Eloquent ORM queries (e.g. `ProfileController::update` issues an `UPDATE users SET name...`).
  - Read routes like `/dashboard` or `/settings/profile` eagerly pull from the global User object managed in the session DB store.

---

## 5. External APIs Consumed
Currently, the codebase depends on minimal third-party REST integrations.

- **Bunny Fonts (`fonts.bunny.net`):** Consumed via `<link>` tags in `app.blade.php`, acting as an external API for downloading the dynamic font weights.
