# VCET MMS Website — File Structure (Mapped into Main Repo)

> Department: Master of Management Studies (MBA) — Approved by AICTE, DTE Maharashtra | Affiliated to University of Mumbai | NAAC Accredited
>
> The MMS site lives **inside the main VCET repo** at `pages/mms/` and `components/mms/`.
> It is reached from the main site via **Header nav → Departments dropdown → MMS**.
> All MMS routes are prefixed `/mms/*`.

---

## How MMS fits in the Repo

The main VCET website (`vcet.edu.in/`) is built in React + TypeScript. The MMS mini-site is **not a separate project** — it is a set of pages and components inside the same repo, linked from the main navigation. The sections below show the full repo tree with the MMS sections called out with a ★.

---

## Full Repo Tree (MMS highlighted)

```
vcet.edu.in/
│
├── App.tsx                     # Root router — add /mms/* routes here
├── index.tsx
├── index.html
├── types.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
│
│
├── components/
│   ├── TopBanner.tsx           # Includes nav dropdown: Departments > MMS
│   ├── Header.tsx              # Main nav — Departments dropdown links to /mms
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Departments.tsx         # MMS card shown here → links to /mms
│   ├── Placements.tsx
│   ├── Recruiters.tsx
│   ├── Achievements.tsx
│   ├── ExploreUs.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── Facilities.tsx
│   ├── Naac.tsx
│   ├── Footer.tsx
│   ├── PageLayout.tsx
│   ├── PageBanner.tsx
│   ├── SectionHeader.tsx
│   ├── Button.tsx
│   ├── ScrollToTop.tsx
│   ├── SplashScreen.tsx
│   ├── DepartmentPage.tsx
│   ├── Admissions.tsx
│   │
│   └── mms/                   # ★★★ MMS-SPECIFIC SHARED COMPONENTS ★★★
│       ├── MMSLayout.tsx       # Wrapper for all MMS pages (MMS header + footer)
│       ├── MMSHeader.tsx       # MMS internal nav bar with own menu & dropdowns
│       ├── MMSHero.tsx         # MMS hero image carousel
│       └── MMSEnquirePopup.tsx # Global "Enquire Now" floating button + modal
│
│
├── pages/
│   ├── about/
│   │   ├── AboutVCET.tsx
│   │   ├── PresidentsDesk.tsx
│   │   ├── PrincipalsDesk.tsx
│   │   ├── GoverningCouncil.tsx
│   │   ├── OrganizationalStructure.tsx
│   │   ├── Administration.tsx
│   │   ├── StrategicPlan.tsx
│   │   └── CodeOfConduct.tsx
│   │
│   ├── admissions/
│   │   ├── CoursesIntake.tsx
│   │   ├── FeesStructure.tsx
│   │   ├── Scholarships.tsx
│   │   ├── Brochure.tsx
│   │   ├── DocumentsRequired.tsx
│   │   └── CutOff.tsx
│   │
│   ├── departments/
│   │   ├── DeptComputerEngg.tsx
│   │   ├── DeptCSDS.tsx
│   │   ├── DeptIT.tsx
│   │   ├── DeptAIDS.tsx
│   │   ├── DeptMech.tsx
│   │   ├── DeptENTC.tsx
│   │   ├── DeptCivil.tsx
│   │   └── DeptFE.tsx
│   │
│   ├── academics/
│   │   ├── DeanAcademics.tsx
│   │   ├── AcademicCalendar.tsx
│   │   ├── TeachingLearning.tsx
│   │   ├── SwayamNPTEL.tsx
│   │   ├── HonoursMinor.tsx
│   │   ├── ExamCell.tsx
│   │   └── Downloads.tsx
│   │
│   ├── research/
│   │   ├── ResearchIntro.tsx
│   │   ├── FundedResearch.tsx
│   │   ├── Publications.tsx
│   │   ├── ConsultancyProjects.tsx
│   │   ├── ResearchFacility.tsx
│   │   ├── ResearchConventions.tsx
│   │   ├── ResearchPolicy.tsx
│   │   └── NIRF.tsx
│   │
│   ├── facilities/
│   │   ├── CentralComputing.tsx
│   │   ├── Library.tsx
│   │   ├── CounselingCell.tsx
│   │   ├── LadiesCommonRoom.tsx
│   │   ├── SportsGymkhana.tsx
│   │   ├── HealthFacilities.tsx
│   │   └── DifferentlyAbled.tsx
│   │
│   ├── student-life/
│   │   ├── CareerAtVCET.tsx
│   │   ├── StudentsCouncil.tsx
│   │   ├── CulturalCommittee.tsx
│   │   ├── SportsCommittee.tsx
│   │   ├── Literati.tsx
│   │   ├── NSS.tsx
│   │   ├── EBSB.tsx
│   │   ├── StudentsClub.tsx
│   │   ├── Hackathon.tsx
│   │   ├── NSDC.tsx
│   │   ├── Training.tsx
│   │   ├── ECell.tsx
│   │   ├── IIIC.tsx
│   │   └── Parents.tsx
│   │
│   ├── clubs/
│   │   ├── IEEE.tsx
│   │   ├── CSI.tsx
│   │   ├── IETE.tsx
│   │   ├── ISHRAE.tsx
│   │   ├── VMEA.tsx
│   │   ├── IGBC.tsx
│   │   └── IIC.tsx
│   │
│   ├── committees/
│   │   ├── CollegeDevelopmentCommittee.tsx
│   │   ├── IQAC.tsx
│   │   ├── GrievanceRedressal.tsx
│   │   ├── SRGCCommittee.tsx
│   │   ├── AntiRagging.tsx
│   │   ├── SCSTCommittee.tsx
│   │   ├── InternalComplaint.tsx
│   │   ├── EqualOpportunity.tsx
│   │   └── SEDGCell.tsx
│   │
│   ├── naac/
│   │   ├── NAACScore.tsx
│   │   ├── SSS.tsx
│   │   ├── SSSReport.tsx
│   │   ├── SSRCycle1.tsx
│   │   ├── SSRCycle2.tsx
│   │   └── BestPractices.tsx
│   │
│   ├── contact/
│   │   └── ContactUs.tsx
│   │
│   └── mms/                            # ★★★ MMS (MBA) MINI-SITE PAGES ★★★
│       │                               # All routes prefixed /mms/*
│       │                               # Wrapped by components/mms/MMSLayout.tsx
│       │
│       ├── MMSHome.tsx                 # /mms
│       │
│       ├── about/
│       │   ├── MMSAbout.tsx            # /mms/about
│       │   ├── MMSPrincipalsDesk.tsx   # /mms/about/principals-desk
│       │   ├── MMSHODsDesk.tsx         # /mms/about/hods-desk
│       │   ├── MMSFaculty.tsx          # /mms/about/faculty
│       │   ├── MMSVisionMission.tsx    # /mms/about/vision-mission
│       │   ├── MMSDAB.tsx              # /mms/about/dab
│       │   └── MMSProgramOutcomes.tsx  # /mms/about/program-outcomes
│       │
│       ├── admission/
│       │   └── MMSAdmission.tsx        # /mms/admission
│       │
│       ├── experiential-learning/
│       │   └── MMSExperientialLearning.tsx  # /mms/experiential-learning
│       │                                    # tabs: Information · Role Play ·
│       │                                    #       Group Discussion · Entrepreneurial Drive ·
│       │                                    #       Financial Literacy Program ·
│       │                                    #       NESCO Bombay Exhibition Centre ·
│       │                                    #       3D Model Making
│       │
│       ├── training-placement/
│       │   ├── MMSTraining.tsx         # /mms/training-placement/training
│       │   │                           # tabs: Training · Events · Career Guidance ·
│       │   │                           #       Internship · Gallery
│       │   └── MMSPlacement.tsx        # /mms/training-placement/placement
│       │
│       ├── students-life/
│       │   └── MMSStudentsLife.tsx     # /mms/students-life
│       │                               # tabs: V-Ecstatic · DLLE · Book Review ·
│       │                               #       Add-on Courses (Power BI) ·
│       │                               #       Add-on Courses (Advance Excel) ·
│       │                               #       Industry Expert Session · NSIM Training ·
│       │                               #       Oscillations · IDEATHON 1.0 · Rankers
│       │
│       ├── facilities/
│       │   └── MMSFacilities.tsx       # /mms/facilities
│       │                               # tabs: Computer Labs · Library ·
│       │                               #       Seminar Hall · Classroom · Gymkhana
│       │
│       └── faqs/
│           └── MMSFAQs.tsx             # /mms/faqs  (13 Q&A accordions)
│
│
├── services/
├── hooks/
├── context/
├── admin/
├── db/
│
├── public/
│   └── Images/
│       ├── Banner/
│       ├── gallery/
│       ├── Home background/
│       ├── LOGO/
│       ├── Packages/
│       ├── PLACEMENT/
│       ├── recriters/
│       ├── Remarkable Acheivements/
│       ├── testimonials/
│       │
│       └── mms/                        # ★★★ MMS IMAGE ASSETS ★★★
│           ├── logo/                   # VCETLOGO.png · VCET.BANNER.png
│           ├── hero/                   # gal1–gal5 · _MG_0233 · _MG_0244 · _MG_0252
│           ├── internships/            # Summer internship logos: l2 · l7 · logo1
│           ├── events/                 # e1 · e2 · e3
│           ├── about/                  # img4.jpeg
│           ├── facilities/             # cl1 · cl2 · inf5
│           └── syllabus/              # FY.pdf · SY_syllabus.pdf
│
├── Images/
├── uploads/
├── .htaccess
└── DEPLOYMENT.md
```

