import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import AdminRoutes from './routes/AdminRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import StudentRoutes from './routes/StudentRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import HRRoutes from './routes/HRRoutes';
import ServerStatusPage from './pages/ServerStatusPage';
import WorkflowsPage from './pages/WorkflowsPage';
import RoleBasedRedirect from './components/auth/RoleBasedRedirect';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import { LanguageProvider } from './hooks/useLanguage.tsx';
import { ToastProvider } from './components/ui/Toast';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <CourseProvider>
            <ToastProvider />
            <div className="flex flex-col min-h-screen bg-gray-50">
            <Routes>
              {/* Admin Routes */}
              <Route path={`${ROUTES.ADMIN}/*`} element={<AdminRoutes />} />
              
              {/* Teacher Routes */}
              <Route path="/teacher/*" element={<TeacherRoutes />} />
              
              {/* Student Routes */}
              <Route path="/student/*" element={<StudentRoutes />} />

              {/* Employee Routes */}
              <Route path="/employee/*" element={<EmployeeRoutes />} />

              {/* HR Routes */}
              <Route path="/hr/*" element={<HRRoutes />} />

              {/* Public Routes */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.COURSES} element={<CoursesPage />} />
                        <Route path={ROUTES.COURSE_DETAIL} element={<CourseDetailPage />} />
                        <Route path={ROUTES.LESSON} element={<LessonPage />} />
                        <Route path={ROUTES.DASHBOARD} element={<RoleBasedRedirect />} />
                        <Route path={ROUTES.TASKS} element={<TasksPage />} />
                        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path={ROUTES.SERVER_STATUS} element={<ServerStatusPage />} />
                        <Route path={ROUTES.WORKFLOWS} element={<WorkflowsPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
            </div>
          </CourseProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;