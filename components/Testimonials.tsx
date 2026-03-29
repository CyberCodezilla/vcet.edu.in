import React from 'react';
import { Quote } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  position: string;
  company: string;
  image: string | null;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "The four years at VCET has been an amazing experience. The diverse coursework gave me the opportunity to explore multiple fields and helped me to decide the field for higher studies. The EXTC department is very helpful and encouraged me to pursue my Masters overseas. This helped me to enhance my soft skills and leadership qualities.",
    name: "Vinit Kanvinde",
    position: "Network Engineer",
    company: "Google",
    image: "/Images/testimonials/Vinit Kanvinde.jpg"
  },
  {
    id: 2,
    text: "I am extremely proud to be an alumnus of VCET, a very agile institution. The experiences gained during my days at VCET has made me what I am today. The enthusiasm, the rigor and the perseverance has been ingrained from the day one and continues to stay with me.",
    name: "Dr Amrita M A",
    position: "Manager Learning Studio",
    company: "I-Nurture Solutions",
    image: "/Images/testimonials/Dr Amrita M A.jpg"
  },
  {
    id: 3,
    text: "I am a proud alumnus of this esteemed institution VCET. The state-of-art infra along with highly qualified and experienced professors makes this institute great in all terms.",
    name: "Amit Verma",
    position: "Product And Process Manager",
    company: "BillDesk",
    image: "/Images/testimonials/Amit Verma.jpg"
  },
  {
    id: 4,
    text: "The journey at VCET as part of the instrumentation course was truly enriching and enjoyable. It laid a strong foundation for our all-round development as professionals. The instrumentation department was built on solid fundamentals giving exposure to students across core streams.",
    name: "Anish Patki",
    position: "General Manager",
    company: "Marketing",
    image: "/Images/testimonials/Anish Patki.jpg"
  }
];

const Testimonials: React.FC = () => {
  const { testimonials: apiTestimonials, loading } = useTestimonials();
  
  // Use API data if available, otherwise fallback to static data
  const displayTestimonials = apiTestimonials.length > 0 ? apiTestimonials.map(t => ({
    id: t.id,
    text: t.text,
    name: t.name,
    position: t.role || '',
    company: '', // Backend doesn't have company distinct from role yet
    image: t.photo || null
  })) : testimonials;
  return (
    <section id="testimonials" className="py-10 md:py-16 bg-brand-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] bg-brand-blue/[0.03] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-brand-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Alumni Voices</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy">
            What Our Alumni Say
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col border border-gray-50 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <Quote className="w-4 h-4 text-brand-gold" />
              </div>

              {/* Quote text — full, no truncation */}
              <div className="flex-grow mb-6 pr-8">
                <p className="text-slate-600 text-sm leading-[1.85]">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/20 flex-shrink-0 group-hover:ring-brand-gold transition-all duration-500">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%231B3A5C"/%3E%3Ctext fill="%23D4A843" font-family="Inter" font-size="36" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3E?%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-brand-navy text-brand-gold text-lg font-bold">
                      ?
                    </div>
                  )}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
