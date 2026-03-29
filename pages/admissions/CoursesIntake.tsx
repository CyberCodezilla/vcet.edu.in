import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  ChevronRight,
  Layers,
  CheckCircle2
} from 'lucide-react';

const ugCourses = [
  { course: 'Computer Engineering', intake: 180 },
  { course: 'Computer Science and Engineering (Data Science)', intake: 180 },
  { course: 'Information Technology', intake: 60 },
  { course: 'Artificial Intelligence and Data Science', intake: 120 },
  { course: 'Mechanical Engineering', intake: 60 },
  { course: 'Electronics and Telecommunication Engineering', intake: 60 },
  { course: 'Civil Engineering', intake: 60 },
];

const pgCourses = [
  { course: 'M.E. Civil (Structural Engineering)', intake: 24 },
  { course: 'M.E. (Computer Engineering)', intake: 24 },
];

const mgmtCourses = [
  { course: 'Master Of Management Studies (MMS)', intake: 120 },
];

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, title, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`group flex items-center justify-between px-4 md:px-6 py-3 md:py-4 cursor-pointer transition-all duration-300 min-h-[44px] ${
      active 
      ? 'bg-[#1e4e85] text-white shadow-md' 
      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1e4e85]'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`transition-colors duration-300 ${active ? 'text-[#e6a315]' : 'text-slate-400 group-hover:text-[#1e4e85]'}`}>
        <Icon size={18} />
      </div>
      <span className="text-[13px] font-bold tracking-wide">{title}</span>
    </div>
    {active && <ChevronRight size={14} className="text-[#e6a315]" />}
  </div>
);

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color }) => (
  <div className="bg-[#eff3f8] p-5 rounded-xl flex items-center gap-5 border border-slate-200/50 mb-3 last:mb-0">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 shrink-0`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div className="overflow-hidden">
      <div className="text-xl font-black text-slate-800 leading-none mb-1.5">{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

interface CourseTableProps {
  courses: { course: string; intake: number }[];
  startIndex?: number;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, startIndex = 1 }) => {
  return (
    <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1e4e85] text-white">
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest w-24 text-center">Sr.</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Course Name</th>
              <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-right pr-12">Intake Capacity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-5 text-sm font-bold text-slate-300 text-center">
                  {(startIndex + idx).toString().padStart(2, '0')}
                </td>
                <td className="px-8 py-5">
                  <span className="text-[14.5px] font-bold text-[#1e4e85] group-hover:text-blue-700">{item.course}</span>
                </td>
                <td className="px-8 py-5 text-right pr-12">
                  <span className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-blue-50 text-[#1e4e85] font-black text-[13px] min-w-[50px] border border-blue-100 shadow-sm">
                    {item.intake}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CoursesIntake: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const totalUG = ugCourses.reduce((sum, c) => sum + c.intake, 0);
  const totalPG = pgCourses.reduce((sum, c) => sum + c.intake, 0);
  const totalMgmt = mgmtCourses.reduce((sum, c) => sum + c.intake, 0);
  const grandTotal = totalUG + totalPG + totalMgmt;

  return (
    <PageLayout>
      <PageBanner
        title="Courses and Intake"
        breadcrumbs={[{ label: 'Courses and Intake' }]}
      />

      <div className="bg-[#eff3f8] min-h-screen font-sans py-6 md:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-[420px] lg:sticky lg:top-32 shrink-0">
            {/* Top Navigation Component */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/40 overflow-hidden border border-slate-200">
              <SidebarItem 
                icon={Layers} 
                title="All Program Course" 
                active={activeTab === 'all'} 
                onClick={() => setActiveTab('all')}
              />
              <div className="divide-y divide-slate-50">
                <SidebarItem 
                  icon={GraduationCap} 
                  title="Under Graduate Course" 
                  active={activeTab === 'ug'} 
                  onClick={() => setActiveTab('ug')}
                />
                <SidebarItem 
                  icon={BookOpen} 
                  title="Post Graduate Program" 
                  active={activeTab === 'pg'} 
                  onClick={() => setActiveTab('pg')}
                />
                <SidebarItem 
                  icon={Briefcase} 
                  title="Management Course Program" 
                  active={activeTab === 'mgmt'} 
                  onClick={() => setActiveTab('mgmt')}
                />
              </div>
            </div>
          </aside>

          {/* Main Column - Program Tables */}
          <main className="flex-1 w-full">
            <div className="space-y-12">
              {(activeTab === 'all' || activeTab === 'ug') && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#1e4e85] uppercase tracking-tight">Under Graduate Program</h4>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  <CourseTable courses={ugCourses} startIndex={1} />
                </section>
              )}
              
              {(activeTab === 'all' || activeTab === 'pg') && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#1e4e85] uppercase tracking-tight">Post Graduate Program</h4>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  <CourseTable courses={pgCourses} startIndex={ugCourses.length + 1} />
                </section>
              )}

              {(activeTab === 'all' || activeTab === 'mgmt') && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#1e4e85] uppercase tracking-tight">Management Program</h4>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  <CourseTable courses={mgmtCourses} startIndex={ugCourses.length + pgCourses.length + 1} />
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default CoursesIntake;
