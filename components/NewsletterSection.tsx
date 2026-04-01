import React, { useState, useEffect } from 'react';
import { newsletterApi } from '../admin/api/newsletterApi';
import type { Newsletter } from '../admin/types';

interface NewsletterSectionProps {
  departmentName: string;
  departmentId: string | number;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ departmentName, departmentId }) => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    newsletterApi.list(departmentId)
      .then((res) => {
        setNewsletters(res.data);
      })
      .catch((err) => {
        console.error('Failed to load newsletters:', err);
      })
      .finally(() => setLoading(false));
  }, [departmentId]);

  return (
    <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col min-h-[400px]">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brand-gold" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{departmentName}</span>
      </div>
      <h3 className="text-2xl font-bold text-brand-navy mb-8 relative inline-block w-fit">
        Department Newsletters
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
      </h3>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="w-8 h-8 border-4 border-slate-100 border-t-brand-navy rounded-full animate-spin" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Publications...</p>
        </div>
      ) : newsletters.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center py-10">
          <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4 text-brand-navy">
             <i className="ph ph-newspaper text-3xl" />
          </div>
          <h4 className="text-lg font-bold text-brand-navy mb-2">No Newsletters Yet</h4>
          <p className="text-slate-500 text-sm max-w-sm">
            We are working on compiling updates and stories for {departmentName}. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((n) => (
            <article key={n.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-navy/5 hover:-translate-y-1 transition-all duration-300 relative">
              
              {/* Image Banner */}
              <div className="w-full aspect-video bg-slate-100 overflow-hidden relative">
                {n.image ? (
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-brand-navylight">
                     <i className="ph ph-newspaper text-4xl mb-2 opacity-50" />
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-brand-navy rounded shadow-sm text-[10px] font-bold tracking-wider uppercase">
                  {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Content box */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-lg font-bold text-brand-navy mb-2 line-clamp-2 leading-tight group-hover:text-brand-gold transition-colors">
                  {n.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">
                  {n.description}
                </p>
                
                {n.pdf ? (
                  <a 
                    href={n.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-brand-navylight text-brand-navy font-bold text-xs rounded-xl hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    <span>Read Edition</span>
                    <i className="ph ph-arrow-right text-sm" />
                  </a>
                ) : (
                  <div className="w-full text-center py-2.5 bg-slate-50 text-slate-400 font-bold text-xs rounded-xl">
                    PDF Unavailable
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsletterSection;
