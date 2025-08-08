import { useEffect } from 'react';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Bell, CheckCircle, AlertCircle, Info, X, Mail, Calendar, BookOpen, Award } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  category: string;
}

const NotificationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      
      // First try to get real notifications from database
      const { data: dbNotifications, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching notifications:', error);
        // Use mock data as fallback
        setMockNotifications();
      } else if (dbNotifications && dbNotifications.length > 0) {
        // Transform database notifications
        const transformedNotifications: Notification[] = dbNotifications.map(notification => ({
          id: notification.id,
          userId: notification.user_id,
          title: notification.title,
          message: notification.message,
          type: notification.type as 'info' | 'success' | 'warning' | 'error',
          read: notification.read || false,
          createdAt: notification.created_at,
          actionUrl: notification.action_url,
          actionText: notification.action_text,
          priority: 'medium' as const,
          category: notification.category || 'General',
          expiresAt: notification.expires_at
        }));
        setNotifications(transformedNotifications);
      } else {
        // No notifications in database, create some sample ones
        await createSampleNotifications();
        setMockNotifications();
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      setMockNotifications();
    } finally {
      setLoading(false);
    }
  };

  const setMockNotifications = () => {
    setNotifications([
      {
        id: '1',
        userId: user?.id || '',
        title: 'Welcome to LERA Academy!',
        message: 'Start your English learning journey with our expert instructors and interactive courses.',
        type: 'info',
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: '/courses',
        actionText: 'Browse Courses',
        priority: 'medium',
        category: 'Welcome'
      },
      {
        id: '2',
        title: 'Course Recommendation',
        message: 'Based on your profile, we recommend starting with our English Foundation Builder course.',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        actionUrl: '/courses/3',
        actionText: 'View Course',
        priority: 'medium',
        category: 'Recommendation',
        userId: user?.id || ''
      }
    ]);
  };

  const createSampleNotifications = async () => {
    if (!user) return;

    try {
      await supabase
        .from('notifications')
        .insert([
          {
            user_id: user.id,
            title: 'Welcome to LERA Academy!',
            message: 'Start your English learning journey with our expert instructors and interactive courses.',
            type: 'info',
            read: false,
            action_url: '/courses',
            action_text: 'Browse Courses',
            category: 'Welcome'
          }
        ]);
    } catch (error) {
      console.error('Error creating sample notifications:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'Achievement':
        return <Award className="h-4 w-4 text-yellow-600" />;
      case 'Class':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'Payment':
        return <Mail className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'important') return notif.type === 'warning' || notif.type === 'error';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'important', label: 'Important', count: notifications.filter(n => n.type === 'warning' || n.type === 'error').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium ${
                  filter === key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
                {count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread' ? "You're all caught up!" : "No notifications to display."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className={`text-lg font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          {getCategoryIcon(notification.category)}
                          <span className="ml-1 mr-4">{notification.category}</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(notification.createdAt).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              {notification.actionText || 'View'}
                            </a>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 ml-4"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
          <div className="space-y-4">
            {[
              { label: 'Course Updates', description: 'New lessons, assignments, and announcements', enabled: true },
              { label: 'Live Class Reminders', description: 'Notifications before scheduled live classes', enabled: true },
              { label: 'Achievement Notifications', description: 'Badge earnings and milestone celebrations', enabled: true },
              { label: 'Payment Reminders', description: 'Payment due dates and confirmations', enabled: false },
              { label: 'Marketing Updates', description: 'New courses and promotional offers', enabled: false }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{setting.label}</div>
                  <div className="text-sm text-gray-600">{setting.description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={setting.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;