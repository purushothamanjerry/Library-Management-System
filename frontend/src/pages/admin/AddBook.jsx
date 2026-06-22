import { useState } from 'react';
import { booksAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import './AdminPages.css';

const GENRES = ['FICTION', 'HISTORY', 'SCIFI', 'FANTASY', 'ROMANCE', 'THRILLER', 'MYSTERY', 'DRAMA'];

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'FICTION',
    year: '',
    totalCopies: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        year: parseInt(form.year),
        totalCopies: parseInt(form.totalCopies),
        availableCopies: parseInt(form.totalCopies),
      };
      await booksAPI.addBook(payload);
      addToast('Book added successfully!', 'success');
      setForm({ title: '', author: '', genre: 'FICTION', year: '', totalCopies: '' });
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add book', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Add Book</h1>
        <p>Add a new book to the library catalog</p>
      </div>

      <div className="glass-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-input" name="title" placeholder="Enter book title" value={form.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input className="form-input" name="author" placeholder="Enter author name" value={form.author} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre</label>
              <select className="form-input" name="genre" value={form.genre} onChange={handleChange}>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <input className="form-input" name="year" type="number" placeholder="e.g. 2024" value={form.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Total Copies</label>
            <input className="form-input" name="totalCopies" type="number" min="1" placeholder="Number of copies" value={form.totalCopies} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
