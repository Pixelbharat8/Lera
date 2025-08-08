import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/auth');
        return;
      }

      // Redirect based on user role
      switch (user?.role) {
        case 'super_admin':
        case 'admin':
          navigate('/admin');
          break;
        case 'instructor':
          navigate('/teacher');
          break;
        case 'hr_staff':
          navigate('/hr');
          break;
        case 'employee':
          navigate('/employee');
          break;
        case 'student':
        default:
          navigate('/student');
          break;
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export default RoleBasedRedirect;