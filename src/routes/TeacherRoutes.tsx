import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import TeacherLayout from '../components/teacher/TeacherLayout';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherClasses from '../pages/teacher/TeacherClasses';
import TeacherStudents from '../pages/teacher/TeacherStudents';
import TeacherGrading from '../pages/teacher/TeacherGrading';
import TeacherSchedule from '../pages/teacher/TeacherSchedule';
import TeacherReports from '../pages/teacher/TeacherReports';
import TeacherAI from '../pages/teacher/TeacherAI';

const TeacherRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'instructor') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <TeacherLayout>
      <Routes>
        <Route index element={<TeacherDashboard />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="grading" element={<TeacherGrading />} />
        <Route path="schedule" element={<TeacherSchedule />} />
        <Route path="reports" element={<TeacherReports />} />
        <Route path="ai" element={<TeacherAI />} />
      </Routes>
    </TeacherLayout>
  );
};

export default TeacherRoutes;