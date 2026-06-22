import { useState } from 'react';
import { borrowingAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import './AdminPages.css';

const BorrowBook = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleBorrow = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await borrowingAPI.borrowBook(parseInt(userId), parseInt(bookId));
      addToast('Book borrowed successfully!', 'success');
      setUserId('');
      setBookId('');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to borrow book', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Borrow Book</h1>
        <p>Issue a book to a user</p>
      </div>

      <div className="glass-card">
        <form className="admin-form" onSubmit={handleBorrow}>
          <div className="form-row">
            <div className="form-group">
              <label>User ID</label>
              <input className="form-input" type="number" placeholder="Enter user ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Book ID</label>
              <input className="form-input" type="number" placeholder="Enter book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Processing...' : 'Borrow Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBook;
