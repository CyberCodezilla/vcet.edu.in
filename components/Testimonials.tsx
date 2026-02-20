import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
    text: "The four years at VCET has been an amazing experience. The diverse coursework gave me the opportunity to explore multiple fields and helped me to decide the field for higher studies. The EXTC department is very helpful and encouraged me to pursue my Masters overseas. This helped me to enhance my soft skills and leadership qualities.",
    name: "Vinit Kanvinde",
    position: "Network Engineer",
    company: "Google",
    image: "/Images/testimonials/Vinit%20Kanvinde.jpg"
  },
  {
    id: 2,
    text: "I am extremely proud to be an alumnus of VCET, a very agile institution. The experiences gained during my days at VCET has made me what I am today. The enthusiasm, the rigor and the perseverance has been ingrained from the day one and continues to stay with me.",
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
    text: "The journey at VCET as part of the instrumentation course was truly enriching and enjoyable. It laid a strong foundation for our all-round development as professionals. The instrumentation department was built on solid fundamentals giving exposure to students across core streams.",
    name: "Anish Patki",
    position: "General Manager",
    company: "Marketing",
    image: "/Images/testimonials/Anish%20Patki.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else setItemsPerView(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  return (
    <section className="py-20 md:py-28 bg-brand-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-brand-gold"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Alumni Voices</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy">
              What Our Alumni Say
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue disabled:opacity-20 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue disabled:opacity-20 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-[360px] relative border border-gray-50">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-brand-gold" />
                  </div>
                  
                  {/* Quote text */}
                  <div className="flex-grow mb-6">
                    <p className="text-slate-600 text-sm leading-[1.8] line-clamp-4">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/20 flex-shrink-0 group-hover:ring-brand-gold transition-all duration-500">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%231B3A5C"/%3E%3Ctext fill="%23D4A843" font-family="Inter" font-size="36" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3E?%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-sm group-hover:text-brand-blue transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-brand-gold w-6'
                  : 'bg-gray-300 w-1.5 hover:bg-gray-400'
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
