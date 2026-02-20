import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TopBanner from './components/TopBanner';
import About from './components/About';
import Departments from './components/Departments';
import Placements from './components/Placements';
import Recruiters from './components/Recruiters';
import Achievements from './components/Achievements';
import ExploreUs from './components/ExploreUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Facilities from './components/Facilities';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-800">
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <About />
        <Departments />
        <Placements />
        <Recruiters />
        <Achievements />
        <ExploreUs />
        <Gallery />
        <Testimonials />
        <Facilities />
      </main>
      <Footer />
    </div>
  );
}

export default App;
