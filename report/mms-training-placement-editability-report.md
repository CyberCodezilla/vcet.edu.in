# MMS Training and Placement - Backend API Handoff Report

## 1. Purpose
Backend API points and exact image/data contract for MMS Training and Placement pages so implementation can be done without frontend guesswork.

## 2. Frontend Sources
- Training pages:
  - pages/mms/training-placement/MMSTraining.tsx
  - pages/mms/training-placement/MMSTrainingEvents.tsx
  - pages/mms/training-placement/MMSTrainingCareerGuidance.tsx
  - pages/mms/training-placement/MMSTrainingInternship.tsx
  - pages/mms/training-placement/MMSTrainingGallery.tsx
- Placement pages:
  - pages/mms/training-placement/MMSPlacement.tsx
  - pages/mms/training-placement/MMSPlacementSoftSkillTraining.tsx
  - pages/mms/training-placement/MMSPlacementPsycometricTest.tsx
  - pages/mms/training-placement/MMSPlacementCell.tsx
  - pages/mms/training-placement/MMSPlacementGallery.tsx
  - pages/mms/training-placement/MMSPlacementRecruiters.tsx
  - pages/mms/training-placement/MMSPlacementStudentsPlacements.tsx
- Shared holders:
  - pages/mms/training-placement/MMSPlacementShared.tsx

## 3. Endpoint Plan

### A) Training Content Endpoint
- Method: GET
- Path: /api/mms/training-placement/training
- Purpose: training text blocks, tables, lists

### B) Training Images Endpoint
- Method: GET
- Path: /api/mms/training-placement/training/images
- Purpose: training image holders (events/career/galleries)

### C) Placement Content Endpoint
- Method: GET
- Path: /api/mms/training-placement/placement
- Purpose: placement objectives, placement cell text, table rows

### D) Placement Images Endpoint
- Method: GET
- Path: /api/mms/training-placement/placement/images
- Purpose: placement image holders (soft skill, psychometric, cell photos, galleries, recruiters)

Recommended image endpoint response shape:

```json
{
  "items": [
    {
      "id": "pl-1",
      "key": "soft-skill-session-01",
      "label": "Soft Skill Session 01",
      "imageUrl": "https://...",
      "alt": "Soft Skill Session 01"
    }
  ]
}
```

## 4. Required Image Holder Labels/Keys

### Training Events
Current UI uses inline holders in event rows.
Recommended labels:
- Training Event 01
- Training Event 02
- Training Event 03

Recommended keys:
- training-event-01
- training-event-02
- training-event-03

### Career Guidance (Resource Person Images)
Recommended labels:
- Career Guidance 01
- Career Guidance 02
- Career Guidance 03
- Career Guidance 04
- Career Guidance 05
- Career Guidance 06
- Career Guidance 07
- Career Guidance 08

Recommended keys:
- career-guidance-01 to career-guidance-08

### Training Gallery
Required labels:
- Training Gallery 01
- Training Gallery 02
- Training Gallery 03
- Training Gallery 04

### Placement Cell
Required labels:
- Placement Cell Member 1
- Placement Cell Member 2

### Soft Skill Training
Required labels:
- Soft Skill Session 01
- Soft Skill Session 02

### Psychometric Test
Required labels:
- Psycometric Test 01
- Psycometric Test 02

### Placement Gallery
Required labels:
- Placement Gallery 01
- Placement Gallery 02
- Placement Gallery 03
- Placement Gallery 04
- Placement Gallery 05
- Placement Gallery 06
- Placement Gallery 07
- Placement Gallery 08

### Recruiters
Required label:
- Our Recruiters Banner

## 5. Optional Structured Content Payloads

### Training Event row shape
```json
{
  "id": "te-1",
  "srNo": 1,
  "eventName": "AMCAT Test",
  "resourcePersonDetails": "...",
  "dateText": "Since 2019",
  "imageLabel": "Training Event 01"
}
```

### Placement Cell member shape
```json
{
  "id": "pc-1",
  "name": "Mr. ...",
  "role": "Placement Manager",
  "email": "placements@vcet.edu.in",
  "phone": "...",
  "extension": "...",
  "imageLabel": "Placement Cell Member 1"
}
```

### Student placement row shape
```json
{
  "id": "sp-1",
  "srNo": 1,
  "studentName": "...",
  "specialization": "HR",
  "company": "...",
  "imageUrl": "https://..."
}
```

## 6. Frontend Layout Limits
- Training points: max 5
- Training event rows: max 3
- Career guidance points: max 4
- Career guidance rows: max 8
- Internship procedure steps: max 5
- Training gallery images: max 4
- Placement objective points: max 7
- Placement cell members: max 2
- Soft skill images: max 2
- Psychometric images: max 2
- Student placement rows: max 6
- Recruiters banner images: max 1
- Placement gallery images: max 8

## 7. Backend Notes
- Prefer imageUrl field for direct compatibility.
- Keep labels stable because frontend holder lookup uses normalized label/key matching.
- Use stable ids for all list/table items for deterministic updates.
- For training/events and career tables, backend can gradually shift from static rows to API rows while preserving current UI layout.

## 8. Suggested API Points (CRUD)

### Public Read
- GET /api/mms/training-placement/training
- GET /api/mms/training-placement/training/images
- GET /api/mms/training-placement/placement
- GET /api/mms/training-placement/placement/images

### Admin Write (recommended)
- PATCH /api/admin/mms/training-placement/training
- PATCH /api/admin/mms/training-placement/placement
- POST /api/admin/mms/training-placement/training/images
- PATCH /api/admin/mms/training-placement/training/images/:id
- DELETE /api/admin/mms/training-placement/training/images/:id
- POST /api/admin/mms/training-placement/placement/images
- PATCH /api/admin/mms/training-placement/placement/images/:id
- DELETE /api/admin/mms/training-placement/placement/images/:id

### Optional table/list CRUD (if admin needs row-level editing)
- POST /api/admin/mms/training-placement/training/events
- PATCH /api/admin/mms/training-placement/training/events/:id
- DELETE /api/admin/mms/training-placement/training/events/:id
- POST /api/admin/mms/training-placement/training/career-guidance/events
- PATCH /api/admin/mms/training-placement/training/career-guidance/events/:id
- DELETE /api/admin/mms/training-placement/training/career-guidance/events/:id
- POST /api/admin/mms/training-placement/placement/students
- PATCH /api/admin/mms/training-placement/placement/students/:id
- DELETE /api/admin/mms/training-placement/placement/students/:id

Minimal image payload:

```json
{
  "label": "Placement Gallery 01",
  "key": "placement-gallery-01",
  "imageUrl": "https://cdn.example.com/mms/placement/gallery-01.jpg",
  "alt": "Placement Gallery 01"
}
```
