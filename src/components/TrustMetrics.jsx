// src/components/TrustMetrics.jsx
import React, { useEffect, useRef, useState } from 'react';

function TrustMetrics() {
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  // Use useRef to store targetCounts - this prevents it from being a dependency
  const targetCountsRef = useRef({
    projects: 8,
    clients: 8,
    experience: 2,
    satisfaction: 98
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const targetCounts = targetCountsRef.current;
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;
            
            const increment = {
              projects: targetCounts.projects / steps,
              clients: targetCounts.clients / steps,
              experience: targetCounts.experience / steps,
              satisfaction: targetCounts.satisfaction / steps
            };
            
            let currentStep = 0;
            const timer = setInterval(() => {
              currentStep++;
              setCounts({
                projects: Math.min(Math.floor(increment.projects * currentStep), targetCounts.projects),
                clients: Math.min(Math.floor(increment.clients * currentStep), targetCounts.clients),
                experience: Math.min(Math.floor(increment.experience * currentStep), targetCounts.experience),
                satisfaction: Math.min(Math.floor(increment.satisfaction * currentStep), targetCounts.satisfaction)
              });
              
              if (currentStep >= steps) {
                clearInterval(timer);
                setCounts({
                  projects: targetCounts.projects,
                  clients: targetCounts.clients,
                  experience: targetCounts.experience,
                  satisfaction: targetCounts.satisfaction
                });
              }
            }, interval);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasAnimated]); // Now only hasAnimated is a dependency

  return (
    <section ref={sectionRef} style={{
      padding: '5rem 0',
      background: 'rgba(20, 24, 28, 0.6)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(14, 165, 233, 0.2)',
      borderBottom: '1px solid rgba(14, 165, 233, 0.2)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#0EA5E9',
              marginBottom: '0.5rem'
            }}>
              {counts.projects}+
            </div>
            <div style={{ color: '#B0B8C5' }}>Projects Completed</div>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#0EA5E9',
              marginBottom: '0.5rem'
            }}>
              {counts.clients}+
            </div>
            <div style={{ color: '#B0B8C5' }}>Happy Clients</div>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#0EA5E9',
              marginBottom: '0.5rem'
            }}>
              {counts.experience}+
            </div>
            <div style={{ color: '#B0B8C5' }}>Years Experience</div>
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#0EA5E9',
              marginBottom: '0.5rem'
            }}>
              {counts.satisfaction}%
            </div>
            <div style={{ color: '#B0B8C5' }}>Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustMetrics;