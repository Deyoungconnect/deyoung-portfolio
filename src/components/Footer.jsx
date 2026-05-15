// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0A0C0F',
      padding: '2rem 0',
      borderTop: '1px solid rgba(14, 165, 233, 0.2)',
      textAlign: 'center'
    }}>
      <div className="container">
        <p style={{ color: '#B0B8C5', marginBottom: '1rem' }}>
          © {currentYear} Deyoung Tech Innovations | Powered by Chibuike Ogochukwu
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <button
            onClick={() => window.open('https://github.com/Deyoungconnect', '_blank')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0EA5E9',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: 'inherit',
              padding: 0
            }}
            onMouseEnter={(e) => e.target.style.color = '#38BDF8'}
            onMouseLeave={(e) => e.target.style.color = '#0EA5E9'}
            aria-label="Visit GitHub profile"
          >
            GitHub
          </button>
          <button
            onClick={() => window.open('https://linkedin.com/in/chibuike-ogochukwu-5035b914b/', '_blank')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0EA5E9',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: 'inherit',
              padding: 0
            }}
            onMouseEnter={(e) => e.target.style.color = '#38BDF8'}
            onMouseLeave={(e) => e.target.style.color = '#0EA5E9'}
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;