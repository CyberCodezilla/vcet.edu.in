import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Best Faculty Award",
    description: "Congratulations to Prof. Deepak Chaudhary Won best faculty award in St.VC 2025, Coimbatore",
    image: "/Images/Remarkable Acheivements/Prof.Deepak Chaudhary.png"
  },
  {
    id: 2,
    title: "VCET KABADDI TEAM Runners Up",
    description: "At MIT WPU PUNE NATIONAL LEVEL \"SUMMIT\" CHAMPIONSHIP 2025.",
    image: "/Images/Remarkable Acheivements/VCET KABADDI TEAM Runners Up.png"
  },
  {
    id: 3,
    title: "Grant from AICTE",
    description: "Congratulations to Department of Mechanical Engineering and Team VCET SGLECTHON for receiving Grant of Rs 1 lakh form AICTE under SPICES",
    image: "/Images/Remarkable Acheivements/Congratulations to Department of Mechanical Engineering and Team VCET SOLECTHON.png"
  },
  {
    id: 4,
    title: "Avishkar 2nd Rank",
    description: "Avishkar secured 2nd rank final round University level. Project- Optimized WiFi based Control System for Pond Aerators in Shrimp Farming.",
    image: "/Images/Remarkable Acheivements/Avishkar secured 2nd rank final round(University Level.jpg"
  },
  {
    id: 5,
    title: "MoU with IITM Pune",
    description: "Memorandum of Understanding (MoU) between IITM Pune and VCET Installation of Short-Range X-Band Polarimetric Scanning Doppler Weather Radar at VCET.",
    image: "/Images/Remarkable Acheivements/Memorandum of Understanding (MoU) between IITM Pune and VCET.jpg"
  },
  {
    id: 6,
    title: "Team Airnova of VCET Secures 1st Place",
    description: "SkyGlider Competition at Ascension 2025, Technex IIT (BHU) Varanasi.",
    image: "/Images/Remarkable Acheivements/Team Airnova of VCET has secured 1st place ..png"
  },
  {
    id: 7,
    title: "Congratulations Miss Shyamli Jadhav (2019 Passout, Mechanical)",
    description: "Selected as Officer – Short Service Commission (SSC).",
    image: "/Images/Remarkable Acheivements/Congratulations Miss Shyamli Jadhav, (2019 passout) fMechanical..png"
  },
  {
    id: 8,
    title: "Grant of Patent Awarded",
    description: "Ms. Vaishali Shirshat and Ms. Pragati Patil awarded for innovation and patent grant.",
    image: "/Images/Remarkable Acheivements/Ms.Vaishali Shirsath and Ms.Pragati Patil..jpg"
  },
  {
    id: 9,
    title: "Dream Job Achiever – Jitendra Prajapati",
    description: "Placed in Perplexity with 1.06 Crore per annum package.",
    image: "/Images/Remarkable Acheivements/Jitendra Prajapati.jpg"
  },
  {
    id: 10,
    title: "5th Time National Champion",
    description: "1st Prize & 9 awards at Solar EV Championship 2025, Hindusthan College of Engineering, Coimbatore.",
    image: "/Images/Remarkable Acheivements/5th Time National Champion.png"
  },
  {
    id: 11,
    title: "Snehal Tate & Team – 1st Prize",
    description: "National Project Competition, Mumbai.",
    image: "/Images/Remarkable Acheivements/Snehal Tate and Team.png"
  },
  {
    id: 12,
    title: "Sanjeev Sharma & Team – 1st Prize",
    description: "National Project Competition, Mumbai.",
    image: "/Images/Remarkable Acheivements/Sanjeev Sharma & Team.png"
  },
  {
    id: 13,
    title: "Devanshi Solanki Secures 3rd Place",
    description: "Maharashtra State University Chess Tournament.",
    image: "/Images/Remarkable Acheivements/Devanshi-Solanki-1.jpg"
  },
  {
    id: 14,
    title: "Team Centurion – 11th Rank",
    description: "Quad Bike Design Challenge, Hyderabad.",
    image: "/Images/Remarkable Acheivements/Team Centurion.png"
  },
  {
    id: 15,
    title: "Tanvi Patil Wins 1st Place",
    description: "Carrom Singles at SKREAM 2025, KJ Somaiya College.",
    image: "/Images/Remarkable Acheivements/Tanvi Patil from SE Comps has Won First place in Carrom Singles.png"
  },
  {
    id: 16,
    title: "Shreyas Pathe Wins Gold Medal",
    description: "Badminton Men's Singles & Doubles, Clara's College of Commerce, 2025.",
    image: "/Images/Remarkable Acheivements/Shreyas Pathe TE IT won Gold Medal in Badminton Men's Singles and Doubles.png"
  },
  {
    id: 17,
    title: "Kishor Madne Wins Silver Medal",
    description: "Mumbai Suburban Zone II Tournament.",
    image: "/Images/Remarkable Acheivements/Kishor Madne SE IT.jpg"
  },
  {
    id: 18,
    title: "SIH 2023 Grand Finale Winner",
    description: "Team Softracer IT – VCET.",
    image: "/Images/Remarkable Acheivements/SIH 2023 Grand Finale.jpg"
  },
  {
    id: 19,
    title: "Palak Churi Selected for AIU",
    description: "Inter University National Mallakhamb Competition 2025–26.",
    image: "/Images/Remarkable Acheivements/Palak Churi TE Comps.jpg"
  },
  {
    id: 20,
    title: "Solar EV Team – Championship Excellence",
    description: "Continued dominance in national-level EV competitions.",
    image: "/Images/achievements/achievement20.jpg"
  },
  {
    id: 21,
    title: "Innovation Council Recognition",
    description: "Institutional Innovation Council acknowledged research excellence.",
    image: "/Images/achievements/achievement21.jpg"
  },
  {
    id: 22,
    title: "Student Research Patent Recognition",
    description: "VCET students granted intellectual property recognition.",
    image: "/Images/achievements/achievement22.jpg"
  },
  {
    id: 23,
    title: "AICTE Idea Lab Success",
    description: "Promoting innovation and startup culture among students.",
    image: "/Images/achievements/achievement23.jpg"
  },
  {
    id: 24,
    title: "Center of Excellence Initiative",
    description: "Strengthening industry-academia collaboration and advanced training.",
    image: "/Images/achievements/achievement24.jpg"
  }
];

