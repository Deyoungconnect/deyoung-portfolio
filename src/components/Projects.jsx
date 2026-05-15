// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // UPDATED: Added new categories
  const filters = [
    { id: 'all', label: 'All Projects', icon: 'bi-grid' },
    { id: 'web', label: 'Web Development', icon: 'bi-code-slash' },
    { id: 'education', label: 'Education Technology', icon: 'bi-book' },
    { id: 'lms', label: 'Learning Management System', icon: 'bi-mortarboard' },
    { id: 'cms', label: 'Content Management System', icon: 'bi-file-text' },
    { id: 'event', label: 'Event Management', icon: 'bi-calendar-event' }
  ];

  useEffect(() => {
    loadProjects();
  }, [activeFilter]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects(activeFilter);
      // FIX: Ensure data is always an array
      const projectsArray = Array.isArray(data) ? data : [];
      setProjects(projectsArray);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
    setLoading(false);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      web: '#0EA5E9',
      education: '#10B981',
      lms: '#8B5CF6',
      cms: '#F59E0B',
      event: '#EC4899'
    };
    return colors[category] || '#0EA5E9';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      web: 'Web Dev',
      education: 'Edu Tech',
      lms: 'LMS',
      cms: 'CMS',
      event: 'Event Mgmt'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <section id="projects" style={{ padding: '5rem 0', background: 'rgba(20, 24, 28, 0.6)' }}>
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" style={{
        padding: '5rem 0',
        background: 'rgba(20, 24, 28, 0.6)',
        backdropFilter: 'blur(10px)'
      }}>
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
              MY WORK
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1rem'
            }}>
              Featured <span style={{ color: '#0EA5E9' }}>Projects</span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#B0B8C5',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Showcasing my best work across different categories
            </p>
          </div>

          {/* Updated Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeFilter === filter.id 
                    ? 'linear-gradient(135deg, #0EA5E9, #0284C7)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: activeFilter === filter.id 
                    ? 'none' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className={`bi ${filter.icon}`}></i>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid - 3 Columns */}
          {!Array.isArray(projects) || projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <i className="bi bi-folder" style={{ fontSize: '4rem', color: 'rgba(14,165,233,0.3)' }}></i>
              <h4 className="mt-3">No projects found</h4>
              <p className="text-muted">Check back later for new projects!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => openModal(project)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    height: '400px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: getCategoryBadgeColor(project.category),
                    color: '#FFFFFF',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    zIndex: 2,
                    textTransform: 'uppercase'
                  }}>
                    {getCategoryLabel(project.category)}
                  </span>
                  <img 
                    src={project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.95), rgba(2, 132, 199, 0.95))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    backdropFilter: 'blur(5px)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      textAlign: 'center'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      color: '#FFD700',
                      fontWeight: 600,
                      marginBottom: '1rem'
                    }}>
                      {project.client || 'Client Project'}
                    </p>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textAlign: 'center',
                      marginBottom: '1rem',
                      fontSize: '0.9rem'
                    }}>
                      {project.description && project.description.length > 100 
                        ? project.description.substring(0, 100) + '...' 
                        : project.description}
                    </p>
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '1.5rem'
                    }}>
                      <i className="bi bi-gear me-1"></i> {project.technologies || 'Various technologies'}
                    </p>
                    <button style={{
                      background: 'white',
                      color: '#0EA5E9',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '50px',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#0EA5E9';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.color = '#0EA5E9';
                      e.target.style.transform = 'scale(1)';
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={closeModal}>
          <div style={{
            background: 'rgba(30, 39, 73, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ color: '#FFD700', margin: 0 }}>{selectedProject.title}</h3>
              <button onClick={closeModal} style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: 'white',
                cursor: 'pointer'
              }}>×</button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <img 
                src={selectedProject.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'} 
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  marginBottom: '1.5rem'
                }}
              />
              <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>Client: {selectedProject.client || 'Not specified'}</h4>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', lineHeight: 1.6 }}>
                {selectedProject.description}
              </p>
              <p><strong style={{ color: '#FFD700' }}>Technologies:</strong> <span style={{ color: 'white' }}>{selectedProject.technologies || 'Various technologies'}</span></p>
              <p><strong style={{ color: '#FFD700' }}>Completed:</strong> <span style={{ color: 'white' }}>{selectedProject.date_completed || 'Not specified'}</span></p>
              <div style={{ marginTop: '1.5rem' }}>
                <button onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })} style={{
                  background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Start a Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default Projects;