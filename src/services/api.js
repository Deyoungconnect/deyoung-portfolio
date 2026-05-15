import axios from 'axios';

// Use environment variable for production (Render), fallback to localhost for development
const API_BASE_URL = 'https://deyoung-portfolio-backend-node.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== PROJECTS API ====================
export const getProjects = async (category = 'all', featured = false) => {
  try {
    let url = '/projects';
    const params = [];
    if (category !== 'all') params.push(`category=${category}`);
    if (featured) params.push(`featured=true`);
    if (params.length) url += `?${params.join('&')}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

// ==================== BLOG API ====================
export const getBlogPosts = async (category = 'all', limit = 6, page = 1) => {
  try {
    const response = await api.get(`/blog?category=${category}&limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { success: false, data: { posts: [], pagination: { total: 0 } } };
  }
};

export const getBlogPost = async (slug) => {
  try {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getBlogCategories = async () => {
  try {
    const response = await api.get('/blog/categories/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// ==================== TESTIMONIALS API ====================
export const getTestimonials = async () => {
  try {
    // For now, return empty array until you build testimonials API
    return [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

// ==================== CONTACT API ====================
export const sendContactMessage = async (data) => {
  try {
    // For now, log and return success
    console.log('Contact message:', data);
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'Network error' };
  }
};

export default api;