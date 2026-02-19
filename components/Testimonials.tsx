import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "The four years at VCET has been an amazing experience. The diverse coursework gave me the opportunity to explore multiple fields and helped me to decide the field for higher studies. The EXTC department is very helpful and encouraged me to pursue my Masters overseas. This helped me to enhance my soft skills and leadership qualities. The values I learned during my bachelor's degree at VCET left a huge impact on my life.",
    name: "Vinit Kanvinde",
    position: "Network Engineer",
    company: "Google",
    image: "/Images/testimonials/Vinit%20Kanvinde.jpg"
  },
  {
    id: 2,
    text: "I am extremely proud to be an alumnus of VCET, a very agile institution. The experiences gained during my days at VCET has made me what I am today. The enthusiasm, the rigor and the perseverance has been ingrained from the day one and continues to stay with me. I will be ever grateful to be a part of this institution.",
    name: "Dr Amrita M A",
    position: "Manager Learning Studio",
    company: "I-Nurture Solutions",
    image: "/Images/testimonials/Dr%20Amrita%20M%20A.jpg"
  },
  {
    id: 3,
    text: "I am a proud alumnus of this esteemed institution VCET. The state-of-art infra along with highly qualified and experienced professors makes this institute great in all terms.",
    name: "Amit Verma",
    position: "Product And Process Manager",
    company: "BillDesk",
    image: "/Images/testimonials/Amit%20Verma.jpg"
  },
  {
    id: 4,
    text: "The journey at VCET as part of the instrumentation course was truly enriching and enjoyable. It laid a strong foundation for our all-round development as professionals. The instrumentation department was built on solid fundamentals of giving exposure to students across core streams of electronics, process instrumentation and control systems as well as associated areas such as biomedical, neural networks, and robotics etc. to name a few.",
    name: "Anish Patki",
    position: "General Manager",
    company: "Marketing",
    image: "/Images/testimonials/Anish%20Patki.jpg"
  }
];

const Testimonials: React.FC = () => {
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

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <div className="w-1 h-12 bg-yellow-400 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Testimonials
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-yellow-400/20 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-yellow-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 opacity-60 hover:opacity-100"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-400" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group relative bg-white/95 backdrop-blur-sm h-[500px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col border-2 border-yellow-400/30 hover:border-yellow-400 rounded-3xl overflow-hidden">
                    {/* Yellow accent corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-bl-full" />
                    
                    {/* Testimonial Text */}
                    <div className="flex-grow mb-6 relative z-10">
                      <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-4" style={{ lineHeight: '1.7' }}>
                        "{testimonial.text}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-6 border-t-2 border-yellow-400/20 relative z-10">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-yellow-400 shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/100/003366/FFFFFF?text=Profile';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark text-lg group-hover:text-brand-blue transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">
                          {testimonial.position}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Decorative quote mark */}
                    <div className="absolute top-6 left-6 text-yellow-400/20 text-6xl font-serif leading-none">
                      "
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-yellow-400/20 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-yellow-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 opacity-60 hover:opacity-100"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-yellow-400" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-yellow-400 w-8'
                  : 'bg-white/30 w-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
