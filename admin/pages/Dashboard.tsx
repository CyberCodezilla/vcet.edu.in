import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { noticesApi } from '../api/notices';
import { eventsApi } from '../api/events';
import { placementsApi } from '../api/placements';
import { enquiriesApi } from '../api/enquiries';
import { useAuth } from '../context/AuthContext';
import type { Notice, Event, Placement, Enquiry } from '../types';

/* ── Icons (inline SVGs) ──────────────────────────────────────────────────── */

const NoticeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CheckSquareIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrendUpIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const AtIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);
const UserPlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);
const ImagePlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /><line x1="12" y1="5" x2="12" y2="9" /><line x1="10" y1="7" x2="14" y2="7" />
  </svg>
);
const IdCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M7 20c0-3.3 2.7-6 6-6" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

/* ── Stat Card ─────────────────────────────────────────────────────────────── */

interface StatCardProps {
  label: string;
  value: number | string;
  to: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, to, icon, iconBg, trend }) => (
  <Link
    to={to}
    className="group bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
  >
    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-slate-400 text-xs font-medium">{label}</p>
      <p className="text-2xl font-bold text-[#0F172A] mt-0.5">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <TrendUpIcon />
          <span className="text-emerald-500 text-xs font-medium">{trend}</span>
        </div>
      )}
    </div>
  </Link>
);

