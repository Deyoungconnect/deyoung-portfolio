// src/components/AcademySection.jsx
import React from 'react';
import heroImage from '../assets/images/academy-image2.jpeg';

function AcademySection() {
  const scrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="academy" style={{
      padding: '5rem 0',
      background: 'linear-gradient(135deg, rgba(10, 17, 40, 0.6) 0%, rgba(20, 24, 28, 0.8) 100%)',
      borderTop: '1px solid rgba(14, 165, 233, 0.2)',
      borderBottom: '1px solid rgba(14, 165, 233, 0.2)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              display: 'inline-block',
              background: '#FFD700',
              color: '#0A1128',
              padding: '0.5rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              MY ACADEMY
            </div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Deyoung Tech Academy powered by <span style={{ color: '#0EA5E9' }}>Frantech</span>
            </h2>
            <p style={{
              color: '#B0B8C5',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}>
              Frantech is my tech training brand where I empower individuals with in-demand digital skills. 
              Through hands-on training, mentorship, and real-world projects, I help aspiring tech professionals 
              build successful careers in the digital economy.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(14, 165, 233, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0EA5E9' }}>13+</div>
                <div style={{ fontSize: '0.85rem', color: '#B0B8C5' }}>Graduates Trained</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(14, 165, 233, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0EA5E9' }}>4+</div>
                <div style={{ fontSize: '0.85rem', color: '#B0B8C5' }}>Courses Offered</div>
              </div>
            </div>
            
            <button onClick={scrollToContact} className="btn-primary">
              <i className="bi bi-mortarboard me-2"></i> Learn More About Frantech
            </button>
          </div>

          {/* Right Image */}
          <div>
            <img 
              src={heroImage}
              alt="Frantech Academy - Tech Training"
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '2px solid rgba(14, 165, 233, 0.3)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademySection;