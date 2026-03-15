# API Endpoint Map — Main Website ↔ Admin Panel

> Base URL: `http://localhost:8000` (dev) / production TBD  
> All endpoints are prefixed `/api/`  
> **Public endpoints** require no auth. **Admin endpoints** require `Authorization: Bearer <token>`.

*(**Important Note:** The current backend repository `vcet` is partially built as an Inertia.js Monolith. The APIs listed below (with the exception of `/api/enquiries`) are target endpoints expected by the frontend but are yet to be implemented statelessly in the Laravel backend API. See [Backend Integration Status](Backend-Integration-Status.md) for more info.)*

---

## Authentication

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `POST` | `/api/login` | None | Admin panel | Login — returns `{ token, user }` |
| `POST` | `/api/logout` | Bearer | Admin panel | Invalidate current token |

---

## Hero Slides

**Component:** `components/Hero.tsx`  
**Admin page:** `/admin/hero-slides`  
**Service:** `services/heroSlides.ts`  
**Hook:** `hooks/useHeroSlides.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/hero-slides` | None | Main website | Fetch all active slides ordered by `sort_order` |
| `POST` | `/api/hero-slides` | Bearer | Admin panel | Upload new slide (FormData + image) |
| `PUT` | `/api/hero-slides/{id}` | Bearer | Admin panel | Update slide fields / replace image |
| `DELETE` | `/api/hero-slides/{id}` | Bearer | Admin panel | Remove a slide |

---

## News Ticker

**Component:** `components/TopBanner.tsx`  
**Admin page:** `/admin/news-ticker`  
**Service:** `services/newsTicker.ts`  
**Hook:** `hooks/useNewsTicker.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/news-ticker` | None | Main website | Fetch all active ticker items ordered by `sort_order` |
| `POST` | `/api/news-ticker` | Bearer | Admin panel | Create ticker item (JSON) |
| `PUT` | `/api/news-ticker/{id}` | Bearer | Admin panel | Update ticker item |
| `DELETE` | `/api/news-ticker/{id}` | Bearer | Admin panel | Remove ticker item |

---

## Notices

**Page:** `pages/` (dedicated notices listing — to be built)  
**Admin page:** `/admin/notices`  
**Service:** `services/notices.ts`  
**Hook:** `hooks/useNotices.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/notices` | None | Main website | Paginated list — `?page=N` |
| `POST` | `/api/notices` | Bearer | Admin panel | Create notice (JSON) |
| `PUT` | `/api/notices/{id}` | Bearer | Admin panel | Update notice |
| `DELETE` | `/api/notices/{id}` | Bearer | Admin panel | Delete notice |

---

## Events

**Page:** `pages/` (dedicated events listing — to be built)  
**Admin page:** `/admin/events`  
**Service:** `services/events.ts`  
**Hook:** `hooks/useEvents.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/events` | None | Main website | Paginated list — `?page=N` |
| `POST` | `/api/events` | Bearer | Admin panel | Create event (JSON) |
| `PUT` | `/api/events/{id}` | Bearer | Admin panel | Update event |
| `DELETE` | `/api/events/{id}` | Bearer | Admin panel | Delete event |

---

## Achievements

**Component:** `components/Achievements.tsx`  
**Admin page:** `/admin/achievements`  
**Service:** `services/achievements.ts`  
**Hook:** `hooks/useAchievements.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/achievements` | None | Main website | All active achievements ordered by `sort_order` |
| `POST` | `/api/achievements` | Bearer | Admin panel | Create achievement card (JSON) |
| `PUT` | `/api/achievements/{id}` | Bearer | Admin panel | Update achievement |
| `DELETE` | `/api/achievements/{id}` | Bearer | Admin panel | Delete achievement |

---

## Testimonials

**Component:** `components/Testimonials.tsx`  
**Admin page:** `/admin/testimonials`  
**Service:** `services/testimonials.ts`  
**Hook:** `hooks/useTestimonials.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/testimonials` | None | Main website | All active testimonials |
| `POST` | `/api/testimonials` | Bearer | Admin panel | Create testimonial (FormData + optional photo) |
| `PUT` | `/api/testimonials/{id}` | Bearer | Admin panel | Update testimonial / replace photo |
| `DELETE` | `/api/testimonials/{id}` | Bearer | Admin panel | Delete testimonial |

---

## Gallery

**Component:** `components/Gallery.tsx`  
**Admin page:** `/admin/gallery`  
**Service:** `services/gallery.ts`  
**Hook:** `hooks/useGallery.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/gallery` | None | Main website | All gallery images |
| `POST` | `/api/gallery` | Bearer | Admin panel | Upload image (FormData + optional caption) |
| `DELETE` | `/api/gallery/{id}` | Bearer | Admin panel | Delete image |

> Note: Gallery has no `PUT` — to change an image, delete and re-upload.

---

## Placements

