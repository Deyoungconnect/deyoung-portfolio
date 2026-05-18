/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const logoSrc = require('../assets/images/logo.jpg');

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        padding: isScrolled ? '0.8rem 0' : '1.2rem 0',
        background: isScrolled ? 'rgba(20, 24, 28, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Logo with Text */}
          <button 
            onClick={() => scrollToSection('#home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
            aria-label="Go to homepage"
          >
            <img 
              src={logoSrc} 
              alt="Deyoung Tech Innovations" 
              style={{
                height: '45px',
                width: 'auto',
                maxHeight: '45px'
              }}
            />
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '0.5px'
            }}>
              Deyoung<span style={{ color: '#0EA5E9' }}>Tech</span>
            </span>
          </button>

          {/* Mobile Menu Button - NOW VISIBLE ON MOBILE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              fontSize: '1.8rem',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation Links - Desktop */}
          <ul style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    color: '#E5E9F0',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#0EA5E9'}
                  onMouseLeave={(e) => e.target.style.color = '#E5E9F0'}
                  aria-label={`Go to ${link.name} section`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: isScrolled ? '70px' : '85px',
        left: 0,
        width: '100%',
        background: 'rgba(20, 24, 28, 0.98)',
        backdropFilter: 'blur(10px)',
        zIndex: 999,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(14,165,233,0.2)'
      }}>
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => scrollToSection(link.href)}
                style={{
                  color: '#E5E9F0',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  padding: '0.75rem 0',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.target.style.color = '#0EA5E9'}
                onMouseLeave={(e) => e.target.style.color = '#E5E9F0'}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* CSS for responsive design */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-overlay {
            display: none;
          }
        }

        @media (max-width: 768px) {
          nav ul {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;