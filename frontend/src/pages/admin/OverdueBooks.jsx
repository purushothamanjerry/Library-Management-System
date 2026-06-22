import { useState, useEffect } from 'react';
import { borrowingAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import { Inbox, Clock, RotateCcw } from 'lucide-react';
import './AdminPages.css';

const OverdueBooks = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extendDays, setExtendDays] = useState({});
  const { addToast } = useToast();

  useEffect(() => {
    fetchOverdue();
  }, []);

  const fetchOverdue = async () => {
    try {
      const res = await borrowingAPI.getOverdueBooks();
      setRecords(res.data);
    } catch (err) {
      addToast('Failed to load overdue books', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (recordId) => {
    try {
      await borrowingAPI.returnBook(recordId);
      addToast('Book returned successfully!', 'success');
      setRecords((prev) => prev.filter((r) => r.id !== recordId));
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to return', 'error');
    }
  };

  const handleExtend = async (recordId) => {
    const days = parseInt(extendDays[recordId]) || 7;
    try {
      await borrowingAPI.extendDueDate(recordId, days);
      addToast(`Due date extended by ${days} days`, 'success');
      fetchOverdue();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to extend', 'error');
    }
  };

  const daysOverdue = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    return Math.floor((now - due) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Overdue Books</h1>
        <p>Books that have passed their due date</p>
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div></div>
        ) : records.length === 0 ? (
          <div className="empty-state">
            <Inbox size={48} />
            <h3>No overdue books</h3>
            <p>All books have been returned on time</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Book</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Overdue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{record.user?.email || record.user?.name}</td>
                    <td>{record.book?.title}</td>
                    <td>{record.borrowDate}</td>
                    <td>{record.dueDate}</td>
                    <td>
                      <span className="badge badge-danger">
                        {daysOverdue(record.dueDate)} days
                      </span>
                    </td>
                    <td>
                      <div className="extend-row">
                        <input
                          className="extend-input"
                          type="number"
                          min="1"
                          placeholder="7"
                          value={extendDays[record.id] || ''}
                          onChange={(e) => setExtendDays({ ...extendDays, [record.id]: e.target.value })}
                        />
                        <button className="btn-sm btn-warning" onClick={() => handleExtend(record.id)} title="Extend due date">
                          <Clock size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Extend
                        </button>
                        <button className="btn-sm btn-success" onClick={() => handleReturn(record.id)} title="Mark as returned">
                          <RotateCcw size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Return
                        </button>
                      </div>
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

export default OverdueBooks;
