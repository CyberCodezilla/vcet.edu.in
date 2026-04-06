# Bluehost + SQL Deployment Plan (Frontend Repo + Backend Repo)

## 1. Hosting Architecture (Recommended)

- Frontend (this repo): static build on Bluehost (`public_html`).
- Backend API (Laravel): deploy on VPS/Cloud host (or Bluehost VPS), connect to MySQL.
- Database: MySQL production schema with migrations.

Why: React static hosting is stable on shared Apache. API runtime is safer on proper app host.

## 2. Frontend Repo Tasks (This Repo)

### Already implemented

- Path sanitizer before build to prevent invalid JS escape deployment failures.
- Apache `.htaccess` auto-copied into `dist/` after build.

### Deployment steps

1. Set production API origin in `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
```

2. Build locally:

```bash
npm ci
npm run build
```

3. Upload `dist/` contents to Bluehost `public_html/`.

4. Verify:
- SPA route refresh works (thanks to `.htaccess`).
- Assets load with cache headers.
- Frontend can call API domain.

## 3. Backend Repo Tasks (Must Do)

## 3.1 Environment and URL

In backend production env:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

SESSION_DRIVER=database
CACHE_STORE=file
QUEUE_CONNECTION=database
```

## 3.2 CORS

Allow frontend domain in Laravel CORS config:

- `https://vcet.edu.in`
- `https://www.vcet.edu.in` (if used)

## 3.3 Database

- Run migrations on production DB.
- Seed only essential baseline data.
- Add indexes for read-heavy tables (`slug`, `is_active`, `year`, timestamps).

## 3.4 Response Caching (for smooth load)

For public read endpoints:
- Add cache headers (`Cache-Control`) with short browser cache + longer shared cache.
- Optionally cache expensive queries in Laravel cache for 1-10 minutes.

## 3.5 Admin Save Invalidation

When admin updates content, invalidate related cache keys so frontend reflects updates quickly.

## 3.6 File Upload URLs

Ensure backend returns stable URL paths with forward slashes only, for example:

- `/images/...`
- `/pdfs/...`

No Windows-style path separators in payloads.

## 3.7 Security Hardening

- Force HTTPS.
- Disable directory listing.
- Restrict debug routes.
- Rotate app key and secrets via environment variables only.

## 4. Zero-Downtime Release Sequence

1. Backup DB.
2. Deploy backend first.
3. Run migrations.
4. Smoke-test API endpoints.
5. Deploy frontend `dist/`.
6. Purge CDN/server cache if present.
7. Smoke-test admin edit and public render.

## 5. Smoke Test Checklist

- Home, About, Departments load without console errors.
- Organizational structure renders quickly.
- Notices/events/galleries fetch correctly.
- Admin saves update public pages after refresh.
- Uploaded images/PDF links resolve correctly.

## 6. Rollback Plan

- Keep previous frontend `dist` backup zip.
- Keep DB snapshot before migrations.
- If failure: restore frontend + rollback migration/snapshot.
