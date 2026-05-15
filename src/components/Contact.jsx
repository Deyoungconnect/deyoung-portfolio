// src/components/Contact.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await axios.get('http://localhost/deyoung-portfolio-backend/api/routes/settings.php');
      if (response.data && response.data.id) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('http://localhost/deyoung-portfolio-backend/api/routes/contact.php', formData);
      
      if (response.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: response.data.error || 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Network error. Please try again later.' });
    }
    
    setLoading(false);
  };

  // Social links - Replace with your actual URLs
  const socialLinks = [
    { icon: '📧', name: 'Email', url: 'mailto:chibuike.ogochukwu@gmail.com', isExternal: true },
    { icon: '💼', name: 'LinkedIn', url: settings?.linkedin_url || 'https://linkedin.com/in/chibuike-ogochukwu-5035b914b', isExternal: true },
    { icon: '🐙', name: 'GitHub', url: settings?.github_url || 'https://github.com/Deyoungconnect', isExternal: true },
  ];

  return (
    <section id="contact" style={{ padding: '5rem 0', background: '#0A0C0F' }}>
      <div className="container">
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div className="project-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '1.5rem' }}>Send a Message</h3>
            
            {status.message && (
              <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'}`} style={{ 
                marginBottom: '1rem', 
                padding: '0.75rem', 
                borderRadius: '8px',
                background: status.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: status.type === 'success' ? '1px solid #10b981' : '1px solid #ef4444',
                color: status.type === 'success' ? '#10b981' : '#ef4444'
              }}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0A0C0F',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '8px',
                    color: '#E5E9F0'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0A0C0F',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '8px',
                    color: '#E5E9F0'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0A0C0F',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '8px',
                    color: '#E5E9F0',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="project-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Let's Connect</h3>
              <p style={{ color: '#B0B8C5', marginBottom: '1.5rem' }}>
                Have a project in mind? I'm always open to discussing web development, 
                design work, or digital marketing partnerships.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#0A0C0F',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      color: '#E5E9F0',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#0EA5E9';
                      e.target.style.background = 'rgba(14,165,233,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'rgba(14,165,233,0.3)';
                      e.target.style.background = '#0A0C0F';
                    }}
                  >
                    <span>{link.icon}</span> {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="project-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Email Me</h3>
              <a 
                href="mailto:chibuike@deyoungtech.com"
                style={{ color: '#0EA5E9', fontSize: '1.1rem', textDecoration: 'none' }}
              >
                chibuike.ogochukwu@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;