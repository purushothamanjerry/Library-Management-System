import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Welcome back! 👋</h1>
        <p>Here's your library dashboard overview</p>
      </div>

      <div className="welcome-banner glass-card">
        <div className="welcome-text">
          <h2>{user?.email}</h2>
          <span className={`badge ${isAdmin ? 'badge-warning' : 'badge-info'}`}>
            {user?.role}
          </span>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/books" className="action-card glass-card">
          <div className="action-icon" style={{ background: 'rgba(138, 43, 226, 0.15)' }}>
            <BookOpen size={24} color="#a855f7" />
          </div>
          <div className="action-info">
            <h3>Browse Books</h3>
            <p>Explore books by genre</p>
          </div>
          <ArrowRight size={20} className="action-arrow" />
        </Link>

        {isAdmin && (
          <>
            <Link to="/admin/users" className="action-card glass-card">
              <div className="action-icon" style={{ background: 'rgba(74, 222, 128, 0.15)' }}>
                <Users size={24} color="#4ade80" />
              </div>
              <div className="action-info">
                <h3>Manage Users</h3>
                <p>Approve pending registrations</p>
              </div>
              <ArrowRight size={20} className="action-arrow" />
            </Link>

            <Link to="/admin/overdue" className="action-card glass-card">
              <div className="action-icon" style={{ background: 'rgba(248, 113, 113, 0.15)' }}>
                <AlertTriangle size={24} color="#f87171" />
              </div>
              <div className="action-info">
                <h3>Overdue Books</h3>
                <p>View and manage overdue returns</p>
              </div>
              <ArrowRight size={20} className="action-arrow" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
