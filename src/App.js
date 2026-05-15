// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';  // ADDED: Import Blog component
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollAnimation from './components/ScrollAnimation';
import TrustMetrics from './components/TrustMetrics';
import AcademySection from './components/AcademySection';
import CTA from './components/CTA';
import WhatsAppFloat from './components/WhatsAppFloat';
import './styles/global.css';

function App() {
  return (
    <div>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      
      {/* Trust Metrics Section */}
      <ScrollAnimation type="up">
        <TrustMetrics />
      </ScrollAnimation>

      {/* About Section */}
      <ScrollAnimation type="up">
        <About />
      </ScrollAnimation>

      {/* Services Section */}
      <ScrollAnimation type="left">
        <Services />
      </ScrollAnimation>
      
      {/* Projects Section */}
      <ScrollAnimation type="right">
        <Projects />
      </ScrollAnimation>
      
      {/* Academy Section - Frantech */}
      <ScrollAnimation type="scale">
        <AcademySection />
      </ScrollAnimation>
            
      {/* Testimonials Section */}
      <ScrollAnimation type="left" delay={2}>
        <Testimonials />
      </ScrollAnimation>

      {/* Blog Section - ADDED */}
      <ScrollAnimation type="up">
        <Blog />
      </ScrollAnimation>
      
      {/* CTA Section */}
      <CTA />
      
      {/* Contact Section */}
      <ScrollAnimation type="right">
        <Contact />
      </ScrollAnimation>
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;