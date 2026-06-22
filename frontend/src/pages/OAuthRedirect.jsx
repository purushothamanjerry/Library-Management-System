import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard to ensure this runs exactly once
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');
    if (token) {
      login(token);
      // Use setTimeout to let state settle before navigating
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner"></div>
    </div>
  );
};

export default OAuthRedirect;