**Component:** `components/Placements.tsx`  
**Admin page:** `/admin/placements`  
**Service:** `services/placements.ts`  
**Hook:** `hooks/usePlacements.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/placements` | None | Main website | Paginated placement records — `?page=N` |
| `POST` | `/api/placements` | Bearer | Admin panel | Create placement record (JSON) |
| `PUT` | `/api/placements/{id}` | Bearer | Admin panel | Update placement record |
| `DELETE` | `/api/placements/{id}` | Bearer | Admin panel | Delete placement record |

---

## Placement Partners (Recruiters)

**Component:** `components/Recruiters.tsx`  
**Admin page:** `/admin/placement-partners`  
**Service:** `services/placementPartners.ts`  
**Hook:** `hooks/usePlacementPartners.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `GET` | `/api/placement-partners` | None | Main website | All active recruiter logos ordered by `sort_order` |
| `POST` | `/api/placement-partners` | Bearer | Admin panel | Add company logo (FormData + optional logo image) |
| `PUT` | `/api/placement-partners/{id}` | Bearer | Admin panel | Update company / replace logo |
| `DELETE` | `/api/placement-partners/{id}` | Bearer | Admin panel | Remove partner |

---

## Enquiries

**Component:** Admissions pages + contact form  
**Admin page:** `/admin/enquiries` (read-only)  
**Service:** `services/enquiries.ts`  
**Hook:** `hooks/useEnquiryForm.ts`

| Method | Endpoint | Auth | Consumer | Description |
|--------|----------|------|----------|-------------|
| `POST` | `/api/enquiries` | None | Main website | Submit admission enquiry form |
| `GET` | `/api/enquiries` | Bearer | Admin panel | View all submitted enquiries (paginated) |

> Note: Visitors submit via main website; admin only reads — no edit or delete on enquiries.

---

## Standard Response Shapes

```
List (paginated):
  { data: T[], meta: { current_page, last_page, total, per_page } }

Single item / create / update:
  { data: T, message?: string }

Delete:
  { message: string }

Validation error 422:
  { message: string, errors: { field: string[] } }

Unauthenticated 401:
  { message: "Unauthenticated." }
```

---

## Full Endpoint Quick Reference

| Method | Endpoint | Auth | Used By |
|--------|----------|------|---------|
| `POST` | `/api/login` | — | Admin |
| `POST` | `/api/logout` | Bearer | Admin |
| `GET` | `/api/hero-slides` | — | Website → `Hero.tsx` |
| `POST` | `/api/hero-slides` | Bearer | Admin |
| `PUT` | `/api/hero-slides/{id}` | Bearer | Admin |
| `DELETE` | `/api/hero-slides/{id}` | Bearer | Admin |
| `GET` | `/api/news-ticker` | — | Website → `TopBanner.tsx` |
| `POST` | `/api/news-ticker` | Bearer | Admin |
| `PUT` | `/api/news-ticker/{id}` | Bearer | Admin |
| `DELETE` | `/api/news-ticker/{id}` | Bearer | Admin |
| `GET` | `/api/notices` | — | Website → Notices page |
| `POST` | `/api/notices` | Bearer | Admin |
| `PUT` | `/api/notices/{id}` | Bearer | Admin |
| `DELETE` | `/api/notices/{id}` | Bearer | Admin |
| `GET` | `/api/events` | — | Website → Events page |
| `POST` | `/api/events` | Bearer | Admin |
| `PUT` | `/api/events/{id}` | Bearer | Admin |
| `DELETE` | `/api/events/{id}` | Bearer | Admin |
| `GET` | `/api/achievements` | — | Website → `Achievements.tsx` |
| `POST` | `/api/achievements` | Bearer | Admin |
| `PUT` | `/api/achievements/{id}` | Bearer | Admin |
| `DELETE` | `/api/achievements/{id}` | Bearer | Admin |
| `GET` | `/api/testimonials` | — | Website → `Testimonials.tsx` |
| `POST` | `/api/testimonials` | Bearer | Admin |
| `PUT` | `/api/testimonials/{id}` | Bearer | Admin |
| `DELETE` | `/api/testimonials/{id}` | Bearer | Admin |
| `GET` | `/api/gallery` | — | Website → `Gallery.tsx` |
| `POST` | `/api/gallery` | Bearer | Admin |
| `DELETE` | `/api/gallery/{id}` | Bearer | Admin |
| `GET` | `/api/placements` | — | Website → `Placements.tsx` |
| `POST` | `/api/placements` | Bearer | Admin |
| `PUT` | `/api/placements/{id}` | Bearer | Admin |
| `DELETE` | `/api/placements/{id}` | Bearer | Admin |
| `GET` | `/api/placement-partners` | — | Website → `Recruiters.tsx` |
| `POST` | `/api/placement-partners` | Bearer | Admin |
| `PUT` | `/api/placement-partners/{id}` | Bearer | Admin |
| `DELETE` | `/api/placement-partners/{id}` | Bearer | Admin |
| `POST` | `/api/enquiries` | — | Website → Contact/Admissions form |
| `GET` | `/api/enquiries` | Bearer | Admin (read-only) |

**Total: 38 endpoints** (10 public reads + 1 public write + 27 admin)
