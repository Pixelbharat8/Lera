import React, { useState } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { showToast } from '../components/ui/Toast';
import { BookOpen, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const AuthPage = () => {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [isRegister, setIsRegister] = useState(() => {
    return searchParams.get('register') === 'true';
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.form;
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (isRegister && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      if (isRegister) {
        await register(formData.name, formData.email, formData.password);
        showToast.success('Account created successfully! Welcome to LERA Academy!');
        const redirectTo = searchParams.get('redirect') || '/dashboard';
        navigate(redirectTo);
      } else {
        try {
          await login(formData.email, formData.password);
          showToast.success('Welcome back! Loading your dashboard...');
          const redirectTo = searchParams.get('redirect') || '/dashboard';
          navigate(redirectTo);
        } catch (loginError: any) {
          // If login fails with invalid credentials and it's a demo account, try to create it first
          if (loginError?.code === 'invalid_credentials' && isDemoAccount(formData.email)) {
            try {
              showToast.info('Demo account not found. Creating it for you...');
              const demoName = getDemoAccountName(formData.email);
              await register(demoName, formData.email, formData.password);
              showToast.success('Demo account created! Logging you in...');
              await login(formData.email, formData.password);
              showToast.success('Welcome to LERA Academy!');
              const redirectTo = searchParams.get('redirect') || '/dashboard';
              navigate(redirectTo);
            } catch (registerError: any) {
              // If registration also fails, show the original login error
              throw loginError;
            }
          } else {
            throw loginError;
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Parse nested JSON error structure from Supabase
      let errorCode = error?.code;
      let errorDetailMessage = error?.message;
      
      // First, try to parse error.message if it's a stringified JSON
      if (error?.message && typeof error.message === 'string' && error.message.startsWith('{')) {
        try {
          const parsedMessage = JSON.parse(error.message);
          
          // Check if the parsed message has a body property (another stringified JSON)
          if (parsedMessage.body && typeof parsedMessage.body === 'string') {
            const parsedBody = JSON.parse(parsedMessage.body);
            if (parsedBody.code) {
              errorCode = parsedBody.code;
            }
            if (parsedBody.message) {
              errorDetailMessage = parsedBody.message;
            }
          } else if (parsedMessage.code) {
            // Direct error code in the parsed message
            errorCode = parsedMessage.code;
            if (parsedMessage.message) {
              errorDetailMessage = parsedMessage.message;
            }
          }
        } catch (parseError) {
          console.warn('Failed to parse error.message:', parseError);
        }
      }
      
      // Fallback: try to parse error.body if it exists
      if (!errorCode && error?.body && typeof error.body === 'string') {
        try {
          const parsedBody = JSON.parse(error.body);
          if (parsedBody.code) {
            errorCode = parsedBody.code;
          }
          if (parsedBody.message) {
            errorDetailMessage = parsedBody.message;
          }
        } catch (parseError) {
          console.warn('Failed to parse error body:', parseError);
        }
      }
      
      let errorMessage = isRegister ? 'Registration failed. Please try again.' : 'Sign in failed. Please try again.';
      
      // Handle Supabase auth errors
      if (errorCode) {
        switch (errorCode) {
          case 'user_already_exists':
            errorMessage = 'This email is already registered. Please sign in instead.';
            // Auto-switch to sign in
            setIsRegister(false);
            // Update URL to remove register parameter
            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.delete('register');
            navigate({ ...location, search: newSearchParams.toString() }, { replace: true });
            // Clear registration-only fields
            setFormData(prev => ({ ...prev, name: '', confirmPassword: '' }));
            break;
          case 'invalid_credentials':
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            break;
          case 'email_not_confirmed':
            errorMessage = 'Please check your email and click the confirmation link before signing in.';
            break;
          default:
            errorMessage = errorDetailMessage || errorMessage;
        }
      } else if (errorDetailMessage) {
        if (errorDetailMessage.includes('User already registered') || errorDetailMessage.includes('user_already_exists')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
          setIsRegister(false);
        } else if (errorDetailMessage.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else {
          errorMessage = errorDetailMessage;
        }
      }
      
      setErrors({ form: errorMessage });
      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fillDemoCredentials = (email: string, password: string, name?: string) => {
    setFormData({
      name: name || '',
      email,
      password,
      confirmPassword: isRegister ? password : ''
    });
  };

  const isDemoAccount = (email: string) => {
    const demoEmails = [
      'demo@lera-academy.com',
      'teacher@lera-academy.com', 
      'admin@lera-academy.com',
      'superadmin@lera-academy.com'
    ];
    return demoEmails.includes(email.toLowerCase());
  };

  const getDemoAccountName = (email: string) => {
    switch (email.toLowerCase()) {
      case 'demo@lera-academy.com': return 'Demo Student';
      case 'teacher@lera-academy.com': return 'Demo Teacher';
      case 'admin@lera-academy.com': return 'Demo Admin';
      case 'superadmin@lera-academy.com': return 'Super Admin';
      default: return 'Demo User';
    }
  };
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    // Update URL
    const newSearchParams = new URLSearchParams(location.search);
    if (!isRegister) {
      newSearchParams.set('register', 'true');
    } else {
      newSearchParams.delete('register');
    }
    navigate({ ...location, search: newSearchParams.toString() }, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">LERA Academy</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isRegister ? t('auth.signup.title') : t('auth.signin.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegister ? t('auth.signup.subtitle') : t('auth.signin.subtitle')}
          </p>
        </div>
        
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{errors.form}</div>
                {errors.form.includes('Invalid email or password') && (
                  <div className="text-xs mt-2 space-y-1">
                    <p>• Try the demo accounts below</p>
                    <p>• Make sure you have an account - try signing up instead</p>
                    <p>• Password is case-sensitive</p>
                  </div>
                )}
                {errors.form.includes('already registered') && (
                  <div className="mt-2">
                    <p className="text-xs mb-2">This email is already registered.</p>
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors"
                    >
                      Switch to Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('auth.form.name')}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder={t('auth.form.name')}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('auth.form.email')}</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('auth.form.password')}</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            {isRegister && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">{t('auth.form.confirmPassword')}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            {!isRegister && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    {t('auth.form.rememberMe')}
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    {t('auth.form.forgotPassword')}
                  </a>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegister ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isRegister ? t('auth.button.signup') : t('auth.button.signin')
                )}
              </button>
            </div>
          </form>
          
          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center mb-3">
              <p className="text-sm font-medium text-blue-800">Demo Accounts Available</p>
              <p className="text-xs text-blue-600">Click to fill credentials automatically</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Student', email: 'demo@lera-academy.com', password: 'demo123456', name: 'Demo Student' },
                { label: 'Teacher', email: 'teacher@lera-academy.com', password: 'demo123456', name: 'Demo Teacher' },
                { label: 'Admin', email: 'admin@lera-academy.com', password: 'demo123456', name: 'Demo Admin' },
                { label: 'Super Admin', email: 'superadmin@lera-academy.com', password: 'demo123456', name: 'Super Admin' }
              ].map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => fillDemoCredentials(account.email, account.password, account.name)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded transition-colors font-medium"
                >
                  {account.label}
                </button>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-blue-700">
                All demo accounts use password: <code className="bg-blue-100 px-1 rounded">demo123456</code>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isRegister ? t('auth.switch.hasAccount') : t('auth.switch.noAccount')}{' '}
            <button
              type="button"
              onClick={toggleAuthMode}
              disabled={isSubmitting}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors disabled:opacity-50"
            >
              {isRegister ? t('nav.signin') : t('nav.signup')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;