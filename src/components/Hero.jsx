// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = [
    {
      title: "We bring your digital vision to life",
      subtitle: "Full-Stack Developer & Digital Creative creating modern web solutions that help businesses grow.",
      cta: "View My Work",
      ctaLink: "#projects",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600",
      animation: "slide-up" // First slide - comes from bottom to top
    },
    {
      title: "Building digital solutions for African businesses",
      subtitle: "From concept to deployment, I design and build systems that drive efficiency and growth.",
      cta: "Explore Services",
      ctaLink: "#services",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600",
      animation: "slide-right" // Second slide - comes from right to left
    },
    {
      title: "Empowering through technology education",
      subtitle: "Founder of Deyoung Tech Innovations and passionate tech educator mentoring the next generation.",
      cta: "Learn More",
      ctaLink: "#academy",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600",
      animation: "slide-left" // Third slide - comes from left to right
    }
  ];

  const typingSkills = [
    'Full-Stack Developer',
    'Digital Creative',
    'Tech Educator',
    'Graphic Designer',
    'Content Creator'
  ];

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 5000;

  // Typing animation
  useEffect(() => {
    const currentSkill = typingSkills[loopNum % typingSkills.length];
    
    let timer;
    
    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    } else {
      if (displayText.length < currentSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSkill.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSlideAnimation = (index) => {
    if (index !== currentSlide) return {};
    
    switch (slides[currentSlide].animation) {
      case 'slide-up':
        return {
          animation: 'slideUp 0.8s ease-out'
        };
      case 'slide-right':
        return {
          animation: 'slideRight 0.8s ease-out'
        };
      case 'slide-left':
        return {
          animation: 'slideLeft 0.8s ease-out'
        };
      default:
        return {
          animation: 'fadeIn 0.8s ease-out'
        };
    }
  };

  const getImageAnimation = (index) => {
    if (index !== currentSlide) return {};
    
    switch (slides[currentSlide].animation) {
      case 'slide-up':
        return {
          animation: 'imageSlideUp 1s ease-out'
        };
      case 'slide-right':
        return {
          animation: 'imageSlideRight 1s ease-out'
        };
      case 'slide-left':
        return {
          animation: 'imageSlideLeft 1s ease-out'
        };
      default:
        return {
          animation: 'fadeIn 1s ease-out'
        };
    }
  };

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Background Images with Different Animations */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(135deg, rgba(10, 12, 15, 0.75) 0%, rgba(20, 24, 28, 0.85) 100%), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: currentSlide === index ? 1 : 0,
            ...getImageAnimation(index)
          }}
        />
      ))}

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                opacity: currentSlide === index ? 1 : 0,
                transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                ...getSlideAnimation(index)
              }}
            >
              {currentSlide === index && (
                <>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    borderRadius: '50px',
                    padding: '0.5rem 1.2rem',
                    marginBottom: '1.5rem',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <span style={{ color: '#0EA5E9', fontSize: '0.9rem', fontWeight: 500 }}>
                      FOUNDER @ DEYOUNG TECH INNOVATIONS
                    </span>
                  </div>
                  
                  <h1 style={{
                    fontSize: '3.8rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {slide.title}
                  </h1>
                  
                  <div style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ color: '#E5E9F0' }}>I am a </span>
                    <span style={{ color: '#0EA5E9', fontWeight: 600 }}>{displayText}</span>
                    <span style={{
                      display: 'inline-block',
                      width: '3px',
                      marginLeft: '2px',
                      background: '#0EA5E9',
                      animation: 'blink 1s infinite'
                    }}>|</span>
                  </div>
                  
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#E5E9F0',
                    maxWidth: '650px',
                    margin: '0 auto 2rem',
                    lineHeight: 1.7,
                    textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}>
                    {slide.subtitle}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => scrollToSection(slide.ctaLink)} className="btn-primary">
                      {slide.cta}
                    </button>
                    <button onClick={() => scrollToSection('#contact')} className="btn-secondary">
                      Let's Talk
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {/* Slider Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '3rem',
            position: 'relative',
            zIndex: 10
          }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setAnimating(false);
                  }, 200);
                }}
                style={{
                  width: currentSlide === index ? '2.5rem' : '0.7rem',
                  height: '0.7rem',
                  borderRadius: currentSlide === index ? '0.7rem' : '50%',
                  background: currentSlide === index ? '#0EA5E9' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes imageSlideUp {
          from {
            transform: scale(1.1);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes imageSlideRight {
          from {
            transform: scale(1.1) translateX(-30px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes imageSlideLeft {
          from {
            transform: scale(1.1) translateX(30px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;