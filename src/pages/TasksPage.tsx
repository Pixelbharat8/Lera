import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';
import { Calendar, CheckCircle, Clock, AlertCircle, ChevronRight, Upload, Download, MessageSquare } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  submission?: {
    id: string;
    content: string;
    feedback?: string;
    score?: number;
  };
}

const TasksPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');

  const setMockTasks = useCallback(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Welcome Assignment - Introduction',
        description: 'Introduce yourself in English and tell us about your learning goals.',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        priority: 'medium'
      },
      {
        id: '2',
        title: 'Practice Exercise - Basic Conversation',
        description: 'Complete the conversation practice exercise using common daily phrases.',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        priority: 'medium'
      }
    ];
    setTasks(mockTasks);
  }, []);

  const createSampleTasks = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('tasks')
        .insert([
          {
            student_id: user.id,
            title: 'Welcome Assignment - Introduction',
            description: 'Introduce yourself in English and tell us about your learning goals.',
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            priority: 'medium'
          }
        ]);
    } catch (error) {
      console.error('Error creating sample tasks:', error);
    }
  }, [user]);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      
      // Try to fetch real tasks from database
      const { data: dbTasks, error } = await supabase
        .from('tasks')
        .select(`
          *,
          submission:task_submissions(
            id,
            content,
            feedback,
            score
          )
        `)
        .eq('student_id', user?.id)
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
        // Use mock data as fallback
        setMockTasks();
      } else if (dbTasks && dbTasks.length > 0) {
        // Transform database tasks
        const transformedTasks: Task[] = dbTasks.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.status as Task['status'],
          priority: task.priority as Task['priority'],
          submission: task.submission?.[0] ? {
            id: task.submission[0].id,
            content: task.submission[0].content,
            feedback: task.submission[0].feedback,
            score: task.submission[0].score
          } : undefined
        }));
        setTasks(transformedTasks);
      } else {
        // No tasks in database, create some sample ones
        await createSampleTasks();
        setMockTasks();
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setMockTasks();
    } finally {
      setLoading(false);
    }
  }, [user, setMockTasks, createSampleTasks]);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const handleSubmit = async (taskId: string) => {
    try {
      // Submit to database
      const { error } = await supabase
        .from('task_submissions')
        .insert({
          task_id: taskId,
          student_id: user?.id,
          content: submissionContent
        });

      if (error) throw error;

      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: 'submitted' as const,
                submission: {
                  id: `sub_${Date.now()}`,
                  content: submissionContent
                }
              }
            : task
        )
      );

      setSelectedTask(null);
      setSubmissionContent('');
    } catch (error) {
      console.error('Error submitting task:', error);
      // Still update UI optimistically
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: 'submitted' as const,
                submission: {
                  id: `sub_${Date.now()}`,
                  content: submissionContent
                }
              }
            : task
        )
      );
      setSelectedTask(null);
      setSubmissionContent('');
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status !== 'completed';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{t('tasks.title')}</h1>
              <div className="mt-4 sm:mt-0">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filter === 'all'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('tasks.filter.all')}
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filter === 'pending'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('tasks.filter.pending')}
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filter === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('tasks.filter.completed')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <CheckCircle className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'completed'
                  ? "You haven't completed any tasks yet"
                  : filter === 'pending'
                  ? "You don't have any pending tasks"
                  : "You don't have any tasks yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <span
                          className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {t(`tasks.status.${task.status.replace('_', '')}`)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                      
                      {task.submission?.feedback && (
                        <div className="mt-3 bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center text-sm text-gray-700">
                            <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium">{t('tasks.feedback')}:</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{task.submission.feedback}</p>
                          {task.submission.score !== undefined && (
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              {t('tasks.score')}: {task.submission.score}/100
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center space-x-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          <span>
                            {t('tasks.due')}: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <AlertCircle
                            className={`h-4 w-4 mr-1.5 ${getPriorityColor(
                              task.priority
                            )}`}
                          />
                          <span
                            className={`capitalize ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {t(`tasks.priority.${task.priority}`)} {t('tasks.priority')}
                          </span>
                        </div>
                        {task.status !== 'completed' && (
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Upload className="h-4 w-4 mr-1.5" />
                            {task.submission ? t('tasks.updateSubmission') : t('tasks.submit')}
                          </button>
                        )}
                        {task.submission && (
                          <button
                            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            {t('tasks.download')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('tasks.submit')}: {selectedTask.title}
            </h3>
            <textarea
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('tasks.submit') + '...'}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => handleSubmit(selectedTask.id)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                {t('common.submit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;