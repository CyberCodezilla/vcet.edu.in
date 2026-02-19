import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  type: 'blue' | 'yellow';
  link: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'AICTE IDEA Lab', type: 'blue', link: '#aicte' },
  { id: 2, title: 'Center of Excellence', type: 'blue', link: '#coe' },
  { id: 3, title: 'Machinery Diagnostics', type: 'yellow', link: '#machinery' },
  { id: 4, title: 'Texas Instruments Innovation Lab', type: 'yellow', link: '#texas' },
  { id: 5, title: 'Robotics', type: 'blue', link: '#robotics' },
  { id: 6, title: 'Siemens', type: 'blue', link: '#siemens' },
  { id: 7, title: 'Oracle Academy', type: 'yellow', link: '#oracle' },
  { id: 8, title: 'e-Yantra', type: 'yellow', link: '#eyantra' }
];

const Gallery: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Gallery images
  const galleryImages = [
    '/Images/gallery/Gallary_1.jpg',
    '/Images/gallery/Gallary_1.jpg',
    '/Images/gallery/Gallary_1.jpg'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <div className="w-1 h-12 bg-yellow-400 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative group overflow-hidden shadow-xl aspect-video">
            <img
              src={galleryImages[currentImageIndex]}
              alt="Gallery"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/1920x1080/003366/FFFFFF?text=Gallery+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'bg-yellow-400 w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Labs & Facilities Grid */}
          <div className="grid grid-cols-2 gap-4">
            {galleryItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className={`group relative h-28 flex items-center justify-center text-center p-4 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                  item.type === 'blue'
                    ? 'bg-gradient-to-br from-brand-dark to-brand-blue hover:from-brand-blue hover:to-brand-dark'
                    : 'bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500'
                }`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
                
                <h3 className={`relative z-10 font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 ${
                  item.type === 'blue' 
                    ? 'text-white group-hover:text-yellow-400' 
                    : 'text-white group-hover:text-brand-dark'
                }`}>
                  {item.title}
                </h3>

                {/* Accent line */}
                <div className={`absolute top-0 left-0 h-0 w-1 group-hover:h-full transition-all duration-500 ${
                  item.type === 'blue' ? 'bg-yellow-400' : 'bg-white'
                }`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
