# Admin Panel and Homepage QA Verification Log

## Purpose
This file is the single running QA log for Admin Panel and Homepage verification.
After every admin-panel test cycle, add one new entry under Test Cycle Log and update the Working Status Matrix.

## Scope
- Admin Panel functional verification
- Homepage user-facing verification
- MMS Enquiry form submission flow
- MMS Enquiries visibility in Admin panel

## Environment Baseline
- Frontend repo: vcet.edu.in
- Frontend local URL: http://localhost:3000
- Backend local URL: http://127.0.0.1:8000
- Verification mode: Manual functional QA

## How to Update This File After Every Test
1. Add a new section under Test Cycle Log with date and tester name.
2. List each tested page/section and result.
3. Update Working Status Matrix (Working / Partial / Blocked).
4. Add open issues under Current Open Issues.

## Working Status Matrix
| Area | Section | Current Status | Last Verified On | Notes |
|---|---|---|---|---|
| Homepage | MMS Enquiry popup opens and validates fields | Working | 2026-04-15 | Form opens, required fields enforced |
| Homepage | MMS Enquiry submit to backend | Working | 2026-04-15 | Live POST returns 201 after DB migration |
| Homepage | Enquiry bot protection parity (main + MMS) | Working | 2026-04-15 | Honeypot + minimum fill-time checks enabled on shared enquiries API |
| Admin Panel | General Enquiries page | Working | 2026-04-15 | Loads records from /api/enquiries |
| Admin Panel | General Enquiries read/unread toggle | Working | 2026-04-15 | Mark as Read/Unread action updates status instantly |
| Admin Panel | General Enquiries delete action | Working | 2026-04-15 | Test enquiries can be deleted from list |
| Admin Panel | MMS Enquiries dedicated page | Working | 2026-04-15 | Loads MMS segment records |
| Admin Panel | MMS Enquiries read/unread toggle | Working | 2026-04-15 | Read and Unread filter now functional via status update action |
| Admin Panel | MMS Enquiries delete action | Working | 2026-04-15 | MMS test enquiries can be deleted from cards |
| Admin Panel | MMS Enquiries Excel export | Working | 2026-04-15 | XLSX file download available |
| Admin Panel | MMS Enquiries PDF export | Working | 2026-04-15 | PDF file download available |
| Admin Panel | MMS Home content editor | Working | 2026-04-15 | Save and reload verified |

## Test Cycle Log

### Cycle 001 - 2026-04-15
Tester: Sunanda

#### Verified Working
- Admin panel and homepage baseline verified.
- Homepage MMS enquiry form is opening and submit path is functional.
- Backend migration for enquiry source/message fields is applied.
- Admin MMS Enquiries page is accessible and showing MMS-segment data.
- Export options for Excel and PDF are available from MMS Enquiries page.

#### Technical Verification Notes
- Issue observed earlier: enquiry submit failure due to missing DB columns.
- Root cause: admission_enquiries table missing source and message columns.
- Fix applied: migration 2026_04_15_120000_add_message_and_source_to_admission_enquiries_table.
- Post-fix check: live POST /api/enquiries returned 201.

#### Result
- Overall status: Working

### Cycle 002 - 2026-04-15
Tester: Shubham pawar

#### Verified Working
- Shared enquiry bot-protection implemented for both homepage and MMS enquiry submissions.
- Frontend now sends anti-bot fields (`website`, `form_started_at`) for homepage and MMS forms.
- Backend validates honeypot and rejects too-fast submissions.
- MMS enquiry flow remains functional after protection changes.

#### Technical Verification Notes
- Laravel test suite executed: `php artisan test tests/Feature/AdmissionEnquiryTest.php`.
- Result: 17 tests passed, including new anti-bot tests.
- Frontend build executed: `npm run build` in `vcet.edu.in`.
- Result: build succeeded; only existing chunk-size warnings reported by Vite.

#### Result
- Overall status: Working

### Cycle 003 - 2026-04-15
Tester: Shubham pawar

#### Verified Working
- Admin can mark enquiries as Read and Unread from General Enquiries list.
- Admin can mark MMS enquiries as Read and Unread from MMS Enquiries list.
- Read/Unread filter controls now show correct segmented records in both enquiry pages.
- Backend enquiry create flow ignores anti-bot helper fields (`website`, `form_started_at`) during persistence.

#### Technical Verification Notes
- Backend route added: `PATCH /api/enquiries/{admissionEnquiry}/read-status`.
- Laravel test suite executed: `php artisan test tests/Feature/AdmissionEnquiryTest.php`.
- Result: 18 tests passed.
- Frontend build executed: `npm run build` in `vcet.edu.in`.
- Result: build succeeded; existing chunk-size warnings remain unchanged.

#### Result
- Overall status: Working

### Cycle 004 - 2026-04-15
Tester: Shubham pawar

#### Verified Working
- Delete button added in General Enquiries list to remove test entries directly.
- Delete button added in MMS Enquiries cards to remove test MMS submissions.
- Backend enquiry delete API works with admin authentication.

#### Technical Verification Notes
- Backend route added: `DELETE /api/enquiries/{admissionEnquiry}`.
- Laravel test suite executed: `php artisan test tests/Feature/AdmissionEnquiryTest.php`.
- Result: 19 tests passed.
- Frontend build executed: `npm run build` in `vcet.edu.in`.
- Result: build succeeded; existing chunk-size warnings remain unchanged.

#### Result
- Overall status: Working

## Current Open Issues
- None for this scope as of 2026-04-15.

## Template for Next Test Cycle
Copy this block and fill values:

### Cycle XXX - YYYY-MM-DD
Tester: <name>

#### Verified Working
- <item>
- <item>

#### Not Working / Regressions
- <item>

#### Technical Notes
- <api response, logs, screenshots, errors>

#### Result
- Overall status: Working / Partial / Blocked
