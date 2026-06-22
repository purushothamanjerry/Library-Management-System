import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401/403 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401)) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (user) => api.post('/auth/register', user),
};

// Books API
export const booksAPI = {
  getAvailableByGenre: (genre) => api.get(`/api/books/available/${genre}`),
  addBook: (book) => api.post('/api/books/add', book),
};

// Borrowing API
export const borrowingAPI = {
  borrowBook: (userId, bookId) => api.post('/api/borrowing/borrow', { userId, bookId }),
  myBorrow: (bookId) => api.post(`/api/borrowing/my-borrow/${bookId}`),
  returnBook: (recordId) => api.post(`/api/borrowing/return/${recordId}`),
  extendDueDate: (recordId, extraDays) =>
    api.post(`/api/borrowing/extend/${recordId}?extraDays=${extraDays}`),
  getOverdueBooks: () => api.get('/api/borrowing/overdue'),
  getMyBooks: () => api.get('/api/borrowing/my-books'),
};

// Admin API
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getNewRequests: () => api.get('/admin/newRequest'),
  approveRequest: (email) => api.post(`/admin/approveRequest?email=${email}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export default api;
