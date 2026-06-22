import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthRedirect from './pages/OAuthRedirect';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';
import ManageUsers from './pages/admin/ManageUsers';
import AddBook from './pages/admin/AddBook';
import BorrowBook from './pages/admin/BorrowBook';
import OverdueBooks from './pages/admin/OverdueBooks';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* OAuth2 Redirect */}
            <Route path="/oauth2/redirect" element={<OAuthRedirect />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/my-books" element={<MyBooks />} />

              {/* Admin Only Routes */}
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly><ManageUsers /></ProtectedRoute>
              } />
              <Route path="/admin/add-book" element={
                <ProtectedRoute adminOnly><AddBook /></ProtectedRoute>
              } />
              <Route path="/admin/borrow" element={
                <ProtectedRoute adminOnly><BorrowBook /></ProtectedRoute>
              } />
              <Route path="/admin/overdue" element={
                <ProtectedRoute adminOnly><OverdueBooks /></ProtectedRoute>
              } />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
