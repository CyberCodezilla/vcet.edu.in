# Research Page Editability Report (Rechecked Strictly)

## Scope Rule Used

- Kept only fields with practical future maintenance value.
- Removed low/no-scope fields (non-routed sections, auto-calculated values, and one-off static display numbers).
- Limits are strict single values (no ranges).
- Limits are based on current block widths, table columns, chart slot counts, and image-holder grids.

---

## Research Introduction (`/research`)

- Editable content to keep:
  - R&D hub card title and description
  - Objectives list items
  - PhD datasets (department, count)
  - Dean card (name, designation, research interest)
  - Quick links (label, URL)
- Strict character limits:
  - Hub card title: 32 max
  - Hub card description: 150 max
  - Objective item text: 150 max
  - Department name: 36 max
  - Dean name: 40 max
  - Dean designation: 60 max
  - Dean research interest: 140 max
  - Quick-link label: 26 max
- Strict item limits:
  - Hub cards: exactly 4
  - Objectives: 6 max
  - PhD pursuing rows: 10 max
  - PhD holders rows: 10 max
  - Quick links: exactly 6
  - Dean cards: exactly 1

---

## Funded Research (`/funded-research`)

- Editable content to keep:
  - Funding rows (year, amount)
  - Funding report PDF link
  - PDF Uploading Section (for vcet.edu.in hosted report PDF)
- Strict character limits:
  - Year label: 9 max
  - Amount: numeric, 6 chars max including decimal point
- Strict item limits:
  - Funding year rows: 10 max
  - Funding PDF links: exactly 1

---

## Publications (`/publications`)

- Editable content to keep:
  - Books by year (year, count)
  - Journal/Conference by year (year, journal count, conference count)
  - Publication PDF links (books, conference, journal)
  - PDF Uploading Section (for vcet.edu.in hosted publication PDFs)
- Strict character limits:
  - Books year label: 9 max
  - Books count: integer, 3 digits max
  - Papers year label: 4 max
  - Journal/Conference count: integer, 3 digits max
  - PDF card title: 50 max
- Strict item limits:
  - Books rows: 8 max
  - Journal/Conference rows: 6 max
  - Publication PDF links: exactly 3

---

## Patents (`/patents`)

- Editable content to keep:
  - Patent table rows: sr, faculty, department, title, office, year, application no, status
- Strict character limits:
  - Faculty name(s): 90 max
  - Department: 60 max
  - Patent title: 120 max
  - Office: 45 max
  - Year: exactly 4
  - Application no: 30 max
  - Status: 40 max
- Strict item limits:
  - Patent records: 20 max
  - Year filter values: 6 max

---

## Consultancy Projects (`/consultancy-projects`)

- Editable content to keep:
  - Revenue rows (year, value, note)
  - Consultancy PDF link
  - Partner details (name, tagline, description, tags, image)
  - PDF Uploading Section (for vcet.edu.in hosted consultancy PDF)
- Strict character limits:
  - Revenue year label: 7 max
  - Revenue value: numeric, 5 chars max including decimal point
  - Revenue note: 6 max (allowed: `Peak`, `Lowest`, blank)
  - Partner name: 42 max
  - Partner tagline: 70 max
  - Partner description: 180 max
  - Partner tag text: 20 max
- Strict item limits:
  - Revenue rows: 10 max
  - Partner images: 9 max
  - Tags per partner: 3 max
  - Consultancy PDF links: exactly 1
  - Images per partner entry: exactly 1 (aspect ratio 16:9)

---

## Research Facility (`/research-facility`)

- Editable content to keep:
  - Facility image entries (primary visible editable asset)
- Strict character limits:
  - Not applicable for front-end visible text (title/description are not displayed in card body)
- Strict item limits:
  - Facility images: 6 max
  - Images per facility entry: exactly 1
  - Recommended image ratio: 16:10

---

## IIC (`/iic`)

- Editable content to keep:
  - Achievement images
  - Gallery holders
  - Committee table rows
  - Report PDF links
  - PDF Uploading Section (for vcet.edu.in hosted IIC report PDFs)
- Strict character limits:
  - Achievement title: 40 max
  - Gallery label: 24 max
  - Committee left column text: 100 max
  - Committee right column text: 220 max
  - Report button label (year/title): 20 max
- Strict item limits:
  - Achievement images: 4 max
  - Gallery holders: 12 max
  - Staff committee rows: 12 max
  - Expert rows: 8 max
  - Support staff rows: 6 max
  - Student representation rows: 12 max
  - Report PDF links: 4 max

---

## NIRF (`/nirf`)

- Editable content to keep:
  - NIRF PDF cards (title, year, note, URL)
  - PDF Uploading Section (for vcet.edu.in hosted NIRF PDFs)
- Strict character limits:
  - Card title: 70 max
  - Year: exactly 4
  - Card note: 45 max
- Strict item limits:
  - NIRF PDF cards: 6 max

---

## Research Downloads (`/downloads`, `/research-downloads`)

- Editable content to keep:
  - Top document buttons (label + URL)
  - Journal/resource link list items (label + URL)
- Strict character limits:
  - Top document button label: 60 max
  - Link item label: 70 max
- Strict item limits:
  - Top document buttons: 4 max
  - Resource links total: 12 max
  - Resource links per column: 6 max

---

## Removed Sections (No/Very Low Scope)

- Research Conventions (`/research-conventions`) removed from report scope.
- Research Policy (`/research-policy`) removed from report scope.
- Reason: these routes are not currently present in active front-end routing, so practical editability scope is not reliable.
