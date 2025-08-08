import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminCRM from '../pages/admin/AdminCRM';
import AdminCourses from '../pages/admin/AdminCourses';
import AdminStudents from '../pages/admin/AdminStudents';
import AdminTasks from '../pages/admin/AdminTasks';
import AdminSettings from '../pages/admin/AdminSettings';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminLiveClasses from '../pages/admin/AdminLiveClasses';
import AdminPayments from '../pages/admin/AdminPayments';
import AdminAttendance from '../pages/admin/AdminAttendance';
import AdminCurriculum from '../pages/admin/AdminCurriculum';
import AdminTaskManagement from '../pages/admin/AdminTaskManagement';
import AdminGamification from '../pages/admin/AdminGamification';
import AdminReports from '../pages/admin/AdminReports';
import AdminTeachers from '../pages/admin/AdminTeachers';
import AdminWorkflows from '../pages/admin/AdminWorkflows';
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard';
import SuperAdminTeachers from '../pages/admin/SuperAdminTeachers';
import SuperAdminStudents from '../pages/admin/SuperAdminStudents';
import SuperAdminSystemData from '../pages/admin/SuperAdminSystemData';
import SuperAdminDesignSettings from '../pages/admin/SuperAdminDesignSettings';

const AdminRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        {/* Super Admin Routes */}
        {user?.role === 'super_admin' ? (
          <>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="manage-teachers" element={<SuperAdminTeachers />} />
            <Route path="manage-students" element={<SuperAdminStudents />} />
            <Route path="system-data" element={<SuperAdminSystemData />} />
            <Route path="design-settings" element={<SuperAdminDesignSettings />} />
          </>
        ) : (
          /* Regular Admin Routes */
          <>
            <Route index element={<AdminDashboard />} />
            <Route path="crm" element={<AdminCRM />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="live-classes" element={<AdminLiveClasses />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="curriculum" element={<AdminCurriculum />} />
            <Route path="task-management" element={<AdminTaskManagement />} />
            <Route path="gamification" element={<AdminGamification />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="workflows" element={<AdminWorkflows />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="classrooms" element={<AdminClassrooms />} />
            <Route path="settings" element={<AdminSettings />} />
          </>
        )}
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;