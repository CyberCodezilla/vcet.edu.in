import React, { useState } from 'react';
import PageLayout from './PageLayout';
import PageBanner from './PageBanner';
import { GraduationCap, Eye, Target, Users, Monitor, BookOpen, Award, Mail, ChevronDown } from 'lucide-react';

interface DepartmentInfo {
  name: string;
  slug: string;
  established: string;
  intake: string;
  hodName: string;
  hodTitle: string;
  hodImage: string;
  description: string[];
  vision?: string;
  mission?: string[];
  tabs: string[];
  nbaAccredited?: boolean;
  nbaYear?: string;
}

interface DepartmentPageProps {
  dept: DepartmentInfo;
}

const DepartmentPage: React.FC<DepartmentPageProps> = ({ dept }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageLayout>
      <PageBanner
        title={dept.name}
        breadcrumbs={[
          { label: 'Departments' },
          { label: dept.name },
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">

            {/* Tab Navigation */}
            <div className="reveal mb-10 -mt-4">
              <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex min-w-max gap-1 bg-brand-light rounded-xl p-1.5">
                {dept.tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-300 ${
                      activeTab === idx
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'text-slate-500 hover:text-brand-blue hover:bg-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* HOD Card + About (shown on About tab) */}
                {activeTab === 0 && (
                  <>
                    {/* HOD Featured Card */}
                    <div className="reveal bg-gradient-to-r from-brand-blue to-brand-navy rounded-2xl p-6 md:p-8 text-white">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        {/* HOD Photo Placeholder */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <div className="text-center">
                            <span className="text-2xl font-display font-bold text-white/30">
                              {dept.hodName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                            <p className="text-[9px] text-white/30 mt-1">{dept.hodImage}</p>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1">
                            Head of Department
                          </div>
                          <h3 className="text-xl font-display font-bold">{dept.hodName}</h3>
                          <p className="text-sm text-white/60 mt-0.5">{dept.hodTitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Department Description */}
                    <div className="space-y-4">
                      {dept.description.map((para, idx) => (
                        <p key={idx} className="reveal text-slate-600 leading-relaxed" style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Department Image Placeholder */}
                    <div className="reveal rounded-2xl overflow-hidden bg-brand-light h-[250px] flex items-center justify-center border border-gray-100">
                      <div className="text-center">
                        <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Monitor className="w-7 h-7 text-brand-blue/30" />
                        </div>
                        <p className="text-sm font-medium text-slate-400">{dept.name} Lab</p>
                        <p className="text-xs text-slate-300 mt-1">{dept.slug}-lab.jpg</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Vision & Mission Tab */}
                {activeTab === 1 && (
                  <div className="space-y-8">
                    {dept.vision && (
                      <div className="reveal bg-gradient-to-br from-brand-blue to-brand-navy rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <Eye className="w-5 h-5 text-brand-gold" />
                          </div>
                          <h3 className="text-xl font-display font-bold">Vision</h3>
                        </div>
                        <p className="text-white/80 leading-relaxed">{dept.vision}</p>
                      </div>
                    )}

                    {dept.mission && (
                      <div className="reveal bg-brand-light rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                            <Target className="w-5 h-5 text-brand-blue" />
                          </div>
                          <h3 className="text-xl font-display font-bold text-brand-navy">Mission</h3>
                        </div>
                        <ul className="space-y-3">
                          {dept.mission.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-600">
                              <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0 mt-2" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Faculty Tab Placeholder */}
                {activeTab === 2 && (
                  <div className="reveal">
                    <div className="text-center py-16 bg-brand-light rounded-2xl">
                      <Users className="w-12 h-12 text-brand-blue/20 mx-auto mb-4" />
                      <h3 className="text-lg font-display font-bold text-brand-navy mb-2">Faculty Members</h3>
                      <p className="text-sm text-slate-400">Faculty details and photos will be added here</p>
                      <p className="text-xs text-slate-300 mt-1">{dept.slug}-faculty-grid.jpg</p>
                    </div>
                  </div>
                )}

                {/* Infrastructure Tab Placeholder */}
                {activeTab === 3 && (
                  <div className="reveal space-y-4">
                    <div className="text-center py-16 bg-brand-light rounded-2xl">
                      <Monitor className="w-12 h-12 text-brand-blue/20 mx-auto mb-4" />
                      <h3 className="text-lg font-display font-bold text-brand-navy mb-2">Laboratories & Infrastructure</h3>
                      <p className="text-sm text-slate-400">Lab details and photos will be added here</p>
                      <p className="text-xs text-slate-300 mt-1">{dept.slug}-infrastructure.jpg</p>
                    </div>
                  </div>
                )}

                {/* Other tabs placeholder */}
                {activeTab > 3 && (
                  <div className="reveal">
                    <div className="text-center py-16 bg-brand-light rounded-2xl">
                      <BookOpen className="w-12 h-12 text-brand-blue/20 mx-auto mb-4" />
                      <h3 className="text-lg font-display font-bold text-brand-navy mb-2">{dept.tabs[activeTab]}</h3>
                      <p className="text-sm text-slate-400">Content for this section will be added here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <div className="reveal bg-brand-light rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Established</p>
                        <p className="text-sm font-semibold text-brand-navy">{dept.established}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-gold/10 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Intake</p>
                        <p className="text-sm font-semibold text-brand-navy">{dept.intake} seats</p>
                      </div>
                    </div>
                    {dept.nbaAccredited && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                          <Award className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wide">NBA Accredited</p>
                          <p className="text-sm font-semibold text-brand-navy">{dept.nbaYear}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="reveal bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" style={{ transitionDelay: '0.1s' }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy mb-4">Contact</h3>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    <a href={`mailto:${dept.slug}@vcet.edu.in`} className="text-sm text-brand-blue hover:underline">
                      {dept.slug}@vcet.edu.in
                    </a>
                  </div>
                </div>

                {/* Department Image */}
                <div className="reveal rounded-2xl overflow-hidden bg-brand-light h-[200px] flex items-center justify-center border border-gray-100" style={{ transitionDelay: '0.2s' }}>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-400">{dept.name}</p>
                    <p className="text-xs text-slate-300 mt-1">{dept.slug}-dept-photo.jpg</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DepartmentPage;
