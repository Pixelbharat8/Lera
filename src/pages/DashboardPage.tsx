import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';
import GamificationPanel from '../components/gamification/GamificationPanel';
import LearningAnalytics from '../components/analytics/LearningAnalytics';
import InViewAnimation from '../components/ui/InViewAnimation';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { BookOpen, Clock, Calendar, Award, PlayCircle, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const { courses } = useCourses();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');
  
  const [dashboardData, setDashboardData] = useState({
    totalHours: 0,
    totalCertificates: 0,
    weeklyHours: 0,
    recentActivity: [] as any[]
  });

  const userCourses = courses.filter(course => course.enrolled);

  const loadDashboardData = useCallback(async () => {
    try {
      // For demo purposes, generate realistic mock data
      console.log('Loading dashboard data for user:', user?.id);
      
      const totalHours = Math.floor(Math.random() * 50) + 30; // 30-80 hours
      const totalCertificates = Math.floor(Math.random() * 3) + 1; // 1-3 certificates
      const weeklyHours = Math.floor(Math.random() * 10) + 5; // 5-15 hours per week
      
      setDashboardData({
        totalHours,
        totalCertificates,
        weeklyHours,
        recentActivity: []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, loadDashboardData]);
  
  // Ensure realistic minimum values for better UX
  const displayStats = {
    ...dashboardData,
    totalHours: Math.max(dashboardData.totalHours, 42),
    weeklyHours: Math.max(dashboardData.weeklyHours, 8)
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please sign in</h2>
          <p className="mt-2 text-gray-600">You need to be logged in to view your dashboard.</p>
          <Link
            to="/auth"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  const inProgressCourses = userCourses.filter(course => course.progress !== undefined && course.progress < 100);
  const completedCourses = userCourses.filter(course => course.progress === 100);

  // Mock gamification data
  const gamificationData = {
    points: 2450,
    level: 8,
    badges: ['Quick Learner', 'Quiz Master', 'Streak Champion', 'Course Completer'],
    streak: 15,
    nextLevelPoints: 550
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold animate-pulse">{t('dashboard.welcome')}, {user.name}!</h1>
                <p className="text-blue-100">{t('dashboard.subtitle')}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/courses"
                className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 btn-interactive hover:scale-105"
              >
                {t('courses.title')}
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-all duration-300 btn-interactive hover:scale-105"
              >
                {t('nav.profile')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gamification Panel */}
      <InViewAnimation animation="fade-in-up" delay={200} className="mb-10">
        <GamificationPanel {...gamificationData} />
      </InViewAnimation>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InViewAnimation animation="fade-in-up" delay={100} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover-lift">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('dashboard.stats.enrolledCourses')}</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedCounter end={userCourses.length} />
              </p>
            </div>
          </InViewAnimation>
          
          <InViewAnimation animation="fade-in-up" delay={200} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover-lift">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('dashboard.stats.hoursSpent')}</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedCounter end={displayStats.totalHours} />
              </p>
            </div>
          </InViewAnimation>
          
          <InViewAnimation animation="fade-in-up" delay={300} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover-lift">
            <div className="p-3 bg-teal-100 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('dashboard.stats.thisWeek')}</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedCounter end={displayStats.weeklyHours} suffix=" hrs" />
              </p>
            </div>
          </InViewAnimation>
          
          <InViewAnimation animation="fade-in-up" delay={400} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover-lift">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('dashboard.stats.certificates')}</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedCounter end={Math.max(displayStats.totalCertificates, 2)} />
              </p>
            </div>
          </InViewAnimation>
        </div>
        
        {/* Continue learning section */}
        {inProgressCourses.length > 0 && (
          <InViewAnimation animation="fade-in-up" delay={500} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboard.contineLearning')}</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              {inProgressCourses.map((course, index) => (
                <div 
                  key={course.id}
                  className={`${index !== inProgressCourses.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors duration-300`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center group">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span>{course.category}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {course.progress !== undefined ? `${course.progress}% complete` : 'Not started'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            to={`/courses/${course.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                          >
                            {t('courseDetail.title') || 'Course Details'}
                          </Link>
                          <Link
                            to={`/lesson/101`} // This would be the next lesson ID in a real app
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 btn-interactive hover:scale-105"
                          >
                            <PlayCircle className="h-4 w-4 mr-2" />
                            {t('course.continueLearning')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InViewAnimation>
        )}
        
        {/* Tab navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveTab('courses')}
            >
              {t('dashboard.tabs.courses')}
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveTab('analytics')}
            >
              {t('dashboard.tabs.analytics')}
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveTab('achievements')}
            >
              {t('dashboard.tabs.achievements')}
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calendar'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveTab('calendar')}
            >
              {t('dashboard.tabs.calendar')}
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'wishlist'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-all duration-300`}
              onClick={() => setActiveTab('wishlist')}
            >
              {t('dashboard.tabs.wishlist')}
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCourses.map(course => (
              <InViewAnimation key={course.id} animation="fade-in-up" delay={100}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover-lift">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{course.level}</span>
                    <span>{course.totalLessons} lessons</span>
                  </div>
                  
                  {course.progress !== undefined && (
                    <>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                  
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:translate-x-2"
                  >
                    View Course <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              </InViewAnimation>
            ))}
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <LearningAnalytics />
        )}
        
        {activeTab === 'achievements' && (
          <InViewAnimation animation="fade-in-up" className="bg-white rounded-lg shadow-sm p-8 text-center hover-lift">
            <Award className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn Your First Certificate</h3>
            <p className="text-gray-600 mb-6">
              Complete a course to earn certificates and showcase your achievements.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 btn-interactive hover:scale-105"
            >
              Browse Courses
            </Link>
          </InViewAnimation>
        )}
        
        {activeTab === 'calendar' && (
          <InViewAnimation animation="fade-in-up" className="bg-white rounded-lg shadow-sm p-8 text-center hover-lift">
            <Calendar className="h-16 w-16 text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Learning Schedule</h3>
            <p className="text-gray-600 mb-6">
              You don't have any upcoming events scheduled. Add a class to your calendar.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 btn-interactive hover:scale-105"
            >
              Find Live Classes
            </Link>
          </InViewAnimation>
        )}
        
        {activeTab === 'wishlist' && (
          <InViewAnimation animation="fade-in-up" className="bg-white rounded-lg shadow-sm p-8 text-center hover-lift">
            <BookOpen className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-600 mb-6">
              Save courses you're interested in to your wishlist for later.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 btn-interactive hover:scale-105"
            >
              Discover Courses
            </Link>
          </InViewAnimation>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;