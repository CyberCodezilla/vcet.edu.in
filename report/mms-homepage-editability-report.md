# MMS Subwebsite Homepage - Editability Report

- Section Name: MMS Subwebsite Homepage

## Hero Slider
- Editable Content: slide title, slide subtitle, hero image, image alt text
- Character Limits: title (max 65), subtitle (max 140), alt text (max 90)
- Item Limits: 7 slides (min 3, max 7)
- Reason: keeps slider readable and prevents visual overload
- Image Holder Check: Correctly placed; image is fluid (`w-full`, `h-auto`)
- Image Uploading Section: Required (multiple image upload with per-slide replace)

## Admission Highlight
- Editable Content: heading, description, admission banner image
- Character Limits: heading (max 60), description (max 220)
- Item Limits: 1 admission block
- Reason: single focused admission message works best for quick scanning
- Image Holder Check: Correctly placed; image is fluid (`w-full`, `h-auto`)
- Image Uploading Section: Required (single banner upload/replace)

## Notice Board
- Editable Content: notice title, notice label, notice text
- Character Limits: title (max 35), label (max 20), text (max 120)
- Item Limits: 3 notices
- Reason: compact notice cards stay readable on mobile and desktop

## Latest Notifications
- Editable Content: section title, notification text
- Character Limits: title (max 35), notification text (max 110)
- Item Limits: 3 notifications
- Reason: short updates improve usability and reduce clutter

## Summer Internships
- Editable Content: section title, internship logo/image, image alt text
- Character Limits: title (max 40), alt text (max 80)
- Item Limits: 3 internship items
- Reason: fixed card grid preserves alignment and visual balance
- Image Holder Check: Correctly placed; fluid width with controlled height (`w-full`, `object-contain`, `max-h-20`)
- Image Uploading Section: Required (3 logo/image upload slots)

## Events
- Editable Content: section title, event card title, event image, image alt text
- Character Limits: section title (max 40), card title (max 55), alt text (max 80)
- Item Limits: 3 event cards
- Reason: equal card count maintains clean layout and consistent spacing
- Image Holder Check: Correctly placed; image is fluid (`w-full`, `h-auto`)
- Image Uploading Section: Required (3 event image upload slots)

## Testimonials
- Editable Content: section title, student name, role, testimonial quote
- Character Limits: section title (max 40), name (max 35), role (max 30), quote (max 320)
- Item Limits: 3 testimonials
- Reason: fixed testimonial count keeps section concise and balanced

## Experiential Learning Videos
- Editable Content: section title, video title, video poster image, video link/file URL
- Character Limits: section title (max 45), video title (max 55), poster alt text (max 90), video URL (max 250)
- Item Limits: 3 video cards
- Reason: uniform cards improve readability and avoid uneven page height
- Image Holder Check: Correctly placed; video holder is fluid (`w-full`, `h-auto`) and supports poster fallback
- Image Uploading Section: Required (3 poster upload slots)
- Video Uploading/Attachment Section: Required (3 video file/link slots)

## PDF / Documents
- Editable Content: document label, document link (URL)
- Character Limits: label (max 55), URL (max 250)
- Item Limits: 2 PDF items
- Reason: limited document links reduce confusion and keep actions clear
- PDF file (main document content - edited separately and replaced)
- PDF uploading section

## Frontend Setup Done For Backend Video Fetch
- Implemented In File: pages/mms/MMSHome.tsx
- Setup Details:
	- Added backend-ready video source resolver with support for keys: `videoUrl`, `videoFileUrl`, `fileUrl`, `url`
	- If backend sends any one of above keys with a valid value, card now renders HTML `<video>` player in the holder
	- If video file/link is not available, card falls back to poster image (`poster`) and then to empty holder
	- Video player is responsive/fluid (`w-full`, `h-auto`) for different video dimensions
	- Added `controls`, `preload="metadata"`, and `playsInline` for practical web playback

- Placeholder Data Prepared In File: pages/mms/mmsHomeContent.ts
- Setup Details:
	- Added `videoUrl` field in all experiential video card items so backend mapping is straightforward

- Backend Integration Note (for teammate):
	- Backend can attach/upload video file and return public file URL in any supported key (`videoUrl` recommended)
	- Frontend will automatically fetch and show playable video in card holder without further UI change
