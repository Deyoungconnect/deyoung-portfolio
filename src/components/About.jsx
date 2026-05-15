// src/components/About.jsx
import React from 'react';

function About() {
  const stats = [
    { number: '8+', label: 'Projects Completed' },
    { number: '8+', label: 'Happy Clients' },
    { number: '2+', label: 'Years Experience' },
    { number: '11+', label: 'Training Sessions' }
  ];

  // Update this path to match your actual image filename
  // If your image is named "chibuike.jpg", use: require('../assets/images/chibuike.jpg')
  const profileImage = require('../assets/images/chibuike1.png');

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#0A0C0F' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Image Side - Your Real Photo */}
          <div>
            <img 
              src={profileImage}
              alt="Chibuike Ogochukwu - Founder Deyoung Tech Innovations"
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '2px solid rgba(14, 165, 233, 0.3)'
              }}
            />
          </div>
          
          {/* Text Side */}
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              About <span>Me</span>
            </h2>
            <p style={{ color: '#B0B8C5', marginBottom: '1rem', lineHeight: 1.7 }}>
              I am Chibuike Ogochukwu, a passionate full-stack web developer and digital creative, 
              and the founder of <strong style={{ color: '#0EA5E9' }}>Deyoung Tech Innovations</strong>.
            </p>
            <p style={{ color: '#B0B8C5', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              With expertise in web development, graphic design, video editing, and digital marketing, 
              I help businesses establish a strong online presence through modern solutions that 
              solve real problems and drive growth.
            </p>
            
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0EA5E9' }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#B0B8C5' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;