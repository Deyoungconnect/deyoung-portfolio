// src/components/Services.jsx
import React from 'react';

function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Web & Software Development',
      description: 'Custom enterprise applications, responsive websites, and scalable web platforms built with modern technologies.',
      outcomes: 'Streamlined operations, enhanced user experience, competitive advantage'
    },
    {
      icon: '🎬',
      title: 'Digital Media Production',
      description: 'Professional video production, 3D animation, VFX, and multimedia content for marketing and training.',
      outcomes: 'Engaging content, stronger brand presence, better communication'
    },
    {
      icon: '📈',
      title: 'Digital Marketing & Automation',
      description: 'Data-driven marketing strategies, SEO, social media management, and marketing automation solutions.',
      outcomes: 'Increased visibility, qualified leads, measurable ROI'
    }
  ];

  return (
    <section id="services" style={{
      padding: '5rem 0',
      background: 'rgba(20, 24, 28, 0.6)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(14, 165, 233, 0.2)',
      borderBottom: '1px solid rgba(14, 165, 233, 0.2)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-block',
            background: '#FFD700',
            color: '#0A1128',
            padding: '0.5rem 1.5rem',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.875rem',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            MY EXPERTISE
          </div>

          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            My ICT Solutions
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: '#B0B8C5',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Comprehensive technology services designed to help businesses grow, scale, and succeed digitally
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(14, 165, 233, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'white',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease'
              }}>
                {service.icon}
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}>
                {service.title}
              </h3>

              <p style={{
                color: '#B0B8C5',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                {service.description}
              </p>

              <div style={{
                fontSize: '0.9rem',
                color: '#FFD700',
                fontWeight: 600,
                fontStyle: 'italic'
              }}>
                → {service.outcomes}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Request a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;