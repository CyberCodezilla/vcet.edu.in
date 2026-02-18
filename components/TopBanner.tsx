import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 text-brand-blue border-b-4 border-brand-blue relative overflow-hidden print:hidden">
       {/* Removed the background pattern to match the cleaner reference style */}

       <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          {/* Logo - Left */}
          <div className="hidden md:flex w-24 h-24 flex-shrink-0 items-center justify-center">
             <img 
               src="/Images/VCET logo.jpeg" 
               alt="VCET Logo" 
               className="w-20 h-20 object-contain"
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
          
           {/* Logo Placeholder - Right (REMOVED as requested) */}
           <div className="hidden md:flex w-24 h-24 flex-shrink-0"></div>
       </div>
    </div>
  );
};

export default TopBanner;