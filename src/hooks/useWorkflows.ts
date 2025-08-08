import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'event' | 'schedule' | 'manual';
    event?: string;
    schedule?: string;
  };
  actions: WorkflowAction[];
  isActive: boolean;
  category: string;
  icon: string;
}

export interface WorkflowAction {
  id: string;
  type: 'email' | 'sms' | 'notification' | 'webhook' | 'database' | 'integration';
  name: string;
  config: Record<string, any>;
  order: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  error?: string;
  logs: WorkflowLog[];
}

export interface WorkflowLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  actionId?: string;
}

export const useWorkflows = () => {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkflows();
      fetchExecutions();
    }
  }, [user]);

  const fetchWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  };

  const fetchExecutions = async () => {
    try {
      const { data, error } = await supabase
        .from('workflow_executions')
        .select(`
          *,
          workflow:workflow_templates(name)
        `)
        .order('started_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setExecutions(data || []);
    } catch (error) {
      console.error('Error fetching executions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkflow = async (workflowData: Omit<WorkflowTemplate, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .insert(workflowData)
        .select()
        .single();

      if (error) throw error;
      
      setWorkflows(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  };

  const updateWorkflow = async (workflowId: string, updates: Partial<WorkflowTemplate>) => {
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .update(updates)
        .eq('id', workflowId)
        .select()
        .single();

      if (error) throw error;
      
      setWorkflows(prev => prev.map(w => w.id === workflowId ? data : w));
      return data;
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  };

  const deleteWorkflow = async (workflowId: string) => {
    try {
      const { error } = await supabase
        .from('workflow_templates')
        .delete()
        .eq('id', workflowId);

      if (error) throw error;
      
      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw error;
    }
  };

  const executeWorkflow = async (workflowId: string, triggerData?: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('execute-workflow', {
        body: { workflowId, triggerData }
      });

      if (error) throw error;
      
      // Refresh executions
      fetchExecutions();
      return data;
    } catch (error) {
      console.error('Error executing workflow:', error);
      throw error;
    }
  };

  const triggerWebhook = async (eventType: string, eventData: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('n8n-webhooks', {
        body: { eventType, eventData }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error triggering webhook:', error);
      throw error;
    }
  };

  // Pre-built workflow templates
  const getWorkflowTemplates = () => [
    {
      name: 'Welcome New Student',
      description: 'Send welcome email and setup tasks when student enrolls',
      trigger: { type: 'event' as const, event: 'student_enrolled' },
      actions: [
        { id: '1', type: 'email' as const, name: 'Send Welcome Email', config: { template: 'welcome' }, order: 1 },
        { id: '2', type: 'notification' as const, name: 'Notify Teacher', config: { type: 'new_student' }, order: 2 },
        { id: '3', type: 'database' as const, name: 'Create Study Plan', config: { table: 'study_plans' }, order: 3 }
      ],
      category: 'Student Management',
      icon: '👋',
      isActive: true
    },
    {
      name: 'Payment Processing',
      description: 'Handle payment confirmations and course access',
      trigger: { type: 'event' as const, event: 'payment_received' },
      actions: [
        { id: '1', type: 'email' as const, name: 'Payment Confirmation', config: { template: 'payment_success' }, order: 1 },
        { id: '2', type: 'database' as const, name: 'Grant Course Access', config: { table: 'enrollments' }, order: 2 },
        { id: '3', type: 'integration' as const, name: 'Update CRM', config: { system: 'salesforce' }, order: 3 }
      ],
      category: 'Finance',
      icon: '💳',
      isActive: true
    },
    {
      name: 'Assignment Grading',
      description: 'Auto-grade quizzes and notify students of results',
      trigger: { type: 'event' as const, event: 'assignment_submitted' },
      actions: [
        { id: '1', type: 'webhook' as const, name: 'Auto-Grade Quiz', config: { url: '/grade-quiz' }, order: 1 },
        { id: '2', type: 'email' as const, name: 'Send Results', config: { template: 'grade_notification' }, order: 2 },
        { id: '3', type: 'notification' as const, name: 'Update Progress', config: { type: 'progress_update' }, order: 3 }
      ],
      category: 'Academic',
      icon: '📝',
      isActive: true
    },
    {
      name: 'Attendance Tracking',
      description: 'Monitor attendance and alert for concerning patterns',
      trigger: { type: 'schedule' as const, schedule: '0 9 * * *' }, // Daily at 9 AM
      actions: [
        { id: '1', type: 'database' as const, name: 'Check Attendance', config: { query: 'attendance_check' }, order: 1 },
        { id: '2', type: 'email' as const, name: 'Alert Low Attendance', config: { template: 'attendance_alert' }, order: 2 },
        { id: '3', type: 'sms' as const, name: 'SMS Parent Alert', config: { threshold: '80%' }, order: 3 }
      ],
      category: 'Monitoring',
      icon: '📊',
      isActive: true
    },
    {
      name: 'Monthly Progress Report',
      description: 'Generate and distribute monthly progress reports',
      trigger: { type: 'schedule' as const, schedule: '0 9 1 * *' }, // First day of month at 9 AM
      actions: [
        { id: '1', type: 'database' as const, name: 'Generate Report Data', config: { type: 'monthly_progress' }, order: 1 },
        { id: '2', type: 'integration' as const, name: 'Create PDF Report', config: { service: 'pdf_generator' }, order: 2 },
        { id: '3', type: 'email' as const, name: 'Distribute Reports', config: { template: 'monthly_report' }, order: 3 }
      ],
      category: 'Reporting',
      icon: '📈',
      isActive: true
    },
    {
      name: 'Live Class Reminders',
      description: 'Send reminders before live classes start',
      trigger: { type: 'schedule' as const, schedule: '*/30 * * * *' }, // Every 30 minutes
      actions: [
        { id: '1', type: 'database' as const, name: 'Check Upcoming Classes', config: { lookahead: '1_hour' }, order: 1 },
        { id: '2', type: 'email' as const, name: 'Email Reminder', config: { template: 'class_reminder' }, order: 2 },
        { id: '3', type: 'notification' as const, name: 'Push Notification', config: { type: 'class_starting' }, order: 3 }
      ],
      category: 'Classes',
      icon: '⏰',
      isActive: true
    }
  ];

  const getIntegrationOptions = () => [
    { id: 'email', name: 'Email Service', icon: '📧', config: ['smtp_server', 'username', 'password'] },
    { id: 'sms', name: 'SMS Service', icon: '📱', config: ['api_key', 'sender_id'] },
    { id: 'slack', name: 'Slack', icon: '💬', config: ['webhook_url', 'channel'] },
    { id: 'discord', name: 'Discord', icon: '🎮', config: ['webhook_url'] },
    { id: 'zoom', name: 'Zoom', icon: '📹', config: ['api_key', 'api_secret'] },
    { id: 'google_drive', name: 'Google Drive', icon: '📁', config: ['client_id', 'client_secret'] },
    { id: 'salesforce', name: 'Salesforce', icon: '☁️', config: ['instance_url', 'access_token'] },
    { id: 'hubspot', name: 'HubSpot', icon: '🧲', config: ['api_key'] },
    { id: 'mailchimp', name: 'Mailchimp', icon: '🐵', config: ['api_key', 'list_id'] },
    { id: 'stripe', name: 'Stripe', icon: '💳', config: ['api_key', 'webhook_secret'] }
  ];

  return {
    workflows,
    executions,
    isLoading,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    triggerWebhook,
    getWorkflowTemplates,
    getIntegrationOptions,
    fetchWorkflows,
    fetchExecutions
  };
};