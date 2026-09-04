import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

export default function AdminRoute() {
  const { user, isAuthenticated, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loader variant="spinner" className="min-h-screen" />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
