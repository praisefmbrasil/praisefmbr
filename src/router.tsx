import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppHomePage from './pages/AppHomePage';
import ScheduleList from './components/ScheduleList';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import MySoundsPage from './pages/MySoundsPage';
import DevotionalPage from './pages/DevotionalPage';
import { useAuth } from './contexts/AuthContext';

// Componente para proteção de rotas privadas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/app" replace />,
  },
  {
    path: '/app',
    element: <AppHomePage />,
  },
  {
    path: '/schedule',
    element: <ScheduleList onNavigateToProgram={(p) => console.log(p)} />,
  },
  {
    path: '/devotional',
    element: <DevotionalPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-sounds',
    element: (
      <ProtectedRoute>
        <MySoundsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/terms',
    element: <TermsOfUsePage />,
  },
  {
    path: '*',
    element: <Navigate to="/app" replace />,
  },
]);