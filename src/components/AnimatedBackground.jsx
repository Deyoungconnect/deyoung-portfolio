// src/components/AnimatedBackground.jsx
import React, { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create data points
    const dataPoints = [];
    const pointCount = 40;
    const colors = [
      'rgba(14, 165, 233, 0.7)',
      'rgba(249, 115, 22, 0.7)',
      'rgba(56, 189, 248, 0.7)',
      'rgba(251, 146, 60, 0.7)'
    ];

    for (let i = 0; i < pointCount; i++) {
      const point = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const duration = 15 + Math.random() * 15;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      point.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px ${color};
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        opacity: ${Math.random() * 0.4 + 0.2};
        pointer-events: none;
      `;

      container.appendChild(point);
      dataPoints.push(point);
    }

    // Create connection lines
    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        const point1 = dataPoints[Math.floor(Math.random() * dataPoints.length)];
        const point2 = dataPoints[Math.floor(Math.random() * dataPoints.length)];
        
        if (point1 !== point2 && point1 && point2) {
          const line = document.createElement('div');
          const rect1 = point1.getBoundingClientRect();
          const rect2 = point2.getBoundingClientRect();
          
          const x1 = rect1.left + rect1.width / 2;
          const y1 = rect1.top + rect1.height / 2;
          const x2 = rect2.left + rect2.width / 2;
          const y2 = rect2.top + rect2.height / 2;
          
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
          
          line.style.cssText = `
            position: absolute;
            left: ${x1}px;
            top: ${y1}px;
            width: ${length}px;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.5) 20%, rgba(14, 165, 233, 0.7) 50%, rgba(14, 165, 233, 0.5) 80%, transparent 100%);
            transform: rotate(${angle}deg);
            transform-origin: left top;
            pointer-events: none;
            animation: linePulse 2s ease-in-out infinite;
          `;
          
          container.appendChild(line);
        }
      }
    }, 500);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {/* Data Grid Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridFlow 30s linear infinite',
        opacity: 0.5
      }} />
      
      {/* Financial Nodes */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
        top: '20%',
        left: '10%',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'nodePulse 6s ease-in-out infinite',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
        bottom: '15%',
        right: '10%',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'nodePulse 6s ease-in-out infinite 2s',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)',
        top: '60%',
        left: '20%',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'nodePulse 6s ease-in-out infinite 4s',
        opacity: 0.5
      }} />
      
      {/* Data Streams */}
      <div style={{
        position: 'absolute',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: 'rgba(14, 165, 233, 0.3)',
        whiteSpace: 'nowrap',
        top: '15%',
        left: '5%',
        animation: 'streamFlow 25s linear infinite'
      }}>
        DEYOUNG TECH INNOVATIONS 2026
      </div>
      <div style={{
        position: 'absolute',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: 'rgba(14, 165, 233, 0.3)',
        whiteSpace: 'nowrap',
        top: '40%',
        right: '10%',
        animation: 'streamFlow 30s linear infinite reverse'
      }}>
        FULL-STACK DEVELOPER | DIGITAL CREATIVE
      </div>
      <div style={{
        position: 'absolute',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: 'rgba(14, 165, 233, 0.3)',
        whiteSpace: 'nowrap',
        bottom: '20%',
        left: '15%',
        animation: 'streamFlow 35s linear infinite'
      }}>
        BUILDING DIGITAL SOLUTIONS FOR AFRICAN BUSINESSES
      </div>
      
      <style>{`
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        
        @keyframes nodePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes streamFlow {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        
        @keyframes linePulse {
          0%, 100% { opacity: 0.2; transform: scaleX(0.9); }
          50% { opacity: 0.6; transform: scaleX(1.1); }
        }
        
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          25% { transform: translate(25px, -20px) scale(1.2); opacity: 0.8; }
          50% { transform: translate(-20px, 15px) scale(0.9); opacity: 0.5; }
          75% { transform: translate(30px, 10px) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

export default AnimatedBackground;