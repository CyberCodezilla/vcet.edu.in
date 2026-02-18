import React from 'react';
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
  return (
    <div className="min-h-screen font-sans">
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