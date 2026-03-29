# MMS About Section - Backend API Handoff Report

## 1. Purpose
This file defines API points and exact key/label contract for all About-section image holders so backend can wire data quickly.

## 2. Frontend Sources
- pages/mms/about/MMSAbout.tsx
- pages/mms/about/MMSPrincipalsDesk.tsx
- pages/mms/about/MMSHODsDesk.tsx
- pages/mms/about/MMSFaculty.tsx
- hooks/mms/useMmsImageHolder.ts

## 3. Endpoint Plan

### About Content
- Method: GET
- Path: /api/mms/about
- Purpose: Main About data (intro text, metadata, optional structured content)

### About Images
- Method: GET
- Path: /api/mms/about/images
- Purpose: Serve image holders used by About, Principal, and HOD pages

Recommended response shape:

```json
{
  "items": [
    {
      "id": "about-1",
      "key": "mms-about-visual-img4-jpeg",
      "label": "MMS About Visual (img4.jpeg)",
      "imageUrl": "https://...",
      "alt": "MMS About Visual"
    },
    {
      "id": "principal-photo",
      "key": "principal-photo",
      "label": "Principal Photo",
      "imageUrl": "https://...",
      "alt": "Principal Photo"
    },
    {
      "id": "hod-photo",
      "key": "hod-photo",
      "label": "HOD Photo",
      "imageUrl": "https://...",
      "alt": "HOD Photo"
    }
  ]
}
```

## 4. Exact Label/Key Matching Rules (Important)
Frontend hook matches by normalized label or key.

Required labels to support:
- MMS About Visual (img4.jpeg)
- Principal Photo
- HOD Photo

Recommended keys:
- mms-about-visual-img4-jpeg
- principal-photo
- hod-photo

## 5. Faculty Section Note
- Current faculty card UI uses initials avatar, not photo rendering.
- Endpoint available for faculty data: /api/mms/about/faculty
- If backend sends image fields now, keep them as imageUrl for future use.

Recommended faculty item shape:

```json
{
  "id": "f1",
  "name": "Dr. ...",
  "designation": "Assistant Professor",
  "email": "name@vcet.edu.in",
  "imageUrl": "https://..."
}
```

## 6. Editable Limits (Frontend Safe)
- About description text: 500 to 1200 chars
- Principal message: 800 to 1500 chars
- HOD message: 800 to 1500 chars
- Faculty name: max 40 chars
- Faculty designation: max 60 chars
- DAB Name: max 40 chars
- DAB Designation: max 60 chars
- DAB Organization: max 70 chars
- DAB Role: max 30 chars

## 7. Implementation Notes for Backend
- Return imageUrl for easiest compatibility.
- Stable ids are recommended for audit and admin editing.
- For storage paths, return full URL or resolvable path from domain origin.

## 8. Suggested API Points (CRUD)

### Public Read
- GET /api/mms/about
- GET /api/mms/about/images
- GET /api/mms/about/faculty

### Admin Write (recommended)
- PATCH /api/admin/mms/about
  - Update intro content
- PATCH /api/admin/mms/about/principals-desk
  - Update principal message block
- PATCH /api/admin/mms/about/hods-desk
  - Update HOD message block
- POST /api/admin/mms/about/images
- PATCH /api/admin/mms/about/images/:id
- DELETE /api/admin/mms/about/images/:id
- POST /api/admin/mms/about/faculty
- PATCH /api/admin/mms/about/faculty/:id
- DELETE /api/admin/mms/about/faculty/:id

Minimal image payload:

```json
{
  "label": "Principal Photo",
  "key": "principal-photo",
  "imageUrl": "https://cdn.example.com/mms/principal.jpg",
  "alt": "Principal Photo"
}
```