---

## Entry Point — Main Nav Dropdown

The MMS site is reached from the main VCET header:

```
Header.tsx (main nav)
└── Departments  (dropdown)
    ├── Computer Engineering     → /departments/computer-engg
    ├── CS & Data Science        → /departments/cs-ds
    ├── IT                       → /departments/it
    ├── AIDS                     → /departments/aids
    ├── Mechanical               → /departments/mech
    ├── ENTC                     → /departments/entc
    ├── Civil                    → /departments/civil
    ├── FE (First Year)          → /departments/fe
    └── ★ MMS (MBA)              → /mms           ← opens MMS mini-site
```

---

## MMS Internal Navigation (`MMSHeader.tsx`)

Once inside `/mms`, the user sees the MMS-specific header with its own nav:

```
MMSHeader.tsx
├── HOME                           → /mms
├── ABOUT                          → /mms/about
│   ├── About                      → /mms/about
│   ├── Principal's Desk           → /mms/about/principals-desk
│   ├── HOD's Desk                 → /mms/about/hods-desk
│   ├── Faculty                    → /mms/about/faculty
│   ├── Vision and Mission         → /mms/about/vision-mission
│   ├── Departmental Advisory Board→ /mms/about/dab
│   └── Program Outcomes (POs)     → /mms/about/program-outcomes
│
├── ADMISSION DETAILS              → /mms/admission
│
├── EXPERIENTIAL LEARNING          → /mms/experiential-learning
│   (tabs within page — not separate routes)
│
├── TRAINING & PLACEMENTS          (dropdown — no direct route)
│   ├── TRAINING                   → /mms/training-placement/training
│   └── PLACEMENT                  → /mms/training-placement/placement
│
├── STUDENT'S LIFE                 → /mms/students-life
│   (tabs within page — not separate routes)
│
├── SYLLABUS                       (dropdown — PDF downloads)
│   ├── FIRST YEAR                 → /Images/mms/syllabus/FY.pdf
│   └── SECOND YEAR                → /Images/mms/syllabus/SY_syllabus.pdf
│
├── FACILITIES                     → /mms/facilities
│   (tabs within page — not separate routes)
│
└── FAQ'S                          → /mms/faqs
```

