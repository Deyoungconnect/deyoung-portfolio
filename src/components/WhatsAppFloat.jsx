// src/components/WhatsAppFloat.jsx
import React, { useState, useEffect } from 'react';

function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // WhatsApp number - replace with your actual WhatsApp number
  const phoneNumber = '2347060771730'; // Nigeria format without +
  const message = encodeURIComponent("Hello! I'm interested in your services. I saw your portfolio and would love to discuss a project.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Hide after scrolling past hero section? Optional - can remove
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
          setIsVisible(true);
        } else {
          setIsVisible(true); // Always visible, but you can change to false if you want
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isHovered ? '0 10px 25px rgba(37, 211, 102, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        textDecoration: 'none',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        fill="#FFFFFF"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.277-.664c.902.483 1.931.74 3.057.74h.002c3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.766-5.765-5.766zM12.031 1.5c5.799 0 10.5 4.701 10.5 10.5 0 5.799-4.701 10.5-10.5 10.5-1.812 0-3.545-.461-5.055-1.26l-5.025 1.39 1.567-4.621c-.95-1.5-1.5-3.22-1.5-5.009 0-5.799 4.701-10.5 10.5-10.5z"/>
      </svg>
      
      {/* Pulse animation */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: '#25D366',
        opacity: 0.5,
        animation: 'pulse 1.5s infinite',
        pointerEvents: 'none'
      }} />
      
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </a>
  );
}

export default WhatsAppFloat;