const Achievements: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, achievements.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <div className="w-1 h-12 bg-yellow-400 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Remarkable Achievements
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 opacity-60 hover:opacity-100"
            aria-label="Previous achievements"
          >
            <ChevronLeft className="w-6 h-6 text-brand-dark" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group relative bg-white h-96 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-300 ease-out">
                    {/* Image Container with Gradient Overlay - Top Half */}
                    <div className="relative h-48 overflow-hidden bg-brand-dark">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/600x400/003366/FFFFFF?text=Achievement';
                        }}
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                      
                      {/* Title Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white uppercase leading-tight">
                          {achievement.title}
                        </h3>
                      </div>
                      
                      {/* Minimal Yellow Accent Bar */}
                      <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                    
                    {/* Text Content - Bottom Half */}
                    <div className="relative h-48 p-6 flex flex-col bg-white">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 max-w-[90%]" style={{ lineHeight: '1.7' }}>
                        {achievement.description}
                      </p>
                      
                      {/* Read More link on hover */}
                      <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center text-xs font-semibold text-brand-blue uppercase tracking-wider cursor-pointer">
                          <span className="w-8 h-px bg-yellow-400 mr-2"></span>
                          Read More
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 opacity-60 hover:opacity-100"
            aria-label="Next achievements"
          >
            <ChevronRight className="w-6 h-6 text-brand-dark" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-yellow-400 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
