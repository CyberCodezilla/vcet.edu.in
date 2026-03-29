# MMS Facilities - Backend API Handoff Report

## 1. Purpose
Backend-ready API contract for MMS Facilities image holders.

## 2. Frontend Sources
- pages/mms/facilities/MMSFacilities.tsx
- pages/mms/facilities/MMSFacilitiesLibrary.tsx
- pages/mms/facilities/MMSFacilitiesSeminarHall.tsx
- pages/mms/facilities/MMSFacilitiesClassroom.tsx
- pages/mms/facilities/MMSFacilitiesGymkhana.tsx
- pages/mms/facilities/MMSFacilitiesShared.tsx

## 3. Endpoint Plan

### Facilities Main Endpoint
- Method: GET
- Path: /api/mms/facilities
- Purpose: section metadata, text, optional list data

### Facilities Images Endpoint
- Method: GET
- Path: /api/mms/facilities/images
- Purpose: image holders for all facilities pages

Recommended response shape:

```json
{
  "items": [
    {
      "id": "fac-1",
      "key": "lab-1",
      "label": "LAB 1",
      "imageUrl": "https://...",
      "alt": "Computer Lab 1"
    }
  ]
}
```

## 4. Required Holder Labels/Keys

### Computer Labs
Required labels:
- LAB 1
- LAB 2
- LAB 3

Recommended keys:
- lab-1
- lab-2
- lab-3

### Library
Required labels:
- Library 01
- Library 02
- Library 03
- Library 04
- Library 05
- Library 06
- Library 07
- Library 08

Recommended keys:
- library-01 to library-08

### Seminar Hall
Required labels:
- Seminar Hall - Ground Floor
- Seminar Hall - 3rd Floor

Recommended keys:
- seminar-hall-ground-floor
- seminar-hall-3rd-floor

### Classroom
Required labels:
- Classroom 01
- Classroom 02
- Classroom 03
- Classroom 04

Recommended keys:
- classroom-01 to classroom-04

### Gymkhana
Required labels:
- Gymkhana 01
- Gymkhana 02
- Gymkhana 03
- Gymkhana 04
- Gymkhana 05
- Gymkhana 06

Recommended keys:
- gymkhana-01 to gymkhana-06

## 5. Layout Limits
- Computer lab images: max 3
- Library images: max 8
- Seminar hall images: max 2
- Classroom images: max 4
- Gymkhana images: max 6
- Label safe length: 25 to 35 chars depending on section

## 6. Backend Notes
- Frontend matches by normalized label/key, but exact labels are safest.
- Prefer imageUrl field.
- Keep stable ids for each holder.

## 7. Suggested API Points (CRUD)

### Public Read
- GET /api/mms/facilities
- GET /api/mms/facilities/images

### Admin Write (recommended)
- PATCH /api/admin/mms/facilities
  - Update facilities section metadata/text
- POST /api/admin/mms/facilities/images
- PATCH /api/admin/mms/facilities/images/:id
- DELETE /api/admin/mms/facilities/images/:id

Minimal image payload:

```json
{
  "label": "Library 01",
  "key": "library-01",
  "imageUrl": "https://cdn.example.com/mms/facilities/library-01.jpg",
  "alt": "Library 01"
}
```
