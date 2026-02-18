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
    image: "/Images/achievements/achievement1.jpg"
  },
  {
    id: 2,
    title: "VCET KABADDI TEAM Runners Up",
    description: "At MIT WPU PUNE NATIONAL LEVEL \"SUMMIT\" CHAMPIONSHIP 2025.",
    image: "/Images/achievements/achievement2.jpg"
  },
  {
    id: 3,
    title: "Grant from AICTE",
    description: "Congratulations to Department of Mechanical Engineering and Team VCET SGLECTHON for receiving Grant of Rs 1 lakh form AICTE under SPICES",
    image: "/Images/achievements/achievement3.jpg"
  },
  {
    id: 4,
    title: "Avishkar 2nd Rank",
    description: "Avishkar secured 2nd rank final round University level. Project- Optimized WiFi based Control System for Pond Aerators in Shrimp Farming.",
    image: "/Images/achievements/achievement4.jpg"
  },
  {
    id: 5,
    title: "MoU with IITM Pune",
    description: "Memorandum of Understanding (MoU) between IITM Pune and VCET Installation of Short-Range X-Band Polarimetric Scanning Doppler Weather Radar at VCET.",
    image: "/Images/achievements/achievement5.jpg"
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous achievements"
          >
            <ChevronLeft className="w-6 h-6 text-brand-dark" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
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
                  <div className="group relative bg-brand-dark h-80 overflow-hidden border border-brand-blue/20">
                    {/* Image Container */}
                    <div className="relative h-full overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300/003366/FFFFFF?text=Achievement';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                      
                      {/* Yellow Overlay with Text */}
                      <div className="absolute inset-0 bg-yellow-400/90 flex flex-col justify-center items-center p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-brand-dark mb-3 uppercase">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-brand-dark leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Top Border on Hover */}
                    <div className="absolute top-0 left-0 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-in-out" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
