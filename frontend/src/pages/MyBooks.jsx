import { useState, useEffect } from 'react';
import { borrowingAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { BookOpen, RotateCcw, Clock } from 'lucide-react';
import './admin/AdminPages.css'; // Reusing admin page styles for tables

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const res = await borrowingAPI.getMyBooks();
      setBooks(res.data);
    } catch (err) {
      addToast('Failed to load your borrowed books', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (recordId) => {
    try {
      await borrowingAPI.returnBook(recordId);
      addToast('Book returned successfully!', 'success');
      fetchMyBooks(); // Refresh list to show updated status
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to return book', 'error');
    }
  };

  const getStatusBadge = (record) => {
    if (record.returned) return <span className="badge badge-success">Returned</span>;
    
    const dueDate = new Date(record.dueDate);
    const now = new Date();
    if (now > dueDate) return <span className="badge badge-danger">Overdue</span>;
    
    return <span className="badge badge-info">Active</span>;
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>My Borrowed Books</h1>
        <p>View your borrowing history and return books</p>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div></div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} />
            <h3>No borrowed books</h3>
            <p>You haven't borrowed any books yet. Head over to Browse Books to get started!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((record) => (
                  <tr key={record.id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {record.book?.title}
                    </td>
                    <td>{record.borrowDate}</td>
                    <td>{record.dueDate}</td>
                    <td>{record.returnDate || '—'}</td>
                    <td>{getStatusBadge(record)}</td>
                    <td>
                      {!record.returned && (
                        <button className="btn-sm btn-warning" onClick={() => handleReturn(record.id)}>
                          <RotateCcw size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                          Return Book
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
