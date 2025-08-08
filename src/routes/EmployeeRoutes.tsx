import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import EmployeeLayout from '../components/employee/EmployeeLayout';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import EmployeeAI from '../pages/employee/EmployeeAI';

const EmployeeRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'employee') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <EmployeeLayout>
      <Routes>
        <Route index element={<EmployeeDashboard />} />
        <Route path="ai" element={<EmployeeAI />} />
      </Routes>
    </EmployeeLayout>
  );
};

export default EmployeeRoutes;