import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import HRLayout from '../components/hr/HRLayout';
import HRDashboard from '../pages/hr/HRDashboard';
import HREmployees from '../pages/hr/HREmployees';
import HRPayroll from '../pages/hr/HRPayroll';
import HRLeaves from '../pages/hr/HRLeaves';
import HRReports from '../pages/hr/HRReports';

const HRRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'hr_staff') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <HRLayout>
      <Routes>
        <Route index element={<HRDashboard />} />
        <Route path="employees" element={<HREmployees />} />
        <Route path="payroll" element={<HRPayroll />} />
        <Route path="leaves" element={<HRLeaves />} />
        <Route path="reports" element={<HRReports />} />
      </Routes>
    </HRLayout>
  );
};

export default HRRoutes;