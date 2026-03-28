# About Us Page - Editable Information Report (VCET Main Website)

## Backend Scope Notes (Must Follow)
- Vision and Mission are fixed institutional statements. Do not expose for routine admin editing.
- For all list-based sections, store `displayOrder` (integer, unique within section).
- For all records, keep `isActive` (boolean) and `updatedAt` (datetime) for safe publishing.
- Trim leading/trailing spaces before validation.
- Reject empty strings for required fields after trim.

### 1. Institute Overview (About VCET)
**Section Name**
- ABOUT US (VCET website main section) - Institute Overview

**Editable Content**
- Foundation and heritage paragraph (required)
- Campus and location paragraph (required)
- Academic journey paragraph (required)
- Accreditation points list (required)
- Quick facts values: Established, Campus acres, Students count, Faculty count (required)

**Character Limits**
- Each overview paragraph: 500-900 chars (max 900)
- Each accreditation point: 20-80 chars (max 80)
- Quick fact value: max 15 chars
- Quick fact label: max 20 chars

**Item Limits**
- Overview paragraphs: exactly 3
- Accreditation points: 4-6 (max 6)
- Quick facts: exactly 4

**Reason**
Keeps content readable and balanced in the layout and prevents long text overflow.

---

### 2. President's Desk
**Section Name**
- ABOUT US (VCET website main section) - President's Desk

**Editable Content**
- Name (required)
- Designation and organization line (required)
- Message paragraphs list (required)
- Highlight quote (required)
- Closing quote (required)
- Profile image URL/path (required)

**Character Limits**
- Name: max 50 chars
- Designation and organization line: max 90 chars
- Each message paragraph: 350-850 chars (max 850)
- Highlight quote: 100-220 chars (max 220)
- Closing quote: 160-380 chars (max 380)
- Image URL/path: max 220 chars

**Item Limits**
- Message paragraphs: 3-4 (max 4)
- Highlight quote: exactly 1
- Closing quote: exactly 1
- Profile image: exactly 1

**Reason**
Prevents oversized text blocks and keeps profile + message alignment stable.

---

### 3. Principal's Desk
**Section Name**
- ABOUT US (VCET website main section) - Principal's Desk

**Editable Content**
- Name (required)
- Role line (required)
- Message paragraphs list (required)
- Highlight quote (required)
- Closing quote (required)
- Profile details: qualification, experience, affiliation (required)
- Highlights strip cards: value and label (required)
- Profile image URL/path (required)

**Character Limits**
- Name: max 50 chars
- Role line: max 80 chars
- Each message paragraph: 400-950 chars (max 950)
- Highlight quote: 120-260 chars (max 260)
- Closing quote: 180-420 chars (max 420)
- Qualification value: max 20 chars
- Experience value: max 20 chars
- Affiliation text: max 80 chars
- Highlight value: max 25 chars
- Highlight label: max 35 chars
- Image URL/path: max 220 chars

**Item Limits**
- Message paragraphs: 4-5 (max 5)
- Profile detail blocks: exactly 3
- Highlight cards: exactly 4
- Profile image: exactly 1

**Reason**
Maintains consistent card heights and avoids wrapping issues on mobile/desktop.

---

### 4. Governing Council
**Section Name**
- ABOUT US (VCET website main section) - Governing Council

**Editable Content**
- Chairman record: role, name, description (required)
- Member records: role, name, description (required)

**Character Limits**
- Role: max 25 chars
- Name: max 70 chars
- Description: max 90 chars

**Item Limits**
- Chairman entries: exactly 1
- Council members: 8-15 (max 15)

**Reason**
Preserves readability in member rows and prevents tight text wrapping.

---

### 5. Organizational Structure
**Section Name**
- ABOUT US (VCET website main section) - Organizational Structure

**Editable Content**
- Hierarchy nodes: name, title, parent reference, displayOrder (required)
- Organizational chart image URL/path (required)
- Intro text (optional)

**Character Limits**
- Node name: max 50 chars
- Node title: max 60 chars
- Intro text: 80-220 chars (max 220)
- Image URL/path: max 220 chars

**Item Limits**
- Hierarchy levels: 4-6 (max 6)
- Nodes per level: 1-8 (max 8)
- Chart image: exactly 1

**Reason**
Prevents hierarchy clutter and keeps relationship mapping manageable for backend and UI.

---

### 6. Administration
**Section Name**
- ABOUT US (VCET website main section) - Administration

**Editable Content**
- Administrator name (required)
- Role/designation (required)
- Official email (required)
- Profile image URL/path (required)

**Character Limits**
- Name: max 50 chars
- Role/designation: max 40 chars
- Email: max 80 chars
- Image URL/path: max 220 chars

**Item Limits**
- Administrator cards: 2-4 (max 4)

**Reason**
Maintains a clean grid and avoids overcrowding with too many cards.

---

### 7. Strategic Plan (PDF-Based)
**Section Name**
- ABOUT US (VCET website main section) - Strategic Plan

**Editable Content**
- Document label (required)
- Academic year/range (required)
- PDF file (main document content - edited separately and replaced)
- PDF URL/link (required)

**Character Limits**
- Document label: max 60 chars
- Year/range: max 20 chars
- PDF URL/link: max 220 chars

**Item Limits**
- Strategic plan documents: 5-8 (max 8)

**Reason**
Keeps yearly documents uniform and easy to maintain in admin and backend records.

---

### 8. Code of Conduct
**Section Name**
- ABOUT US (VCET website main section) - Code of Conduct

**Editable Content**
- Conduct section title (required)
- Conduct section short description (required)
- Rule title (required)
- Rule description text (required)

**Character Limits**
- Section title: max 45 chars
- Section short description: 80-180 chars (max 180)
- Rule title: max 35 chars
- Rule description: 140-360 chars (max 360)

**Item Limits**
- Conduct sections: exactly 3
- Rules per section: 2-6 (max 6)

**Reason**
Keeps policy text scannable and consistent across sections.
