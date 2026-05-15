// src/components/CTA.jsx
import React from 'react';

function CTA() {
  const scrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          Ready to Transform Your Digital Presence?
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Let's discuss how I can help you build modern web solutions and grow your brand.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={scrollToContact}
            style={{
              background: '#FFFFFF',
              color: '#0EA5E9',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            📧 Request Consultation
          </button>
          
          <button 
            onClick={scrollToProjects}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              border: '2px solid rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#FFFFFF';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.5)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚀 View My Work
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;