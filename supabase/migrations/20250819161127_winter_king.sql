/*
  # Enhanced Notifications System

  1. New Tables
    - `notifications` - System notifications for users
    - `notification_templates` - Reusable notification templates
    - `notification_preferences` - User notification preferences
    - `notification_channels` - Available notification channels
    
  2. Security
    - Enable RLS on all notification tables
    - Users can only view their own notifications
    - Admins can send system-wide notifications
*/

-- Notifications Table (Enhanced)
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'reminder')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category text DEFAULT 'general',
  is_read boolean DEFAULT false,
  action_url text,
  action_text text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  expires_at timestamptz,
  delivery_method text DEFAULT 'in_app' CHECK (delivery_method IN ('in_app', 'email', 'sms', 'push')),
  delivery_status text DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'failed')),
  template_id uuid,
  template_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notification Templates Table
CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  title_template text NOT NULL,
  message_template text NOT NULL,
  type text DEFAULT 'info',
  category text DEFAULT 'general',
  variables text[] DEFAULT '{}', -- List of variable names like ['student_name', 'course_title']
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notification Preferences Table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  email_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT false,
  push_notifications boolean DEFAULT true,
  in_app_notifications boolean DEFAULT true,
  frequency text DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'never')),
  quiet_hours_start time DEFAULT '22:00',
  quiet_hours_end time DEFAULT '08:00',
  categories jsonb DEFAULT '{}'::jsonb, -- Category-specific preferences
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Communication Messages Table
CREATE TABLE IF NOT EXISTS communication_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject text,
  content text NOT NULL,
  message_type text DEFAULT 'internal' CHECK (message_type IN ('internal', 'email', 'sms')),
  status text DEFAULT 'sent' CHECK (status IN ('draft', 'sent', 'delivered', 'read', 'replied')),
  thread_id uuid, -- For grouping related messages
  parent_message_id uuid REFERENCES communication_messages(id),
  attachments jsonb DEFAULT '[]'::jsonb,
  scheduled_send_at timestamptz,
  read_at timestamptz,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage notification templates"
  ON notification_templates FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role_type IN ('admin', 'super_admin')
      AND ur.is_active = true
    )
  );

CREATE POLICY "Users can manage their notification preferences"
  ON notification_preferences FOR ALL TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Communication Messages Policies
CREATE POLICY "Users can view messages they sent or received"
  ON communication_messages FOR SELECT TO authenticated
  USING (
    from_user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR to_user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can send messages"
  ON communication_messages FOR INSERT TO authenticated
  WITH CHECK (
    from_user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update messages they sent"
  ON communication_messages FOR UPDATE TO authenticated
  USING (
    from_user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_communication_messages_from_user ON communication_messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_communication_messages_to_user ON communication_messages(to_user_id);
CREATE INDEX IF NOT EXISTS idx_user_gamification_user_id ON user_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user_id ON point_transactions(user_id);

-- Triggers
CREATE TRIGGER update_notifications_updated_at
    BEFORE UPDATE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_templates_updated_at
    BEFORE UPDATE ON notification_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
    BEFORE UPDATE ON notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_messages_updated_at
    BEFORE UPDATE ON communication_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default notification templates
INSERT INTO notification_templates (name, title_template, message_template, type, category, variables) VALUES
('welcome_student', 'Welcome to LERA Academy!', 'Hi {{student_name}}, welcome to {{course_name}}! We''re excited to have you start your learning journey.', 'info', 'welcome', ARRAY['student_name', 'course_name']),
('assignment_due', 'Assignment Due Reminder', 'Hi {{student_name}}, your assignment "{{assignment_title}}" is due on {{due_date}}.', 'reminder', 'academic', ARRAY['student_name', 'assignment_title', 'due_date']),
('grade_received', 'Grade Received', 'Hi {{student_name}}, you received {{grade}}% on "{{assignment_title}}".', 'info', 'academic', ARRAY['student_name', 'grade', 'assignment_title']),
('course_completed', 'Course Completed!', 'Congratulations {{student_name}}! You have successfully completed {{course_name}}.', 'success', 'achievement', ARRAY['student_name', 'course_name']),
('payment_reminder', 'Payment Reminder', 'Hi {{student_name}}, your payment of {{amount}} for {{course_name}} is due on {{due_date}}.', 'warning', 'financial', ARRAY['student_name', 'amount', 'course_name', 'due_date'])
ON CONFLICT (name) DO NOTHING;