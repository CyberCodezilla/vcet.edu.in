import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-dark text-white pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-brand-blue/20 pb-12">
          
          {/* MENU Column */}
          <div>
             <h3 className="font-bold uppercase tracking-widest mb-4 text-white text-base">Menu</h3>
             <ul className="space-y-2 text-blue-200/60 text-sm">
               <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Mandatory Disclosure</a></li>
               <li><a href="#" className="hover:text-white transition-colors">German Language Club</a></li>
               <li><a href="#" className="hover:text-white transition-colors">FRA FEE PROPOSAL 2025-26 – ENGG</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Fee Approved by FRA for 25-26</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Fee Approved by FRA for 24-25</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Fee Proposal for 2024-25 Engineering</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Fee Proposal for 2025-26 Engineering</a></li>
               <li><a href="#" className="hover:text-white transition-colors">FRA FEE PROPOSAL 2025-26 – ME</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Fee Proposal for 2024-25 ME</a></li>
               <li><a href="#" className="hover:text-white transition-colors">FRA FEE PROPOSAL 2025-26 – MBA</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Audited Statement</a></li>
               <li><a href="#" className="hover:text-white transition-colors">EOA 1994-till-2011-2012</a></li>
               <li><a href="#" className="hover:text-white transition-colors">EOA 2012-13 till 2024-25</a></li>
               <li><a href="#" className="hover:text-white transition-colors">EOA Report 25-26</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Certificate – Medium of Instruction</a></li>
             </ul>
          </div>

          {/* USEFUL LINKS Column */}
          <div>
             <h3 className="font-bold uppercase tracking-widest mb-4 text-white text-base">Useful Links</h3>
             <ul className="space-y-2 text-blue-200/60 text-sm">
               <li><a href="#" className="hover:text-white transition-colors">Procedure for Student Educational Verification.</a></li>
               <li><a href="https://mu.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mumbai University.</a></li>
               <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AICTE</a></li>
               <li><a href="https://dte.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">DTE</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Helpline for Divyagjan</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Online Grievance Form</a></li>
               <li><a href="#" className="hover:text-white transition-colors">AICTE FeedBack</a></li>
               <li><a href="#" className="hover:text-white transition-colors">VCET HR policy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Institute Research Policy</a></li>
             </ul>
          </div>

          {/* CONTACT Column */}
          <div>
             <h3 className="font-bold uppercase tracking-widest mb-4 text-white text-base">Contact</h3>
             <ul className="space-y-3 text-blue-200/60 text-sm">
               <li className="flex gap-3">
                 <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                 <span>K.T. Marg, Vartax College Campus, Vasai Road (W), Dist-Palghar, Vasai, Maharashtra 401202</span>
               </li>
               <li className="flex gap-3">
                 <Phone className="w-5 h-5 flex-shrink-0" />
                 <div>
                   <div>+917972019446 +917558351747</div>
                   <div>0250 233 8234 (6 Lines)</div>
                 </div>
               </li>
             </ul>
             
             {/* Social Media Links */}
             <div className="mt-4 space-y-1.5">
               <a href="#" className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors">
                 <Facebook className="w-5 h-5" />
                 <span className="text-sm">Facebook</span>
               </a>
               <a href="#" className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors">
                 <Instagram className="w-5 h-5" />
                 <span className="text-sm">Instagram</span>
               </a>
               <a href="#" className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors">
                 <Linkedin className="w-5 h-5" />
                 <span className="text-sm">Linkedin</span>
               </a>
               <a href="#" className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors">
                 <Youtube className="w-5 h-5" />
                 <span className="text-sm">Youtube</span>
               </a>
               <a href="mailto:vcet_inbox@vcet.edu.in" className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors">
                 <Mail className="w-5 h-5" />
                 <span className="text-sm">vcet_inbox@vcet.edu.in</span>
               </a>
             </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-4 text-white text-base">Newsletter</h3>
            <p className="text-blue-200/60 text-sm mb-3">Subscribe to get the latest updates.</p>
            <div className="flex border-b border-blue-900 pb-2">
              <input type="email" placeholder="Your email" className="bg-transparent w-full outline-none text-white placeholder-blue-200/30" />
              <button className="text-blue-400 hover:text-white">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h3 className="font-bold uppercase tracking-widest mb-4 text-white text-base">Find Us</h3>
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-brand-blue/20">
            <iframe
              src="https://www.google.com/maps?q=Vidyavardhini's+College+of+Engineering+and+Technology,+K.T.+Marg,+Vasai+Road+West,+Palghar,+Maharashtra+401202&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VCET College Location"
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-blue-200/40 uppercase tracking-widest">
           <p>© Copyright 2025 VCET All Rights Reserved.</p>
           <p>Designed by VCET</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;