/* ── Dashboard ─────────────────────────────────────────────────────────────── */

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      noticesApi.list().then((r) => setNotices(r.data)),
      eventsApi.list().then((r) => setEvents(r.data)),
      placementsApi.list().then((r) => setPlacements(r.data)),
      enquiriesApi.list().then((r) => setEnquiries(r.data)),
    ]).finally(() => setLoading(false));
  }, []);

  const visibleNotices = notices.filter((notice) => !notice.deleted_at);
  const recentNotices = visibleNotices.slice(0, 5);
  const recentEvents = events.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* ── Top header bar ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <a
            href="https://vcet-edu-in.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1d4ed8] font-bold text-sm mb-3 transition-colors group"
          >
            <ExternalLinkIcon />
            <span className="group-hover:underline underline-offset-4">Visit Website</span>
          </a>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">
            Welcome back, <span className="text-[#2563EB]">{user?.full_name?.split(' ')[0] ?? 'Admin'} 👋</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">Here's what's happening today at VCET.</p>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Notices"
          value={loading ? '–' : visibleNotices.length}
          to="/admin/notices"
          icon={<NoticeIcon />}
          iconBg="bg-blue-50 text-[#2563EB]"
          trend="+12% from last month"
        />
        <StatCard
          label="Total Events"
          value={loading ? '–' : events.length}
          to="/admin/events"
          icon={<CalendarIcon />}
          iconBg="bg-emerald-50 text-emerald-500"
          trend="+5.4% from last month"
        />
        <StatCard
          label="Total Enquiries"
          value={loading ? '–' : enquiries.length}
          to="/admin/enquiries"
          icon={<CheckSquareIcon />}
          iconBg="bg-amber-50 text-amber-500"
          trend="+2% year-on-year"
        />
      </div>

      {/* ── Quick Actions ── */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0F172A]">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link to="/admin/notices/new" className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
              <PlusIcon />
            </div>
            <span className="text-sm font-semibold text-slate-700">Add Notice</span>
          </Link>
          <Link to="/admin/events/new" className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
              <CalendarIcon />
            </div>
            <span className="text-sm font-semibold text-slate-700">Create Event</span>
          </Link>
          <Link to="/admin/gallery/new" className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300">
              <ImagePlusIcon />
            </div>
            <span className="text-sm font-semibold text-slate-700">Upload Gallery</span>
          </Link>
          <Link to="/admin/placements/new" className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
              <IdCardIcon />
            </div>
            <span className="text-sm font-semibold text-slate-700">Add Placement</span>
          </Link>
          <Link to="/admin/users/new" className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
              <UserPlusIcon />
            </div>
            <span className="text-sm font-semibold text-slate-700">New User</span>
          </Link>
        </div>
      </div>

      {/* ── Recent data panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notices */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#0F172A] font-semibold flex items-center gap-2">
              <span className="text-lg">🔔</span> Recent Notices
            </h2>
            <Link to="/admin/notices" className="text-[#2563EB] text-xs font-semibold hover:underline underline-offset-4">View all</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-[#2563EB] rounded-full animate-spin" />
            </div>
          ) : recentNotices.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#2563EB]/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <p className="text-slate-700 font-semibold text-sm">No notices yet</p>
              <p className="text-slate-400 text-xs mt-1 max-w-[240px] mx-auto">Start communicating with students and faculty by creating your first notice.</p>
              <Link
                to="/admin/notices/new"
                className="inline-block mt-4 px-5 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-xl text-xs font-bold hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                Create First Notice
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {recentNotices.map((n) => (
                <li key={n.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.is_active ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-700 text-sm font-medium truncate">{n.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{new Date(n.created_at).toLocaleDateString()}</p>
                  </div>
                  {n.type !== 'general' && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase mt-1">
                      {n.type}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Events */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#0F172A] font-semibold flex items-center gap-2">
              <span className="text-lg">🎉</span> Upcoming Events
            </h2>
            <Link to="/admin/events" className="text-[#2563EB] text-xs font-semibold hover:underline underline-offset-4">View all</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-[#2563EB] rounded-full animate-spin" />
            </div>
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="text-slate-700 font-semibold text-sm">No events yet</p>
              <p className="text-slate-400 text-xs mt-1 max-w-[260px] mx-auto">Your calendar is empty. Schedule upcoming seminars, fests, or guest lectures.</p>
              <Link
                to="/admin/events/new"
                className="inline-block mt-4 px-5 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-xl text-xs font-bold hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                Schedule Event
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {recentEvents.map((ev) => (
                <li key={ev.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${ev.is_active ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-700 text-sm font-medium truncate">{ev.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{ev.date}</p>
                  </div>
                  {ev.is_featured && (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase mt-1">Featured</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Newsletters */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#0F172A] font-semibold flex items-center gap-2">
                <span className="text-lg">📰</span> Newsletters
              </h2>
              <Link to="/admin/pages/departments/newsletter" className="text-[#2563EB] text-xs font-semibold hover:underline underline-offset-4">Manage</Link>
            </div>
            
            <div className="text-center py-6 mt-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-slate-700 font-semibold text-sm">Department Magazines</p>
              <p className="text-slate-400 text-xs mt-1 max-w-[200px] mx-auto">Publish, manage, and showcase monthly department newsletters.</p>
            </div>
          </div>
          
          <Link
            to="/admin/pages/departments/newsletter"
            className="mt-6 w-full py-2.5 bg-[#1e293b] hover:bg-[#0f172a] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            Access Newsletter System
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>

      {/* ── Bottom info cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Platform Update */}
        <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl p-5 text-white shadow-lg shadow-blue-200/40">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">Platform Update</p>
          <p className="text-base font-bold leading-snug">VCET Dashboard v2.4 is now live.</p>
          <p className="text-white/60 text-xs mt-3 flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            Release Notes <span className="text-sm">→</span>
          </p>
        </div>

        {/* Storage */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] rounded-2xl p-5 text-white shadow-lg shadow-slate-300/40">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-2">Storage</p>
          <p className="text-base font-bold leading-snug">64% of Gallery storage used.</p>
          <div className="mt-3">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[64%] bg-[#2563EB] rounded-full" />
            </div>
            <p className="text-white/40 text-[10px] mt-1.5">8.4 GB of 12 GB</p>
          </div>
        </div>

        {/* Website Visits */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-[#2563EB]">
              <ShareIcon />
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Live</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">2,481</p>
          <p className="text-slate-400 text-xs mt-0.5">Website Visits Today</p>
        </div>

        {/* Contact Inquiries */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center text-red-400">
              <AtIcon />
            </div>
            <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded-full uppercase">Alert</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">{loading ? '–' : enquiries.length}</p>
          <p className="text-slate-400 text-xs mt-0.5">New Contact Inquiries</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
