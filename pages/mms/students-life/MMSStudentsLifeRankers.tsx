import React, { useState, useEffect, useMemo } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

// Fallback Data
const fallbackData = [
  ...[
    { name: 'VINAY MAHENDRA MAYEKAR', rank: '1st' },
    { name: 'VAKEKAR', rank: '2nd' },
    { name: 'SANKE MANSI SANJAY', rank: '3rd' },
  ].map(r => ({ ...r, semester: 'Semester I Rankers' })),
  ...[
    { name: 'VINAY MAHENDRA MAYEKAR', rank: '1st' },
    { name: 'SHAIKH SHIRFANA SAYEED', rank: '2nd' },
    { name: 'SANKE MANSI SANJAY', rank: '3rd' },
  ].map(r => ({ ...r, semester: 'Semester II Rankers' })),
  ...[
    { name: 'VINAY MAHENDRA MAYEKAR', rank: '1st' },
    { name: 'RAUT NEHA MAHESH', rank: '2nd' },
    { name: 'SHAIKH SHIRFANA SAYEED', rank: '2nd' },
    { name: 'AMBOKAR ANKITA SUBHASH', rank: '3rd' },
    { name: 'PUJARI OMKAR BHASKAR', rank: '3rd' },
  ].map(r => ({ ...r, semester: 'Semester III Rankers' })),
];

function RankersTable({ title, rows }: { title: string; rows: Array<{ name: string; rank: string }> }) {
  return (
    <section className="space-y-4">
      <h3 className="text-center text-2xl font-display font-bold text-brand-navy sm:text-3xl uppercase tracking-wider">{title}</h3>
      <div className="overflow-hidden border-2 border-[#1e3a5f] bg-white shadow-xl rounded-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white">
              <th className="w-[75%] border-b-2 border-r-2 border-[#1e3a5f] bg-[#2d4f78] px-4 py-4 text-left sm:text-center text-sm font-bold sm:text-[17px] tracking-wider">NAME OF THE STUDENT</th>
              <th className="w-[25%] border-b-2 border-[#1e3a5f] bg-[#2d4f78] px-4 py-4 text-center text-sm font-bold sm:text-[17px] tracking-wider">RANK</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${title}-${idx}`} className="bg-[#f8f9fa] hover:bg-slate-100 transition-colors">
                <td className="border-b border-r border-[#1e3a5f]/30 px-5 py-3 text-left sm:text-center text-sm font-bold text-slate-800 sm:text-[18px] uppercase">{row.name}</td>
                <td className="border-b border-[#1e3a5f]/30 px-5 py-3 text-center text-[16px] font-black text-[#8b6914] sm:text-[19px] drop-shadow-sm">{row.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function MMSStudentsLifeRankers() {
  const [data, setData] = useState<MMSStudentsLifeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: MMSStudentsLifeData }>('/pages/mms-students-life');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch students life data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

const dynamicRankers = data?.rankers || [];

  const groupedRankers = useMemo(() => {
    // Determine whether to use dynamic CMS list or default static fallbacks    
    const list = dynamicRankers.length > 0 ? dynamicRankers : fallbackData;     

    // Group records by semester key
    const map = new Map<string, Array<{ name: string; rank: string }>>();       
    list.forEach(r => {
      const s = r.semester || 'Achievers';
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push({ name: r.name, rank: r.rank });
    });

    // Return preserved order grouping array
    return Array.from(map.entries()).map(([title, rows]) => ({ title, rows })); 
  }, [dynamicRankers]);

  if (loading) {
    return (
      <MMSLayout title="Loading...">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">      
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
            <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">Loading Content...</div>
          </div>
        </div>
      </MMSLayout>
    );
  }

  return (
    <MMSLayout title="RANKERS & ACHIEVEMENTS">
      <div className="pt-8 pb-16 space-y-12 animate-fade-in max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-black text-brand-navy sm:text-5xl uppercase tracking-tight">RANKERS & ACHIEVEMENTS</h2>
          <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">
          {groupedRankers.map((group, idx) => (
            <div key={idx} className={idx === groupedRankers.length - 1 && groupedRankers.length % 2 !== 0 ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto w-full' : 'w-full'}>
              <RankersTable title={group.title} rows={group.rows} />
            </div>
          ))}
        </div>
      </div>
    </MMSLayout>
  );
}
