import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        console.log('Not authenticated, redirecting to auth');
        navigate('/auth');
        return;
      }

      console.log('Redirecting user with role:', user.role);
      
      // Redirect based on user role
      switch (user.role) {
        case 'super_admin':
          console.log('Redirecting to super admin dashboard');
          navigate('/admin');
          break;
        case 'admin':
          console.log('Redirecting to admin dashboard');
          navigate('/admin');
          break;
        case 'instructor':
          console.log('Redirecting to teacher dashboard');
          navigate('/teacher');
          break;
        case 'hr_staff':
          console.log('Redirecting to HR dashboard');
          navigate('/hr');
          break;
        case 'employee':
          console.log('Redirecting to employee dashboard');
          navigate('/employee');
          break;
        case 'student':
        default:
          console.log('Redirecting to student dashboard');
          navigate('/student');
          break;
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">
          {isLoading ? 'Loading your account...' : 'Redirecting to your dashboard...'}
        </p>
        {user && (
          <p className="mt-2 text-sm text-gray-500">
            Welcome back, {user.name}! ({user.role})
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleBasedRedirect;