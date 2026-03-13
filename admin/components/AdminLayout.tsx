import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => (
  <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex">
    <Sidebar />
    {/* Main content — offset by sidebar width on large screens */}
    <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
      <div className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
);

export default AdminLayout;
