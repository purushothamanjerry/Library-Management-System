import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  UserCheck,
  BookPlus,
  BookCopy,
  AlertTriangle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/books', icon: <BookOpen size={20} />, label: 'Browse Books' },
    { to: '/my-books', icon: <ClipboardList size={20} />, label: 'My Books' },
  ];

  const adminLinks = [
    { to: '/admin/users', icon: <UserCheck size={20} />, label: 'Manage Users' },
    { to: '/admin/add-book', icon: <BookPlus size={20} />, label: 'Add Book' },
    { to: '/admin/borrow', icon: <BookCopy size={20} />, label: 'Borrow Book' },
    { to: '/admin/overdue', icon: <AlertTriangle size={20} />, label: 'Overdue Books' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <BookOpen className="sidebar-logo" size={28} />
          {!collapsed && <span>LMS Pro</span>}
        </div>
        <button className="sidebar-toggle" onClick={onToggle}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <span className="nav-label">Menu</span>}
          {userLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </div>

        {isAdmin && (
          <div className="nav-section">
            {!collapsed && <span className="nav-label">Admin</span>}
            {adminLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            <div className="user-avatar">{user?.email?.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
