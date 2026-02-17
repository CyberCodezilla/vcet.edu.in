import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-dark text-white pt-24 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-brand-blue/20 pb-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">VCET</h2>
            <p className="text-blue-200/60 text-sm leading-relaxed">
              Vidyavardhini's College of Engineering & Technology. K.T. Marg, Vasai Road (W), Dist-Palghar, Maharashtra - 401202.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 border border-blue-900 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-blue transition-all">
                 <Twitter className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 border border-blue-900 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-blue transition-all">
                 <Facebook className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 border border-blue-900 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-blue transition-all">
                 <Instagram className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 border border-blue-900 flex items-center justify-center rounded-full hover:bg-white hover:text-brand-blue transition-all">
                 <Linkedin className="w-4 h-4" />
               </a>
            </div>
          </div>

          <div>
             <h3 className="font-bold uppercase tracking-widest mb-8 text-white">Quick Links</h3>
             <ul className="space-y-4 text-blue-200/60">
               {['About Us', 'Admissions', 'Departments', 'Research', 'Alumni', 'Careers'].map(link => (
                 <li key={link}>
                   <a href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-block">{link}</a>
                 </li>
               ))}
             </ul>
          </div>

          <div>
             <h3 className="font-bold uppercase tracking-widest mb-8 text-white">Contact</h3>
             <ul className="space-y-4 text-blue-200/60 text-sm">
               <li>
                 <strong className="text-white block mb-1">Address:</strong>
                 K.T. Marg, Vasai Road (W),<br/> Palghar - 401202
               </li>
               <li>
                 <strong className="text-white block mb-1">Phone:</strong>
                 0250-2338234
               </li>
               <li>
                 <strong className="text-white block mb-1">Email:</strong>
                 vcet_inbox@vcet.edu.in
               </li>
             </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest mb-8 text-white">Newsletter</h3>
            <p className="text-blue-200/60 text-sm mb-4">Subscribe to get the latest updates.</p>
            <div className="flex border-b border-blue-900 pb-2">
              <input type="email" placeholder="Your email" className="bg-transparent w-full outline-none text-white placeholder-blue-200/30" />
              <button className="text-blue-400 hover:text-white">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-blue-200/40 uppercase tracking-widest">
           <p>© 2024 VCET. All rights reserved.</p>
           <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;