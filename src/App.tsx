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
import AutomationDashboard from './components/automation/AutomationDashboard';
import { CourseProvider } from './contexts/CourseContext';
import { LanguageProvider } from './hooks/useLanguage.tsx';
import { ToastProvider } from './components/ui/Toast';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <LanguageProvider>
          <CourseProvider>
            <ToastProvider />
            <div className="flex flex-col min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.COURSES} element={<CoursesPage />} />
                  <Route path={ROUTES.COURSE_DETAIL} element={<CourseDetailPage />} />
                  <Route path={ROUTES.LESSON} element={<LessonPage />} />
                  <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                  <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                  <Route path="/teacher-registration" element={<AuthPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path={ROUTES.SERVER_STATUS} element={<ServerStatusPage />} />
                  <Route path={ROUTES.WORKFLOWS} element={<WorkflowsPage />} />
                </Routes>
              </main>
              <Footer />
            </Routes>
            </div>
          </CourseProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;