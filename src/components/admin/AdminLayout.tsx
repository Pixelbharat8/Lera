import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  Video,
  CreditCard,
  Clock,
  GraduationCap,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { Trophy, FileText, Shield, MapPin } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Super Admin gets limited but powerful navigation
  const superAdminNavigation = [
    { name: 'Super Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Teachers', path: '/admin/manage-teachers', icon: Users },
    { name: 'Manage Students', path: '/admin/manage-students', icon: GraduationCap },
    { name: 'System Data', path: '/admin/system-data', icon: BarChart3 },
    { name: 'Design Settings', path: '/admin/design-settings', icon: Settings },
  ];

  // Regular Admin gets full navigation
  const adminNavigation = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'CRM', path: '/admin/crm', icon: Users },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Students', path: '/admin/students', icon: GraduationCap },
    { name: 'Teachers', path: '/admin/teachers', icon: Users },
    { name: 'Tasks', path: '/admin/tasks', icon: CheckSquare },
    { name: 'Live Classes', path: '/admin/live-classes', icon: Video },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Curriculum', path: '/admin/curriculum', icon: GraduationCurriculum },
    { name: 'Attendance', path: '/admin/attendance', icon: Clock },
    { name: 'Task Management', path: '/admin/task-management', icon: ClipboardCheck },
    { name: 'Gamification', path: '/admin/gamification', icon: Trophy },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
    { name: 'Workflows', path: '/admin/workflows', icon: Zap },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const navigation = user?.role === 'super_admin' ? superAdminNavigation : adminNavigation;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/admin" className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LERA Admin</span>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t p-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center w-full"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <ChevronDown className="ml-auto h-5 w-5 text-gray-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-md shadow-lg border">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center h-16 bg-white border-b px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 text-lg font-medium">ERA Admin</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;