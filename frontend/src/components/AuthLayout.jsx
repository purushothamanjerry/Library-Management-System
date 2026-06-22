import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      {/* Decorative background elements */}
      <div className="glass-orb orb-1"></div>
      <div className="glass-orb orb-2"></div>
      
      <div className="auth-card">
        <div className="auth-brand">
          <BookOpen className="brand-icon" size={40} />
          <h1>LMS Pro</h1>
          <p>Your Premium Library Experience</p>
        </div>
        
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
