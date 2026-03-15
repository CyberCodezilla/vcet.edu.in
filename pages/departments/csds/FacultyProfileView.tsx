import React, { useState, useEffect, useRef } from "react";
import "./FacultyProfile.css";

/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
   EXPORTED TYPES  (import from here in every faculty data file)
ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */

export interface ResearchDomain {
  icon?: string;
  title: string;
  subtitle: string;
}

export interface PgProject {
  label: string;
  detail: string;
}

export interface ConsultancyProject {
  title: string;
  year?: string;
  url?: string;
  urlLabel?: string;
}

export interface Book {
  count?: number | string;
  title: string;
  subtitle?: string;
  special?: boolean;
}

export interface Publication {
  title: string;
  journal?: string;
  year?: string;
}

export interface Patent {
  title: string;
  date?: string;
}

export interface Role {
  icon?: string;
  label: string;
}

export interface Award {
  icon?: string;
  title: string;
  subtitle?: string;
}

export interface WebsiteLink {
  href: string;
  icon?: string;
  name?: string;
  sub?: string;
}

export interface YoutubeChannel {
  href: string;
  name: string;
  sub: string;
}

export interface EResource {
  title: string;
  icon?: string;
  url: string;
  code?: string;
}

export interface Membership {
  label: string;
  fullName?: string;
}

export interface FacultyData {
  name: string;
  designation: string;
  department: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  email?: string;
  experienceYears?: string;
  industryYears?: string;
  papersPublished?: string;
  photo: string;
  qualifications?: string[];
  specialization?: string[];
  researchDomains?: ResearchDomain[];
  pgProjects?: PgProject[];
  consultancy?: ConsultancyProject[];
  books?: Book[];
  isbnNumbers?: string[];
  publications?: Publication[];
  patents?: Patent[];
  roles?: Role[];
  awards?: Award[];
  websites?: (WebsiteLink | string)[];
  youtube?: YoutubeChannel[];
  eResources?: EResource[];
  memberships?: (Membership | string)[];
}

/* ÔöÇÔöÇÔöÇ Helpers ÔöÇÔöÇÔöÇ */
const has = <T,>(arr: T[] | undefined | null): arr is T[] =>
  Array.isArray(arr) && arr.length > 0;

/* ÔöÇÔöÇÔöÇ Reusable YouTube SVG icon ÔöÇÔöÇÔöÇ */
function YtSvg(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12z" />
    </svg>
  );
}

/* ÔöÇÔöÇÔöÇ Accordion ÔöÇÔöÇÔöÇ */
interface AccordionProps {
  extraClass?: string;
  defaultOpen?: boolean;
  summaryContent: React.ReactNode;
  children: React.ReactNode;
}

function Accordion({ extraClass, defaultOpen, summaryContent, children }: Readonly<AccordionProps>): React.ReactElement {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <details
      className={`acc${extraClass ? " " + extraClass : ""}`}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary>
        {summaryContent}
        <i className="fas fa-chevron-down acc-caret"></i>
      </summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}

/* ÔöÇÔöÇÔöÇ Initials helper ÔöÇÔöÇÔöÇ */
function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

