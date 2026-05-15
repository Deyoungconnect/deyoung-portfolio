// src/components/ScrollAnimation.jsx
import React, { useEffect, useRef } from 'react';

function ScrollAnimation({ children, type = 'up', delay = 0, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Store the current ref value in a variable for cleanup
    const currentElement = elementRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup - use the stored variable instead of elementRef.current
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, []); // Empty dependency array - only runs once on mount

  let animationClass = 'animate-up';
  if (type === 'left') animationClass = 'animate-left';
  if (type === 'right') animationClass = 'animate-right';
  if (type === 'scale') animationClass = 'animate-scale';

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${delayClass} ${className}`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      {children}
    </div>
  );
}

export default ScrollAnimation;