import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import StudentLayout from '../components/student/StudentLayout';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentCourses from '../pages/student/StudentCourses';
import StudentAssignments from '../pages/student/StudentAssignments';
import StudentProgress from '../pages/student/StudentProgress';
import StudentSchedule from '../pages/student/StudentSchedule';
import KidsAIPlayground from '../components/student/KidsAIPlayground';

const StudentRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'student') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <StudentLayout>
      <Routes>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="playground" element={<KidsAIPlayground />} />
      </Routes>
    </StudentLayout>
  );
};

export default StudentRoutes;