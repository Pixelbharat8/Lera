import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Search, Menu, X, BookOpen, BarChart, User, LogOut, Phone, Bell, MessageSquare, Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);
  
  const navigation = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.courses'), path: '/courses' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.tasks'), path: '/tasks' },
    { name: t('nav.workflows'), path: '/workflows' },
    { name: t('nav.contact'), path: '/contact' },
    ...(user?.role === 'admin' ? [{ name: t('nav.admin'), path: '/admin' }] : [])
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setIsLanguageOpen(false);
    setLanguage(langCode);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <BookOpen className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">LERA Academy</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'border-blue-500 text-blue-600 font-semibold'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group`}
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            <a 
              href="tel:+84123456789" 
              className="flex items-center text-blue-600 hover:text-blue-800 mr-6 group transition-all duration-300 hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              <span className="font-medium">+84 123 456 789</span>
            </a>
            
            {/* Language Selector */}
            <div className="relative mr-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center p-2 text-gray-400 hover:text-gray-500 relative group transition-all duration-300 hover:scale-105"
              >
                <Globe className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="ml-1 text-sm font-medium text-gray-700">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 transform origin-top-right transition-all duration-200 scale-100">
                  <div className="py-1" role="menu">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-900">{t('nav.language.select')}</span>
                      <button
                        onClick={() => setIsLanguageOpen(false)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                          language === lang.code 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700'
                        } transition-colors duration-200`}
                        role="menuitem"
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="ml-3 relative">
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="mr-4 p-2 text-gray-400 hover:text-gray-500 relative group transition-all duration-300 hover:scale-110"
                >
                  <Bell className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Link>
                
                {/* Messages */}
                <Link
                  to="/messages"
                  className="mr-4 p-2 text-gray-400 hover:text-gray-500 relative group transition-all duration-300 hover:scale-110"
                >
                  <MessageSquare className="h-6 w-6 group-hover:animate-pulse" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
                </Link>
                
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-110"
                    onClick={toggleProfile}
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-white hover:ring-blue-300 transition-all duration-300"
                      src={user?.avatar || '/ceo.jpg'}
                      alt={user?.name}
                    />
                  </button>
                </div>
                
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 scale-100">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <BarChart className="mr-3 h-4 w-4 text-gray-500" />
                        {t('nav.dashboard')}
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4 text-gray-500" />
                        {t('nav.profile')}
                      </Link>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        role="menuitem"
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                      >
                        <LogOut className="mr-3 h-4 w-4 text-gray-500" />
                        {t('nav.signout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  {t('nav.signin')}
                </Link>
                <Link
                  to="/auth?register=true"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            {/* Mobile Language Selector */}
            <div className="relative mr-2">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-400 hover:text-gray-500 transition-all duration-300 hover:scale-110"
              >
                <Globe className="h-6 w-6" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="flex items-center justify-between px-3 py-2 border-b">
                      <span className="text-xs font-medium text-gray-900">Language</span>
                      <button
                        onClick={() => setIsLanguageOpen(false)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${
                          language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {isAuthenticated && (
              <Link to="/dashboard" className="mr-4 transition-all duration-300 hover:scale-110">
                <img
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-300"
                  src={user?.avatar || '/ceo.jpg'}
                  alt={user?.name}
                />
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden transform transition-all duration-300 ease-out">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 hover:translate-x-2`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user?.avatar || '/ceo.jpg'}
                    alt={user?.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  {t('nav.dashboard')}
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  {t('nav.profile')}
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  {t('nav.signout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4 space-y-2">
              <Link
                to="/auth"
                className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 btn-interactive"
                onClick={toggleMenu}
              >
                {t('nav.signin')}
              </Link>
              <Link
                to="/auth?register=true"
                className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 btn-interactive"
                onClick={toggleMenu}
              >
                {t('nav.signup')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;