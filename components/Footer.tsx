import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { resolveBackendHref } from '../utils/uploadedAssets';
import { get } from '../services/api';

type FooterMenuItem = {
  label: string;
  href: string;
  external: boolean;
};

type FooterPageResponse = {
  data?: {
    items?: Array<Record<string, unknown>>;
  } | Record<string, unknown>;
};

const STATIC_MENU_ITEMS: FooterMenuItem[] = [
  { label: 'Home', href: '/', external: false },
  { label: 'Mandatory Disclosure', href: '/pdfs/Facilities/FOOTER/Mandatory-Disclosure-as-On-December-2025-FINAL.pdf', external: true },
  { label: 'German Language Club', href: '/german-language-club', external: false },
  { label: 'FRA FEE PROPOSAL 2025-26 - ENGG', href: '/pdfs/Facilities/FOOTER/FRA-FEE-PROPOSAL-2025-26-ENGG.pdf', external: true },
  { label: 'FRA FEE PROPOSAL 2025-26-ME', href: '/pdfs/Facilities/FOOTER/FRA-FEE-PROPOSAL-2025-26-ME.pdf', external: true },
  { label: 'FRA FEE PROPOSAL 2025-26-MBA', href: '/pdfs/Facilities/FOOTER/FRA-FEE-PROPOSAL-2025-26-MBA.pdf', external: true },
  { label: 'Fee Approved By FRA for 25-26', href: '/pdfs/Facilities/FOOTER/FRA-Fee-2025-26-17.7.25.pdf', external: true },
  { label: 'Audited Statement', href: '/audited-statement', external: false },
  { label: 'EOA 1994 to 2024', href: '/pdfs/Facilities/FOOTER/EOA-1994-2024.pdf', external: true },
  { label: 'EOA Report 25-26', href: '/pdfs/Facilities/FOOTER/EOA-Report-2025-2026.pdf', external: true },
  { label: 'Certificate - Medium of Instruction', href: '/pdfs/Facilities/FOOTER/Medium-of-Instruction-Cert.pdf', external: true },
];

const DEFAULT_AUDITED_STATEMENT_LABELS = new Set([
  'Audited Statement 2019-2020',
  'Audited Statement 2020-2021',
  'Audited Statement 2021-2022',
  'Audited Statement 2022-2023',
  'Audited Statement 2023-2024',
  'Audited Statement 2024-2025',
]);

const toText = (value: unknown): string => (typeof value === 'string' ? value : '');

const normalizeFooterAuditedItems = (raw: unknown): FooterMenuItem[] => {
  if (!raw || typeof raw !== 'object') {
    return [];
  }

  const data = raw as Record<string, unknown>;
  const items = Array.isArray(data.items) ? data.items : [];

  return items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => {
      const fileObj = item.file && typeof item.file === 'object' ? (item.file as Record<string, unknown>) : null;
      const href = toText(item.href) || toText(item.fileUrl) || toText(item.url) || toText(fileObj?.url);
      const label = toText(item.label).trim();

      return {
        label: label || 'Audited Statement PDF',
        href,
        external: true,
      };
    })
    .filter((item) => !DEFAULT_AUDITED_STATEMENT_LABELS.has(item.label))
    .filter((item) => Boolean(item.href));
};

