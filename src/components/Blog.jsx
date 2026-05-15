// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import { getBlogPosts, getBlogPost } from '../services/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const postsPerPage = 6;

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch posts when page, category, or postsPerPage changes
  useEffect(() => {
    fetchPosts();
  }, [currentPage, activeCategory]);

  const fetchCategories = async () => {
    try {
      // You'll need to add getBlogCategories to your api.js
      const { getBlogCategories } = await import('../services/api');
      const cats = await getBlogCategories();
      setCategories(['all', ...cats]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBlogPosts(activeCategory, postsPerPage, currentPage);
      
      if (response.success) {
        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.pages);
      } else {
        setPosts([]);
        setError('Failed to load blog posts');
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('Unable to connect to the server. Please try again later.');
      setPosts([]);
    }
    setLoading(false);
  };

  const openPost = async (post) => {
    // If we only have basic post data, fetch full content
    if (!post.content || post.content.length < 100) {
      try {
        const fullPost = await getBlogPost(post.slug);
        if (fullPost) {
          setSelectedPost(fullPost);
        } else {
          setSelectedPost(post);
        }
      } catch (error) {
        console.error('Error fetching full post:', error);
        setSelectedPost(post);
      }
    } else {
      setSelectedPost(post);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const readTime = (content) => {
    if (!content) return '3 min read';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  // Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="blog" style={{ padding: '5rem 0', background: '#0A0C0F' }}>
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#e5e9f0' }}>Loading articles...</p>
        </div>
      </section>
    );
  }

  if (error && posts.length === 0) {
    return (
      <section id="blog" style={{ padding: '5rem 0', background: '#0A0C0F' }}>
        <div className="container text-center">
          <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem', color: '#ef4444' }}></i>
          <h3 style={{ color: '#e5e9f0', marginTop: '1rem' }}>Unable to Load Blog</h3>
          <p style={{ color: '#B0B8C5' }}>{error}</p>
          <button onClick={fetchPosts} className="btn-primary" style={{ marginTop: '1rem' }}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blog" style={{ padding: '5rem 0', background: '#0A0C0F' }}>
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
              BLOG & INSIGHTS
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1rem'
            }}>
              Latest <span style={{ color: '#0EA5E9' }}>Articles</span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#B0B8C5',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Sharing knowledge and insights from my journey in tech, design, and digital marketing
            </p>
          </div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '2.5rem'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: activeCategory === cat 
                      ? 'linear-gradient(135deg, #0EA5E9, #0284C7)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: activeCategory === cat 
                      ? 'none' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat === 'all' ? 'All Posts' : cat}
                </button>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <i className="bi bi-newspaper" style={{ fontSize: '4rem', color: 'rgba(14,165,233,0.3)' }}></i>
              <h4 className="mt-3" style={{ color: '#e5e9f0' }}>No posts yet</h4>
              <p className="text-muted">Check back soon for new articles!</p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem'
              }}>
                {posts.map((post) => (
                  <div
                    key={post._id || post.id}
                    onClick={() => openPost(post)}
                    style={{
                      background: '#14181C',
                      border: '1px solid rgba(14,165,233,0.2)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = '#0EA5E9';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {post.featured_image && (
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                        lineHeight: 1.4
                      }}>
                        {post.title}
                      </h3>
                      <p style={{
                        color: '#B0B8C5',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        lineHeight: 1.6
                      }}>
                        {post.excerpt || stripHtml(post.content).substring(0, 120) + '...'}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(14,165,233,0.1)'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                          <i className="bi bi-calendar me-1"></i> {formatDate(post.published_at || post.created_at)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                          <i className="bi bi-clock me-1"></i> {readTime(post.content)}
                        </span>
                      </div>
                      <div style={{ marginTop: '1rem', color: '#0EA5E9', fontSize: '0.9rem', fontWeight: 500 }}>
                        Read More →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '3rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(14,165,233,0.2)',
                      border: 'none',
                      borderRadius: '8px',
                      color: currentPage === 1 ? '#6c757d' : '#0EA5E9',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: currentPage === i + 1 
                          ? 'linear-gradient(135deg, #0EA5E9, #0284C7)' 
                          : 'rgba(255,255,255,0.05)',
                        border: currentPage === i + 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(14,165,233,0.2)',
                      border: 'none',
                      borderRadius: '8px',
                      color: currentPage === totalPages ? '#6c757d' : '#0EA5E9',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal for Full Post */}
      {showModal && selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          overflow: 'auto'
        }} onClick={closeModal}>
          <div style={{
            background: '#14181C',
            borderRadius: '20px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(14,165,233,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(14,165,233,0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              background: '#14181C',
              zIndex: 10
            }}>
              <h2 style={{ color: '#0EA5E9', margin: 0, fontSize: '1.5rem' }}>{selectedPost.title}</h2>
              <button onClick={closeModal} style={{
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                color: '#fff',
                cursor: 'pointer'
              }}>×</button>
            </div>
            <div style={{ padding: '2rem' }}>
              {selectedPost.featured_image && (
                <img 
                  src={selectedPost.featured_image} 
                  alt={selectedPost.title}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    marginBottom: '1.5rem'
                  }}
                />
              )}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                color: '#6c757d',
                fontSize: '0.85rem',
                flexWrap: 'wrap'
              }}>
                <span><i className="bi bi-calendar me-1"></i> {formatDate(selectedPost.published_at || selectedPost.created_at)}</span>
                <span><i className="bi bi-clock me-1"></i> {readTime(selectedPost.content)}</span>
                {selectedPost.category && (
                  <span><i className="bi bi-folder me-1"></i> {selectedPost.category}</span>
                )}
                {selectedPost.tags && (
                  <span><i className="bi bi-tag me-1"></i> {selectedPost.tags}</span>
                )}
              </div>
              <div 
                className="blog-content"
                style={{
                  color: '#e5e9f0',
                  lineHeight: 1.8,
                  fontSize: '1.05rem'
                }}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(14,165,233,0.2)',
              textAlign: 'center'
            }}>
              <button onClick={closeModal} style={{
                background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .blog-content h1, .blog-content h2, .blog-content h3 {
          color: #0EA5E9;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 { font-size: 1.8rem; }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content p {
          margin-bottom: 1rem;
        }
        .blog-content ul, .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .blog-content a {
          color: #0EA5E9;
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
        .blog-content code {
          background: #1a1a2e;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }
        .blog-content pre {
          background: #1a1a2e;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
        }
      `}</style>
    </>
  );
}

export default Blog;