function parsePublicationLink(title: string): { text: string; url?: string } {
  const urlMatch = title.match(/(https?:\/\/\S+)/i);
  if (!urlMatch) {
    return { text: title };
  }

  const url = urlMatch[1];
  const text = title
    .replace(url, "")
    .replace(/[\s-]+$/g, "")
    .trim();

  return { text: text || title, url };
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
   SHARED FACULTY PROFILE VIEW  (accepts any FacultyData prop)
ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */

interface Props { faculty: FacultyData; }

const FacultyProfileView: React.FC<Readonly<Props>> = ({ faculty }) => {
  /* ÔöÇÔöÇ derive visibility flags ÔöÇÔöÇ */
  const hasPublications   = has(faculty.publications);
  const hasBooks          = has(faculty.books);
  const hasPatents        = has(faculty.patents);
  const hasRoles          = has(faculty.roles);
  const hasAwards         = has(faculty.awards);
  const hasYoutube        = has(faculty.youtube);
  const hasEResources     = has(faculty.eResources);
  const hasWebsites       = has(faculty.websites);
  const hasMemberships    = has(faculty.memberships);
  const hasResearch       = has(faculty.researchDomains);
  const hasConsultancy    = has(faculty.consultancy);
  const hasPgProjects     = has(faculty.pgProjects);
  const hasSpecialization = has(faculty.specialization);

  /* ÔöÇÔöÇ All 6 tabs are always visible ÔöÇÔöÇ */
  const allTabs = [
    { id: "profile",      icon: "fa-id-badge",  label: "Profile Info" },
    { id: "academic",     icon: "fa-flask",      label: "Academic Work" },
    { id: "publications", icon: "fa-book-open",  label: "Publications" },
    { id: "roles",        icon: "fa-tasks",      label: "Roles & Awards" },
    { id: "online",       icon: "fa-link",       label: "Online Presence" },
    { id: "memberships",  icon: "fa-id-card",    label: "Memberships" },
  ];

  const [activeTab, setActiveTab] = useState("profile");
  const [photoFailed, setPhotoFailed] = useState(false);
  const heroRef   = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setPhotoFailed(false);
  }, [faculty.photo, faculty.name]);

  const switchTab = (id: string) => setActiveTab(id);

  const panel = (id: string) => `tab-panel${activeTab === id ? " active" : ""}`;
  const abbr  = initials(faculty.name);
  const photoSrc = faculty.photo.startsWith('/') || /^https?:\/\//i.test(faculty.photo)
    ? faculty.photo
    : `/images/${faculty.photo}`;

  return (
    <div className="faculty-profile-root">
      <div className="wrap">

        {/* ÔöÇÔöÇ HERO ÔöÇÔöÇ */}
        <div className="hero" ref={heroRef}>
          <div className="hero-g">
            <div className="ph-wrap">
              <div className="ph-circle">
                {!photoFailed ? (
                  <img src={photoSrc} alt={faculty.name} onError={() => setPhotoFailed(true)} />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#1a4b7c',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '2rem',
                    }}
                  >
                    {abbr}
                  </div>
                )}
              </div>
              {faculty.qualifications?.some(
                (q) => q.toLowerCase().startsWith("ph.d") || q.toLowerCase().startsWith("phd")
              ) && <div className="ph-badge">Ph.D.</div>}
            </div>
            <div className="hero-txt">
              <div className="dept-tag">
                <i className="fas fa-microchip"></i> {faculty.department}
              </div>
              <h1 className="hero-name">{faculty.name}</h1>
              <p className="hero-desig">{faculty.designation}</p>
              <p className="hero-dept">Department of {faculty.department}</p>
            </div>
          </div>
        </div>

        {/* ÔöÇÔöÇ STAT RIBBON ÔöÇÔöÇ */}
        <div className="stat-ribbon">
          {faculty.experienceYears && (
            <div className="sr-item">
              <div className="sr-ico"><i className="fas fa-chalkboard-teacher"></i></div>
              <div>
                <div className="sr-val">{faculty.experienceYears}</div>
                <div className="sr-lbl">Experience</div>
                <div className="sr-sub">Teaching</div>
              </div>
            </div>
          )}
          {faculty.industryYears && (
            <div className="sr-item">
              <div className="sr-ico"><i className="fas fa-industry"></i></div>
              <div>
                <div className="sr-val">{faculty.industryYears}</div>
                <div className="sr-lbl">Experience</div>
                <div className="sr-sub">Industry</div>
              </div>
            </div>
          )}
          {faculty.papersPublished && (
            <div className="sr-item">
              <div className="sr-ico"><i className="fas fa-newspaper"></i></div>
              <div>
                <div className="sr-val">{faculty.papersPublished}</div>
                <div className="sr-lbl">Papers</div>
                <div className="sr-sub">Published</div>
              </div>
            </div>
          )}
          {hasBooks && (
            <div className="sr-item">
              <div className="sr-ico"><i className="fas fa-book"></i></div>
              <div>
                <div className="sr-val">{faculty.books!.length}</div>
                <div className="sr-lbl">Books</div>
                <div className="sr-sub">Published</div>
              </div>
            </div>
          )}
          {hasPatents && (
            <div className="sr-item">
              <div className="sr-ico"><i className="fas fa-lightbulb"></i></div>
              <div>
                <div className="sr-val">{faculty.patents!.length}</div>
                <div className="sr-lbl">Patents</div>
                <div className="sr-sub">Published</div>
              </div>
            </div>
          )}
        </div>

        {/* ÔöÇÔöÇ TAB NAV ÔöÇÔöÇ */}
        <nav className="tab-nav" ref={tabNavRef}>
          <div className="tab-list" role="tablist">
            {allTabs.map(({ id, icon, label }) => (
              <button
                key={id}
                className={`t-tab${activeTab === id ? " active" : ""}`}
                onClick={() => switchTab(id)}
              >
                <i className={`fas ${icon}`}></i> {label}
              </button>
            ))}
          </div>
        </nav>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö PROFILE INFO ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("profile")}>
          <div className="two-col">

            {/* Personal Information */}
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-user"></i></div>
                <div>
                  <div className="sec-title">Personal Information</div>
                  <div className="sec-sub">Basic details</div>
                </div>
              </div>
              {faculty.dateOfBirth && (
                <div className="ir">
                  <div className="ir-ico"><i className="fas fa-birthday-cake"></i></div>
                  <div>
                    <span className="ir-l">Date of Birth</span>
                    <span className="ir-v">{faculty.dateOfBirth}</span>
                  </div>
                </div>
              )}
              {faculty.dateOfJoining && (
                <div className="ir">
                  <div className="ir-ico"><i className="fas fa-calendar-check"></i></div>
                  <div>
                    <span className="ir-l">Joining Date</span>
                    <span className="ir-v">{faculty.dateOfJoining}</span>
                  </div>
                </div>
              )}
              {faculty.email && (
                <div className="ir">
                  <div className="ir-ico"><i className="fas fa-envelope"></i></div>
                  <div>
                    <span className="ir-l">Email</span>
                    <span className="ir-v">
                      <a
                        href={`mailto:${faculty.email}`}
                        style={{ color: "var(--p)", textDecoration: "none" }}
                      >
                        {faculty.email}
                      </a>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Qualifications */}
            {has(faculty.qualifications) ? (
              <div className="card">
                <div className="sec-h">
                  <div className="sec-ico"><i className="fas fa-graduation-cap"></i></div>
                  <div>
                    <div className="sec-title">Qualifications</div>
                    <div className="sec-sub">Degree details</div>
                  </div>
                </div>
                {faculty.qualifications.map((q, i) => (
                  <div className="ql" key={i}>
                    <div className="qb">{q.split(" ")[0].replaceAll(/[()]/g, "")}</div>
                    <div className="qt">
                      <strong>{q}</strong>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-notice">This section will be updated with verified information shortly.</p>
            )}

          </div>

          {/* Specialization */}
          {hasSpecialization && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-star"></i></div>
                <div>
                  <div className="sec-title">Specialization</div>
                  <div className="sec-sub">Areas of expertise</div>
                </div>
              </div>
              <div className="chip-row">
                {faculty.specialization!.map((s) => (
                  <span key={s} className="chip blue">
                    <i className="fas fa-tag"></i>{s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö ACADEMIC WORK ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("academic")}>
          {!hasPgProjects && !hasResearch && !hasConsultancy && (
            <p className="empty-notice">This section will be updated with verified information shortly.</p>
          )}

          {hasPgProjects && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-user-graduate"></i></div>
                <div>
                  <div className="sec-title">PG Projects Guided</div>
                  <div className="sec-sub">Supervised postgraduate research</div>
                </div>
              </div>
              {faculty.pgProjects!.map((p, i) => (
                <div className="ir" key={i}>
                  <div className="ir-ico"><i className="fas fa-scroll"></i></div>
                  <div>
                    <span className="ir-l">{p.label}</span>
                    <span className="ir-v">{p.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasResearch && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-flask"></i></div>
                <div>
                  <div className="sec-title">Research Domains</div>
                  <div className="sec-sub">Areas of scholarly contribution</div>
                </div>
              </div>
              <div className="kg">
                {faculty.researchDomains!.map((d) => (
                  <div className="kg-cell" key={d.title}>
                    <div className="kg-ico"><i className={`fas ${d.icon ?? "fa-atom"}`}></i></div>
                    <div>
                      <span className="kg-t">{d.title}</span>
                      <span className="kg-s">{d.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasConsultancy && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-handshake"></i></div>
                <div>
                  <div className="sec-title">Consultancy Projects</div>
                  <div className="sec-sub">External professional engagements</div>
                </div>
              </div>
              <Accordion
                defaultOpen
                summaryContent={
                  <div className="acc-left">
                    <i className="fas fa-folder-open"></i> All Projects
                    <span className="bdg">{faculty.consultancy!.length}</span>
                  </div>
                }
              >
                {faculty.consultancy!.map((c, i) => (
                  <div className="con" key={i}>
                    <div className="c-num">{i + 1}</div>
                    <div>
                      <span className="c-title">{c.title}</span>
                      {c.year && (
                        <div className="c-meta">
                          <i className="fas fa-calendar" style={{ marginRight: "3px", color: "var(--a)" }}></i>
                          {c.year}
                        </div>
                      )}
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="c-link">
                          <i className="fas fa-external-link-alt"></i> {c.urlLabel ?? c.url}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö PUBLICATIONS ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("publications")}>
          {!hasBooks && !hasPublications && !hasPatents && (
            <p className="empty-notice">This section will be updated with verified information shortly.</p>
          )}

          {hasBooks && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-book-open"></i></div>
                <div>
                  <div className="sec-title">Books Published</div>
                  <div className="sec-sub">Grouped by subject</div>
                </div>
              </div>
              <Accordion
                extraClass="gold-glow"
                defaultOpen
                summaryContent={
                  <div className="acc-left">
                    <i className="fas fa-book"></i> Book Titles
                    <span className="bdg">{faculty.books!.length}</span>
                  </div>
                }
              >
                <div className="books-g">
                  {faculty.books!.map((b: Book, i: number) => (
                    <div className={`bk-row${b.special ? " special" : ""}`} key={i}>
                      <div className="bk-num">{b.count ?? i + 1}</div>
                      <div className="bk">
                        <strong>{b.title}</strong>
                        {b.subtitle && <span>{b.subtitle}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion>

              {has(faculty.isbnNumbers) && (
                <Accordion
                  summaryContent={
                    <div className="acc-left">
                      <i className="fas fa-barcode"></i> ISBN Numbers
                      <span className="bdg">{faculty.isbnNumbers!.length}</span>
                    </div>
                  }
                >
                  <div className="isbn-g">
                    {faculty.isbnNumbers!.map((isbn, i) => (
                      <div key={isbn} className="isbn-chip">
                        <div className="isbn-idx">{i + 1}</div>
                        <div className="isbn-num">{isbn}</div>
                      </div>
                    ))}
                  </div>
                </Accordion>
              )}
            </div>
          )}

          {hasPublications && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-newspaper"></i></div>
                <div>
                  <div className="sec-title">Research Papers</div>
                  <div className="sec-sub">Published work</div>
                </div>
              </div>
              <Accordion
                defaultOpen
                summaryContent={
                  <div className="acc-left">
                    <i className="fas fa-file-alt"></i> Papers
                    <span className="bdg">{faculty.publications!.length}</span>
                  </div>
                }
              >
                {faculty.publications!.map((p, i) => (
                  <div className="con" key={i}>
                    <div className="c-num">{i + 1}</div>
                    <div>
                      {(() => {
                        const { text, url } = parsePublicationLink(p.title);
                        return (
                          <>
                            <span className="c-title">{text}</span>
                            {url && (
                              <div className="c-meta">
                                <a href={url} target="_blank" rel="noopener noreferrer">View Article</a>
                              </div>
                            )}
                          </>
                        );
                      })()}
                      {p.journal && (
                        <div className="c-meta">{p.journal} &mdash; {p.year}</div>
                      )}
                    </div>
                  </div>
                ))}
              </Accordion>
            </div>
          )}

          {hasPatents && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-lightbulb"></i></div>
                <div>
                  <div className="sec-title">Patents</div>
                  <div className="sec-sub">Published innovations</div>
                </div>
              </div>
              <Accordion
                extraClass="gold-glow"
                defaultOpen
                summaryContent={
                  <div className="acc-left">
                    <i className="fas fa-certificate"></i> Published Patents
                    <span className="bdg">{faculty.patents!.length}</span>
                  </div>
                }
              >
                {faculty.patents!.map((p, i) => (
                  <div className="pat" key={i}>
                    <div className="p-num">P{i + 1}</div>
                    <div>
                      <span className="p-title">
                        {p.title}{" "}
                        <span className="pub-badge">Published</span>
                      </span>
                      {p.date && (
                        <div className="p-date">
                          <i className="fas fa-calendar-check"></i> {p.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö ROLES & AWARDS ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("roles")}>
          {!hasRoles && !hasAwards && (
            <p className="empty-notice">This section will be updated with verified information shortly.</p>
          )}
          <div className="two-col">

            {hasRoles && (
              <div className="card">
                <div className="sec-h">
                  <div className="sec-ico"><i className="fas fa-tasks"></i></div>
                  <div>
                    <div className="sec-title">Roles &amp; Responsibilities</div>
                    <div className="sec-sub">Current institutional roles</div>
                  </div>
                </div>
                {faculty.roles!.map((r, i) => (
                  <div className="role-pill" key={i}>
                    <i className={`fas ${r.icon ?? "fa-check-circle"}`}></i> {r.label}
                  </div>
                ))}
              </div>
            )}

            {hasAwards && (
              <div className="card">
                <div className="sec-h">
                  <div className="sec-ico gold"><i className="fas fa-trophy"></i></div>
                  <div>
                    <div className="sec-title">Awards &amp; Achievements</div>
                    <div className="sec-sub">Recognitions received</div>
                  </div>
                </div>
                <Accordion
                  extraClass="gold-glow"
                  defaultOpen
                  summaryContent={
                    <div className="acc-left">
                      <i className="fas fa-medal"></i> Recognitions
                      <span className="bdg">{faculty.awards!.length}</span>
                    </div>
                  }
                >
                  {faculty.awards!.map((a, i) => (
                    <div className="aw" key={i}>
                      <div className="aw-ico"><i className={`fas ${a.icon ?? "fa-award"}`}></i></div>
                      <div>
                        <span className="aw-title">{a.title}</span>
                        {a.subtitle && <div className="aw-sub">{a.subtitle}</div>}
                      </div>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}

          </div>
        </div>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö ONLINE PRESENCE ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("online")}>
          {!hasWebsites && !hasYoutube && !hasEResources && (
            <p className="empty-notice">This section will be updated with verified information shortly.</p>
          )}

          {hasWebsites && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-link"></i></div>
                <div>
                  <div className="sec-title">Websites &amp; Profiles</div>
                  <div className="sec-sub">Personal sites &amp; academic indices</div>
                </div>
              </div>
              <div className="links-g">
                {(faculty.websites as (WebsiteLink | string)[]).map((w) => {
                  const site = typeof w === "string"
                    ? { href: w, name: w, sub: "", icon: undefined }
                    : w;
                  return (
                    <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className="lk">
                      <div className="lk-ico">
                        <i className={`fas ${site.icon ?? "fa-globe"}`}></i>
                      </div>
                      <div>
                        <span className="lk-name">{site.name ?? site.href}</span>
                        <span className="lk-sub">{site.sub ?? ""}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {hasYoutube && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico red">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <div className="sec-title">YouTube Channels</div>
                  <div className="sec-sub">
                    {faculty.youtube!.length} educational channel{faculty.youtube!.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
              <div className="yt-g">
                {faculty.youtube!.map(({ href, name, sub }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="yt-c">
                    <div className="yt-ico"><YtSvg /></div>
                    <div>
                      <span className="yt-name">{name}</span>
                      <span className="yt-sub">{sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {hasEResources && (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-book-reader"></i></div>
                <div>
                  <div className="sec-title">E-Resources &amp; Study Notes</div>
                  <div className="sec-sub">Online materials for students</div>
                </div>
              </div>
              <Accordion
                defaultOpen
                summaryContent={
                  <div className="acc-left">
                    <i className="fas fa-file-alt"></i> Study Materials
                    <span className="bdg">{faculty.eResources!.length}</span>
                  </div>
                }
              >
                {faculty.eResources!.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="res-c">
                    <div className="res-ico"><i className={`fas ${r.icon ?? "fa-file-alt"}`}></i></div>
                    <div>
                      <span className="res-name">{r.title}</span>
                      <span className="res-url">
                        {r.code ? `Classroom code: ${r.code}` : r.url}
                      </span>
                    </div>
                  </a>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* ÔòÉÔòÉÔòÉÔòÉ TAB ÔÇö MEMBERSHIPS ÔòÉÔòÉÔòÉÔòÉ */}
        <div className={panel("memberships")}>
          {hasMemberships ? (
            <div className="card">
              <div className="sec-h">
                <div className="sec-ico"><i className="fas fa-id-card"></i></div>
                <div>
                  <div className="sec-title">Professional Memberships</div>
                  <div className="sec-sub">Life memberships held</div>
                </div>
              </div>
              <div className="mem-row">
                {(faculty.memberships as (Membership | string)[]).map((m, i) => {
                  const text  = typeof m === "string" ? m : m.label;
                  const parts = text.split(/[\sÔÇôÔÇö-]+/);
                  const org   = parts.find((p) => /^[A-Z]{2,6}$/.test(p)) ?? parts.at(-1)!;
                  const id    = text.replaceAll(org, "").replaceAll(/[ÔÇôÔÇö]/gu, "").replaceAll(/\s+/gu, " ").trim();
                  return (
                    <div className="mem-card" key={i}>
                      <div className="m-org">{org}</div>
                      <div className="m-full">{typeof m === "string" ? text : (m.fullName ?? text)}</div>
                      {id && id !== org && <div className="m-id">{id}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="empty-notice">This section will be updated with verified information shortly.</p>
          )}
        </div>

      </div>{/* /wrap */}

    </div>
  );
};

export default FacultyProfileView;
