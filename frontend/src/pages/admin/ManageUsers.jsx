import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import { UserCheck, Trash2, Inbox } from 'lucide-react';
import './AdminPages.css';

const TABS = ['New Requests', 'All Users', 'Admins'];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('New Requests');
  const { addToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      addToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email) => {
    try {
      await adminAPI.approveRequest(email);
      addToast(`${email} approved!`, 'success');
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status: 'APPROVED' } : u))
      );
    } catch (err) {
      addToast(err.response?.data || 'Failed to approve', 'error');
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to remove ${user.email}?`)) return;
    try {
      await adminAPI.deleteUser(user.id);
      addToast(`${user.email} removed`, 'success');
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      addToast(err.response?.data || 'Failed to delete', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      PENDING: 'badge-warning',
      APPROVED: 'badge-success',
      REJECTED: 'badge-danger',
    };
    return map[status] || 'badge-info';
  };

  const getRoleBadge = (role) => {
    return role === 'ADMIN' ? 'badge-info' : 'badge-success';
  };

  const filteredUsers = users.filter((user) => {
    if (activeTab === 'New Requests') return user.status === 'PENDING';
    if (activeTab === 'Admins') return user.role === 'ADMIN';
    return true; // 'All Users' tab
  });

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Manage Users</h1>
        <p>View registered users, approve pending requests, or remove users</p>
      </div>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div></div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <Inbox size={48} />
            <h3>No users found</h3>
            <p>
              {activeTab === 'New Requests'
                ? 'There are no pending registration requests'
                : activeTab === 'Admins'
                ? 'There are no other admin users'
                : 'There are no registered users yet'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {user.name || '—'}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${getRoleBadge(user.role)}`}>{user.role}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(user.status)}`}>{user.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {user.status === 'PENDING' && (
                          <button className="btn-sm btn-success" onClick={() => handleApprove(user.email)}>
                            <UserCheck size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                            Approve
                          </button>
                        )}
                        <button className="btn-sm btn-danger" onClick={() => handleDelete(user)}>
                          <Trash2 size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                          Remove
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

export default ManageUsers;

