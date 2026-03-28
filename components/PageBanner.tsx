import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, breadcrumbs }) => {
  return (
    <>
      {/* ── Breadcrumb strip (below navbar) ── */}
      {breadcrumbs && (
        <nav className="bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy border-b border-brand-gold/20">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <a href="/" className="text-white/50 hover:text-brand-gold transition-colors duration-300">
                <Home className="w-4 h-4" />
              </a>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                  {crumb.href ? (
                    <a href={crumb.href} className="text-white/50 hover:text-brand-gold transition-colors duration-300">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-brand-gold font-medium">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* ── Main banner with title ── */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,67,0.08),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/[0.03] rounded-full translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-0 left-1/4 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-white/[0.02] rounded-full -translate-y-1/2" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 md:py-16 lg:py-24">
          {/* Title */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                {breadcrumbs?.[0]?.label || 'VCET'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>
    </>
  );
};

export default PageBanner;
