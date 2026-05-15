// src/components/Testimonials.jsx
import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      name: 'Micah Ibe',
      role: 'Student, BioLearn User',
      content: 'BioLearn has completely changed how I study Biology. The lessons are clear, the quizzes help me test myself, and the AI assistant answers my questions instantly. I improved my grades from a C to an A in just two months!',
      rating: 5,
      project: 'BioLearn Biology Platform'
    },
    {
      name: 'Mary Ogochukwu',
      role: 'Student, BioLearn User',
      content: 'I love how organized BioLearn is. All my SS3 topics are right there, and I can track my progress. The certificates gave me motivation to complete all the quizzes. Best study platform ever!',
      rating: 5,
      project: 'BioLearn Biology Platform'
    },
    {
      name: 'Daniel Eze',
      role: 'Student, BioLearn User',
      content: 'The AI assistant is a game-changer. I just type any biology question, and it explains it in simple terms. My WAEC prep has been so much better since I found BioLearn.',
      rating: 5,
      project: 'BioLearn Biology Platform'
    },
    {
      name: 'Chinaza Mitchell',
      role: 'Student, BioLearn User',
      content: 'The 20 questions per topic really helped me master Biology. I love that I can retake quizzes and see my improvement. My parents are proud of my grades now!',
      rating: 5,
      project: 'BioLearn Biology Platform'
    },
    {
      name: 'Mr. Roland',
      role: 'Academic Director, Oasis Canadian Schools, Port Harcourt',
      content: 'The CBT system Chibuike built for us has transformed our examination process. No more paper stress, instant results, and the students love it. Professional and reliable!',
      rating: 5,
      project: 'CBT System – Oasis Canadian Schools'
    },
    {
      name: 'Frantech Academy',
      role: 'Student',
      content: 'The training at Frantech Academy was life-changing. The hands-on projects and expert guidance gave me real coding skills. I am now a confident developer. Thank you!',
      rating: 5,
      project: 'Frantech Academy Training'
    },
    {
      name: 'Frantech Academy',
      role: 'Graduate',
      content: 'I came with zero coding knowledge, but after the training, I built my own website. The practical approach made all the difference. Best decision I ever made.',
      rating: 5,
      project: 'Frantech Academy Training'
    },
    {
      name: 'Deyoungpen Blog',
      role: 'Blog Owner',
      content: 'The blog platform built for Deyoungpen is fantastic. Easy to manage, loads fast, and looks great. My readers love the new experience and engagement has tripled.',
      rating: 5,
      project: 'Deyoungpen Blog'
    },
    {
      name: 'Quit Stuttering Advocacy',
      role: 'Organization Founder',
      content: 'The web app built for our advocacy work has reached thousands of people. The resources and support system are exactly what our community needed. Thank you for understanding our mission.',
      rating: 5,
      project: 'Quit Stuttering Advocacy – Web App'
    },
    {
      name: 'Bructech',
      role: 'Event Organizer',
      content: 'The event portal is a masterpiece. Managing registrations, schedules, and attendee communication is now effortless. Our last event was our most successful yet.',
      rating: 5,
      project: 'Bructech Event Portal'
    }
  ];

  // Duplicate for seamless infinite loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" style={{
      padding: '5rem 0',
      background: 'rgba(20, 24, 28, 0.6)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(14, 165, 233, 0.2)',
      borderBottom: '1px solid rgba(14, 165, 233, 0.2)',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonial-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollLeft 40s linear infinite;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        .testimonial-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          border-color: rgba(14, 165, 233, 0.5) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
      `}</style>

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
            TESTIMONIALS
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            What <span style={{ color: '#0EA5E9' }}>Real People Say</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#B0B8C5',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Real feedback from students, clients, and trainees
          </p>
        </div>
      </div>

      {/* Scrolling Track */}
      <div style={{ overflow: 'hidden', width: '100%', padding: '1rem 0' }}>
        <div className="testimonial-track">
          {doubled.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card"
              style={{
                minWidth: '360px',
                maxWidth: '360px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(14, 165, 233, 0.15)',
                borderRadius: '20px',
                padding: '2rem',
                flexShrink: 0
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: '1rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: '#FFD700', fontSize: '1.1rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                color: '#B0B8C5',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div style={{
                borderTop: '1px solid rgba(14, 165, 233, 0.15)',
                paddingTop: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  {/* Avatar Circle */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    color: 'white',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ color: '#0EA5E9', fontSize: '0.8rem' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                {/* Project tag */}
                <div style={{
                  marginTop: '0.75rem',
                  display: 'inline-block',
                  background: 'rgba(14, 165, 233, 0.1)',
                  border: '1px solid rgba(14, 165, 233, 0.2)',
                  color: '#0EA5E9',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  <i className="bi bi-briefcase me-1"></i>
                  {testimonial.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;