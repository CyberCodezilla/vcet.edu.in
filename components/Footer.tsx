import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-dark text-white relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue"></div>
      
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* MENU Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-brand-gold">Menu</h3>
            <ul className="space-y-2.5">
              {[
                'Home', 'Mandatory Disclosure', 'German Language Club',
                'FRA FEE PROPOSAL 2025-26 – ENGG', 'Fee Approved by FRA for 25-26',
                'Fee Approved by FRA for 24-25', 'Fee Proposal for 2024-25 Engineering',
                'Fee Proposal for 2025-26 Engineering', 'Audited Statement',
                'EOA Report 25-26', 'Certificate – Medium of Instruction'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-[13px] hover:text-white hover:pl-1 transition-all duration-300 block">
                    {item}
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
                { label: 'Student Educational Verification', href: '#', external: false },
                { label: 'Mumbai University', href: 'https://mu.ac.in/', external: true },
                { label: 'AICTE', href: 'https://www.aicte-india.org/', external: true },
                { label: 'DTE Maharashtra', href: 'https://dte.maharashtra.gov.in/', external: true },
                { label: 'Helpline for Divyagjan', href: '#', external: false },
                { label: 'Online Grievance Form', href: '#', external: false },
                { label: 'AICTE Feedback', href: '#', external: false },
                { label: 'VCET HR Policy', href: '#', external: false },
                { label: 'Institute Research Policy', href: '#', external: false },
              ].map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-white/40 text-[13px] hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5"
                  >
                    {item.label}
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
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
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
              <input 
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
          <p>&copy; 2025 VCET. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Designed by VCET</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
