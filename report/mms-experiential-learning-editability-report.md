# MMS Experiential Learning - Backend API Handoff Report

## 1. Purpose
Backend API points and exact image-holder mapping for all MMS Experiential Learning pages.

## 2. Frontend Sources
- pages/mms/experiential-learning/MMSExperientialRolePlay.tsx
- pages/mms/experiential-learning/MMSExperientialGroupDiscussion.tsx
- pages/mms/experiential-learning/MMSExperientialEntrepreneurialDrive.tsx
- pages/mms/experiential-learning/MMSExperientialFinancialLiteracy.tsx
- pages/mms/experiential-learning/MMSExperientialNesco.tsx
- pages/mms/experiential-learning/MMSExperientialModelMaking.tsx
- pages/mms/experiential-learning/ExperientialLearningShared.tsx

## 3. Endpoint Plan

### Experiential Main Endpoint
- Method: GET
- Path: /api/mms/experiential-learning

### Experiential Images Endpoint
- Method: GET
- Path: /api/mms/experiential-learning/images

Recommended response shape:

```json
{
  "items": [
    {
      "id": "exp-1",
      "key": "role-play-session-01",
      "label": "Role Play Session 01",
      "imageUrl": "https://...",
      "alt": "Role Play Session 01"
    }
  ]
}
```

## 4. Required Holder Labels/Keys

### Role Play
- Role Play Session 01
- Role Play Session 02

### Group Discussion
- Group Discussion 01
- Group Discussion 02

### Entrepreneurial Drive
- Entrepreneurial Activity 01
- Entrepreneurial Activity 02

### Financial Literacy Program
- Financial Literacy Program 01
- Financial Literacy Program 02

### NESCO Bombay Exhibition Centre
- NESCO Visit 01
- NESCO Visit 02

### 3D Model Making
- 3D Model Presentation 01
- 3D Model Presentation 02
- 3D Model Presentation 03
- 3D Model Presentation 04

Recommended key format:
- Use slug version of label (lowercase, hyphen separated)
- Example: role-play-session-01

## 5. Layout Limits
- Most sections: max 2 images
- 3D Model Making: max 4 images
- Label safe range: 35 to 40 chars

## 6. Backend Notes
- imageUrl is preferred field for frontend compatibility.
- Use stable ids per holder entry.
- Optional image_url can be included, but imageUrl is recommended.

## 7. Suggested API Points (CRUD)

### Public Read
- GET /api/mms/experiential-learning
- GET /api/mms/experiential-learning/images

### Admin Write (recommended)
- PATCH /api/admin/mms/experiential-learning
  - Update section text/metadata
- POST /api/admin/mms/experiential-learning/images
- PATCH /api/admin/mms/experiential-learning/images/:id
- DELETE /api/admin/mms/experiential-learning/images/:id

Minimal image payload:

```json
{
  "label": "Role Play Session 01",
  "key": "role-play-session-01",
  "imageUrl": "https://cdn.example.com/mms/experiential/role-play-01.jpg",
  "alt": "Role Play Session 01"
}
```
