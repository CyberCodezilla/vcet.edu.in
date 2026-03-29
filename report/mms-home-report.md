# MMS Home Page - Backend API Handoff Report

## 1. Purpose
This document is prepared for backend implementation so MMS Home image/content blocks can be served by APIs with exact frontend-compatible keys.

## 2. Frontend Sources
- UI page: pages/mms/MMSHome.tsx
- Content source currently used: pages/mms/mmsHomeContent.ts
- Endpoint map: services/mms/endpoints.ts

## 3. Recommended Endpoint Plan

### A) Full Home Content Endpoint
- Method: GET
- Path: /api/mms/home
- Purpose: Serve full home page content (hero, notices, admission, internships, events, videos, documents)

Recommended response shape:

```json
{
  "heroSlides": [
    { "id": "hero-1", "title": "...", "subtitle": "...", "imageUrl": "https://..." }
  ],
  "notices": {
    "id": "mms-notices",
    "title": "Notices",
    "items": [
      { "id": "n1", "label": "Admissions", "content": "..." }
    ]
  },
  "latestNotifications": {
    "id": "mms-latest-notifications",
    "title": "Latest Notifications",
    "items": [
      { "id": "ln1", "title": "...", "link": "..." }
    ]
  },
  "sections": [
    {
      "id": "admission",
      "items": [
        {
          "heading": "...",
          "body": "...",
          "ctaText": "Apply Now",
          "ctaPath": "/mms/admission",
          "imageUrl": "https://..."
        }
      ]
    },
    {
      "id": "internships",
      "items": [
        { "id": "i1", "imageUrl": "https://...", "alt": "Internship Logo 1" }
      ]
    },
    {
      "id": "events",
      "items": [
        { "id": "e1", "imageUrl": "https://...", "title": "MMS Event Showcase 1" }
      ]
    },
    {
      "id": "experiential-videos",
      "items": [
        { "id": "v1", "title": "Role Play Session", "poster": "https://..." }
      ]
    },
    {
      "id": "pdf-docs",
      "items": [
        {
          "id": "d1",
          "label": "First Year Syllabus",
          "description": "...",
          "url": "https://..."
        }
      ]
    }
  ]
}
```

### B) Optional Dedicated Image Endpoint
- Method: GET
- Path: /api/mms/home/images
- Purpose: If backend wants image-only management
- Note: This endpoint is already reserved in frontend endpoint map.

Recommended response shape:

```json
{
  "items": [
    {
      "id": "home-hero-1",
      "key": "hero-1",
      "label": "MMS Hero Banner 1",
      "imageUrl": "https://...",
      "alt": "MMS campus hero"
    }
  ]
}
```

## 4. Frontend-Required Image Keys

### Hero Slider
- Field: heroSlides[].imageUrl
- Count: 5 to 8

### Admission Banner
- Field: sections[id=admission].items[0].imageUrl
- Count: 1

### Summer Internship Logos
- Field: sections[id=internships].items[].imageUrl
- Count: 3

### Event Cards
- Field: sections[id=events].items[].imageUrl
- Count: 3

### Experiential Video Posters
- Field: sections[id=experiential-videos].items[].poster
- Count: 1 to 3

## 5. Editable Limits (Frontend Layout Safe)
- Hero title: max 60 chars
- Hero subtitle: max 120 chars
- Notice label: max 15 chars
- Notice content: max 80 chars
- Notification title: max 100 chars
- Admission heading: max 50 chars
- Admission body: max 180 chars
- Admission CTA text: max 20 chars
- Internship section title: max 40 chars
- Event title: max 50 chars
- Video title: max 45 chars
- Document label: max 40 chars

## 6. Implementation Notes for Backend
- Prefer imageUrl field name for direct compatibility.
- If returning image_url, frontend can still handle it only in image-holder hook paths; for home content prefer imageUrl.
- Return absolute URLs if possible. Relative paths should be valid under site origin.
- Keep stable ids for each item so admin updates are deterministic.

## 7. Suggested API Points (CRUD)

### Public Read
- GET /api/mms/home
- GET /api/mms/home/images

### Admin Write (recommended)
- POST /api/admin/mms/home/images
  - Create new image holder record
- PATCH /api/admin/mms/home/images/:id
  - Update label/key/imageUrl/alt
- DELETE /api/admin/mms/home/images/:id
  - Remove holder image
- PATCH /api/admin/mms/home
  - Update non-image blocks (hero text, notices, notifications, CTA text)

### Minimal request payload examples

```json
{
  "label": "MMS Hero Banner 1",
  "key": "hero-1",
  "imageUrl": "https://cdn.example.com/mms/hero-1.jpg",
  "alt": "MMS campus hero"
}
```

```json
{
  "heroSlides": [
    { "id": "hero-1", "title": "...", "subtitle": "..." }
  ]
}
```