const Footer: React.FC = () => {
  const DEFAULT_COPYRIGHT_YEAR = 2026;
  const [currentYear, setCurrentYear] = useState<number>(DEFAULT_COPYRIGHT_YEAR);
  const [auditedStatementMenuItems, setAuditedStatementMenuItems] = useState<FooterMenuItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const resolveServerYear = async () => {
      try {
        const response = await fetch(window.location.origin, {
          method: 'HEAD',
          cache: 'no-store',
        });
        const serverDate = response.headers.get('date');
        if (!serverDate) return;
        const parsed = new Date(serverDate);
        if (Number.isNaN(parsed.getTime())) return;
        if (mounted) {
          setCurrentYear(parsed.getUTCFullYear());
        }
      } catch {
        // Keep default year when server date cannot be resolved.
      }
    };

    resolveServerYear();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAuditedStatementItems = async () => {
      try {
        const response = await get<FooterPageResponse>('/pages/footer/audited-statement');
        if (!mounted) return;
        setAuditedStatementMenuItems(normalizeFooterAuditedItems(response?.data));
      } catch {
        if (!mounted) return;
        setAuditedStatementMenuItems([]);
      }
    };

    loadAuditedStatementItems();

    return () => {
      mounted = false;
    };
  }, []);

  const menuItems = useMemo(() => {
    if (auditedStatementMenuItems.length === 0) {
      return STATIC_MENU_ITEMS;
    }

    const auditedStatementIndex = STATIC_MENU_ITEMS.findIndex((item) => item.href === '/audited-statement');
    if (auditedStatementIndex === -1) {
      return [...STATIC_MENU_ITEMS, ...auditedStatementMenuItems];
    }

    return [
      ...STATIC_MENU_ITEMS.slice(0, auditedStatementIndex + 1),
      ...auditedStatementMenuItems,
      ...STATIC_MENU_ITEMS.slice(auditedStatementIndex + 1),
    ];
  }, [auditedStatementMenuItems]);

  return (
    <footer id="footer" className="bg-brand-dark text-white relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue"></div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">
          
          {/* MENU Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-brand-gold">Menu</h3>
            <ul className="space-y-2.5">
              {menuItems.map((item, idx) => (
                <li key={`${item.label}-${item.href}-${idx}`}>
                  <a
                    href={resolveBackendHref(item.href)}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-white/40 text-[13px] hover:text-white hover:pl-1 transition-all duration-300 block break-words leading-snug"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* USEFUL LINKS Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-brand-gold">Useful Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Procedure for Student Educational Verification.', href: 'https://vcet.edu.in/wp-content/uploads/2021/11/Educational_verification-1-1.pdf', external: true },
                { label: 'Mumbai University', href: 'https://mu.ac.in/', external: true },
                { label: 'AICTE', href: 'https://www.aicte-india.org/', external: true },
                { label: 'DTE Maharashtra', href: 'https://dte.maharashtra.gov.in/', external: true },
                { label: 'Helpline for Divyagjan', href: '/helpline-for-divyangjan', external: false },
                { label: 'Online Grievance Form', href: 'https://docs.google.com/forms/d/e/1FAIpQLSe5gwVSZDJS4B4a9tCQsoaBgnGBoaH0xzveLpA0bTaoPgIByg/viewform', external: true },
                { label: 'AICTE Feedback', href: '#', external: false },
                { label: 'VCET HR policy', href: 'https://vcet.edu.in/NAAC/VCET_HR_POLICY.pdf', external: true },
                { label: 'Institute Research Policy', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/Institute-Research-Policy.pdf', external: true },
                { label: 'Development Team', href: '/developers', external: false },
              ].map((item) => (
                <li key={item.label}>
                  <a 
                    href={resolveBackendHref(item.href)} 
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-white/40 text-[13px] hover:text-white hover:pl-1 transition-all duration-300 flex items-start gap-1.5 min-w-0"
                  >
                    <span className="break-words leading-snug">{item.label}</span>
                    {item.external && <ExternalLink className="w-3 h-3 opacity-40" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-brand-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-gold/60" />
                <span className="text-white/40 text-[13px] leading-relaxed">
                  K.T. Marg, Vasai Road (W),<br/>Dist-Palghar, Maharashtra 401202
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-gold/60" />
                <div className="text-white/40 text-[13px]">
                  <div>+91 797 201 9446</div>
                  <div>0250 233 8234</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand-gold/60" />
                <a href="mailto:vcet_inbox@vcet.edu.in" className="text-white/40 text-[13px] hover:text-white transition-colors">
                  vcet_inbox@vcet.edu.in
                </a>
              </li>
            </ul>
             
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/vcet.vasai.50/' },
                { icon: Instagram, href: 'https://www.instagram.com/official.vcet/' },
                { icon: Linkedin, href: 'https://www.linkedin.com/school/vcetvasai/' },
                { icon: Youtube, href: 'https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg' },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-brand-gold">Newsletter</h3>
            <p className="text-white/40 text-[13px] mb-4 leading-relaxed">
              Stay updated with the latest news, events, and announcements from VCET.
            </p>
            <div className="flex rounded-lg overflow-hidden bg-white/5 border border-white/10 focus-within:border-brand-gold/40 transition-colors">
              <input id="footer-1" name="footer-1" aria-label="footer field" 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent w-full px-4 py-3 outline-none text-sm text-white placeholder-white/20" 
              />
              <button className="px-4 text-brand-gold hover:text-white hover:bg-brand-gold transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="mb-12 rounded-xl overflow-hidden border border-white/5">
          <iframe
            src="https://www.google.com/maps?q=Vidyavardhini's+College+of+Engineering+and+Technology,+K.T.+Marg,+Vasai+Road+West,+Palghar,+Maharashtra+401202&output=embed"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="VCET College Location"
            className="w-full opacity-80 hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-[11px] text-white/25 uppercase tracking-widest">
          <p>&copy; {currentYear} VCET. All Rights Reserved.</p>
          <Link
            to="/developers"
            className="mt-2 md:mt-0 text-white/60 hover:text-white transition-all duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]"
          >
            Designed by VCET Developer's Team
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
