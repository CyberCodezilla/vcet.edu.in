import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Departments from './components/Departments';
import Placements from './components/Placements';
import Recruiters from './components/Recruiters';
import Admissions from './components/Admissions';
import Naac from './components/Naac';
import Facilities from './components/Facilities';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Departments />
        <Placements />
        <Recruiters />
        <Admissions />
        <Naac />
        <Facilities />
      </main>
      <Footer />
    </div>
  );
}

export default App;