---

## MMS Home Page Sections (`MMSHome.tsx`)

```
MMSHome.tsx  (/mms)
├── MMSLayout (wraps all MMS pages)
│   ├── MMSHeader.tsx              — MMS nav bar
│   └── [page content]
│       ├── Hero Carousel          — gal1–gal5, _MG_0233, _MG_0244, _MG_0252
│       ├── Admission CTA          — VCET.BANNER.png
│       ├── Summer Internships     — company logo carousel (l2, logo1, l7)
│       ├── Our Events             — events carousel (e1, e2, e3)
│       ├── Testimonials
│       │   ├── Vinay Mayekar  — HR student
│       │   ├── Mansi Sankhe   — Marketing student
│       │   └── Janavi Rao     — Entrepreneur
│       └── Experiential Learning Videos
│
└── MMSEnquirePopup.tsx            — floating "Enquire Now" button (all MMS pages)
```

---

## MMS Footer (inside `MMSLayout.tsx`)

```
MMS Footer
├── Address:  K.T. Marg, Vartak College Campus, Vasai Road (W), Maharashtra 401202
├── Phone:    0250-233 9486
├── Email:    mms@vcet.edu.in
├── Social:   Facebook · Instagram · YouTube · LinkedIn
├── Links:    Mumbai University · AICTE · vcet.edu.in
└── Map:      Google Maps (19.383899, 72.828726)
```

---

## Summary

| Item                              | Count |
|-----------------------------------|-------|
| MMS page components               | 14    |
| MMS shared components             | 4     |
| MMS nav items (top-level)         | 8     |
| MMS nav dropdowns                 | 2     |
| Pages with internal tab sections  | 4     |
| PDF syllabus downloads            | 2     |
| MMS image asset folders           | 7     |
| MMS FAQ items                     | 13    |
