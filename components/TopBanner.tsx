import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 text-brand-blue border-b-4 border-brand-blue relative overflow-hidden print:hidden">
       {/* Decorative Background Pattern */}
       <div className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{backgroundImage: 'radial-gradient(circle, #003366 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
       </div>

       <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          {/* Logo - Left */}
          <div className="hidden md:flex w-24 h-24 flex-shrink-0 items-center justify-center ml-8">
             <img 
               src="/images/WhatsApp-Image-2024-10-21-at-9.32.04-AM-150x150.jpeg" 
               alt="VCET Logo" 
               className="w-20 h-20 object-contain transform hover:scale-105 transition-transform duration-300"
               style={{ mixBlendMode: 'multiply' }}
             />
          </div>

          {/* Center Text */}
          <div className="text-center flex-grow">
             <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-2 text-brand-blue leading-tight">
                Vidyavardhini's College of Engineering & Technology, Vasai Road
             </h1>
             <h2 className="text-lg md:text-2xl font-bold mb-3 text-brand-blue/90 font-sans tracking-wide">
                विद्यावर्धिनीचे अभियांत्रिकी आणि तंत्रज्ञान महाविद्यालय, वसई रोड
             </h2>
             <p className="text-xs md:text-sm font-semibold text-slate-600 mb-3 max-w-3xl mx-auto leading-relaxed">
                (Approved by AICTE, DTE Maharashtra and Affiliated to University of Mumbai)
             </p>
             <div className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-md">
                <span>NBA Accredited</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>NAAC Accredited A+ Grade</span>
             </div>
          </div>
          
           {/* Logo Placeholder - Right (Optional balance or another badge) */}
           <div className="hidden md:flex w-24 h-24 flex-shrink-0 items-center justify-center">
             {/* Using a placeholder for DTE or AICTE logo representation */}
              <div className="w-20 h-20 flex items-center justify-center opacity-80">
                  <div className="text-center">
                       <div className="w-12 h-12 border-2 border-brand-blue/30 mx-auto mb-1 rounded flex items-center justify-center rotate-45">
                          <div className="w-8 h-8 border border-brand-blue/30 -rotate-45 bg-brand-blue/5"></div>
                       </div>
                  </div>
              </div>
           </div>
       </div>
    </div>
  );
};

export default TopBanner;