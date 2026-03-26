import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { facultyApi } from '../admin/api/faculty';
import type { Faculty } from '../admin/types';
import PageLayout from '../components/PageLayout';
import './departments/csds/FacultyProfile.css';

const FacultyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    facultyApi.get(id)
      .then(r => setFaculty(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1a4b7c] rounded-full animate-spin mb-4" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Profile...</p>
        </div>
      </PageLayout>
    );
  }

  if (!faculty) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl font-bold text-[#1a4b7c] mb-4">Faculty profile not found.</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 font-bold hover:underline">Go Back</button>
        </div>
      </PageLayout>
    );
  }

  const { basicInfo, qualifications, experience, academic, publications, rolesAndAwards, onlineLinks, memberships, profileImage } = faculty;

  const tabs = [
    { id: 'about', label: 'About', icon: 'fa-user' },
    { id: 'academic', label: 'Academic', icon: 'fa-graduation-cap' },
    { id: 'publications', label: 'Publications', icon: 'fa-book' },
    { id: 'roles', label: 'Roles & Awards', icon: 'fa-award' },
    { id: 'links', label: 'Links', icon: 'fa-link' },
  ];

  return (
    <div className="faculty-profile-root">
      <PageLayout>
        <div className="wrap">
          {/* Hero Section */}
          <div className="hero">
            <div className="hero-g">
              <div className="ph-wrap">
                <div className="ph-circle">
                  {profileImage?.url ? (
                    <img src={profileImage.url} alt={basicInfo.fullName} />
                  ) : (
                    <span>{basicInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                  )}
                </div>
                <div className="ph-badge">VCET Faculty</div>
              </div>
              <div className="hero-txt">
                <div className="dept-tag">{basicInfo.department}</div>
                <h1 className="hero-name">{basicInfo.fullName}</h1>
                <p className="hero-desig">{basicInfo.designation}</p>
                <p className="hero-dept">Vidyavardhini's College of Engineering and Technology</p>
                <div className="hero-meta">
                  <div className="m-item"><i className="fa-solid fa-envelope" /> {basicInfo.email}</div>
                  <div className="m-item"><i className="fa-solid fa-calendar-check" /> Joined {new Date(basicInfo.joinDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Ribbon */}
          <div className="stat-ribbon">
            <div className="sr-item">
              <div className="sr-ico"><i className="fa-solid fa-chalkboard-user" /></div>
              <div>
                <div className="sr-val">{experience.teachingYears}</div>
                <div className="sr-lbl">Teaching</div>
                <div className="sr-sub">Years</div>
              </div>
            </div>
            <div className="sr-item">
              <div className="sr-ico"><i className="fa-solid fa-industry" /></div>
              <div>
                <div className="sr-val">{experience.industryYears}</div>
                <div className="sr-lbl">Industry</div>
                <div className="sr-sub">Years</div>
              </div>
            </div>
            <div className="sr-item">
              <div className="sr-ico"><i className="fa-solid fa-file-invoice" /></div>
              <div>
                <div className="sr-val">{experience.totalPapers}</div>
                <div className="sr-lbl">Research</div>
                <div className="sr-sub">Papers</div>
              </div>
            </div>
            <div className="sr-item">
              <div className="sr-ico"><i className="fa-solid fa-book-open" /></div>
              <div>
                <div className="sr-val">{experience.totalBooks}</div>
                <div className="sr-lbl">Books</div>
                <div className="sr-sub">Published</div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="tab-nav">
            <div className="tab-list">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`t-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`fa-solid ${tab.icon}`} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'about' && (
              <div className="tab-panel active">
                <div className="two-col">
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico"><i className="fa-solid fa-address-card" /></div>
                      <div>
                        <h3 className="sec-title">Personal Details</h3>
                        <p className="sec-sub">Brief overview and background</p>
                      </div>
                    </div>
                    <div className="ir"><span className="ir-l">Full Name</span><span className="ir-v">{basicInfo.fullName}</span></div>
                    <div className="ir"><span className="ir-l">Designation</span><span className="ir-v">{basicInfo.designation}</span></div>
                    <div className="ir"><span className="ir-l">Department</span><span className="ir-v">{basicInfo.department}</span></div>
                    <div className="ir"><span className="ir-l">Email</span><span className="ir-v">{basicInfo.email}</span></div>
                  </div>
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico gold"><i className="fa-solid fa-graduation-cap" /></div>
                      <div>
                        <h3 className="sec-title">Qualifications</h3>
                        <p className="sec-sub">Academic degrees earned</p>
                      </div>
                    </div>
                    {qualifications.degrees.map((deg, i) => (
                      <div key={i} className="ql">
                        <div className="qb">DEGREE</div>
                        <div className="qt"><strong>{deg}</strong></div>
                      </div>
                    ))}
                    <div className="ir" style={{marginTop:'10px'}}><span className="ir-l">Specialization</span><span className="ir-v">{qualifications.specialization}</span></div>
                  </div>
                </div>
                {memberships.organizations.length > 0 && (
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico"><i className="fa-solid fa-users-rectangle" /></div>
                      <div>
                        <h3 className="sec-title">Professional Memberships</h3>
                        <p className="sec-sub">Associated organizations and bodies</p>
                      </div>
                    </div>
                    <div className="chip-row">
                      {memberships.organizations.map((org, i) => (
                        <div key={i} className="chip blue"><i className="fa-solid fa-certificate" /> {org}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="tab-panel active">
                <div className="card">
                  <div className="sec-h">
                    <div className="sec-ico gold"><i className="fa-solid fa-microscope" /></div>
                    <div>
                      <h3 className="sec-title">Research & Projects</h3>
                      <p className="sec-sub">Academic guidance and focus areas</p>
                    </div>
                  </div>
                  <div className="ir"><span className="ir-l">PG Projects Guided</span><span className="ir-v">{academic.pgProjects || 'None listed'}</span></div>
                </div>
                <div className="two-col">
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico"><i className="fa-solid fa-brain" /></div>
                      <div>
                        <h3 className="sec-title">Research Domains</h3>
                        <p className="sec-sub">Areas of expertise</p>
                      </div>
                    </div>
                    <div className="chip-row">
                      {academic.researchDomains.map((dom, i) => (
                        <div key={i} className="chip gold">{dom}</div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico"><i className="fa-solid fa-handshake" /></div>
                      <div>
                        <h3 className="sec-title">Consultancy</h3>
                        <p className="sec-sub">Industry projects and collaborations</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      {academic.consultancyProjects.map((cp, i) => (
                        <li key={i} className="text-sm text-slate-600 font-medium">{cp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="tab-panel active">
                <div className="card">
                  <div className="sec-h">
                    <div className="sec-ico red"><i className="fa-solid fa-book" /></div>
                    <div>
                      <h3 className="sec-title">Books & Patents</h3>
                      <p className="sec-sub">Published works and intellectual property</p>
                    </div>
                  </div>
                  <div className="books-g">
                    {publications.books.map((book, i) => (
                      <div key={i} className="bk-row">
                        <div className="bk-num">{i+1}</div>
                        <div className="bk"><strong>{book.title}</strong><span>ISBN: {book.isbn}</span></div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 mt-6">
                    {publications.patents.map((pat, i) => (
                      <div key={i} className="pat">
                        <div className="p-num">PAT</div>
                        <div><strong className="p-title">{pat.title}</strong><span className="p-date"><i className="fa-solid fa-calendar-day" /> {new Date(pat.date).toLocaleDateString()}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="sec-h">
                    <div className="sec-ico"><i className="fa-solid fa-file-lines" /></div>
                    <div>
                      <h3 className="sec-title">Research Papers</h3>
                      <p className="sec-sub">Journals and conference publications</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {publications.researchPapers.map((rp, i) => (
                      <div key={i} className="ir"><span className="ir-v text-blue-600 hover:underline cursor-pointer">{rp}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="tab-panel active">
                <div className="two-col">
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico gold"><i className="fa-solid fa-briefcase" /></div>
                      <div>
                        <h3 className="sec-title">Roles & Responsibilities</h3>
                        <p className="sec-sub">Institutional duties</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {rolesAndAwards.roles.map((role, i) => (
                        <div key={i} className="role-pill"><i className="fa-solid fa-check-circle" /> {role}</div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="sec-h">
                      <div className="sec-ico gold"><i className="fa-solid fa-trophy" /></div>
                      <div>
                        <h3 className="sec-title">Awards & Honors</h3>
                        <p className="sec-sub">Recognition and achievements</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {rolesAndAwards.awards.map((award, i) => (
                        <div key={i} className="aw">
                          <div className="aw-ico"><i className="fa-solid fa-medal" /></div>
                          <div><strong className="aw-title">{award}</strong></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="tab-panel active">
                <div className="card">
                  <div className="sec-h">
                    <div className="sec-ico"><i className="fa-solid fa-globe" /></div>
                    <div>
                      <h3 className="sec-title">Online Presence</h3>
                      <p className="sec-sub">External profiles and resources</p>
                    </div>
                  </div>
                  <div className="links-g">
                    {onlineLinks.website && (
                      <a href={onlineLinks.website} target="_blank" rel="noreferrer" className="lk">
                        <div className="lk-ico"><i className="fa-solid fa-earth-americas" /></div>
                        <div><span className="lk-name">Website</span><span className="lk-sub">Personal/Portfolio</span></div>
                      </a>
                    )}
                    {onlineLinks.youtube && (
                      <a href={onlineLinks.youtube} target="_blank" rel="noreferrer" className="lk">
                        <div className="lk-ico"><i className="fa-brands fa-youtube" /></div>
                        <div><span className="lk-name">YouTube</span><span className="lk-sub">Educational Channel</span></div>
                      </a>
                    )}
                    {onlineLinks.github && (
                      <a href={onlineLinks.github} target="_blank" rel="noreferrer" className="lk">
                        <div className="lk-ico"><i className="fa-brands fa-github" /></div>
                        <div><span className="lk-name">GitHub</span><span className="lk-sub">Code Repositories</span></div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default FacultyProfile;
