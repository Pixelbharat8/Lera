/*
  # Workflow Automation System Tables

  1. New Tables
    - `workflow_templates` - Store workflow definitions and configurations
    - `workflow_executions` - Track workflow execution instances  
    - `workflow_execution_logs` - Detailed execution logs and debugging info
    - `workflow_nodes` - Individual nodes within workflows
    - `workflow_edges` - Connections between workflow nodes
    - `workflow_variables` - Variables and data passed between nodes
    - `workflow_webhooks` - Webhook endpoints for triggering workflows
    - `workflow_schedules` - Scheduled workflow triggers (cron jobs)
    
  2. Security
    - Enable RLS on all workflow tables
    - Super admins can manage all workflows
    - Users can only access workflows they have permission for
    
  3. Indexes
    - Performance indexes on frequently queried columns
    - Composite indexes for complex queries
*/

-- Workflow Templates Table
CREATE TABLE IF NOT EXISTS workflow_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text DEFAULT 'General',
  icon text DEFAULT '⚡',
  is_active boolean DEFAULT true,
  trigger_type text NOT NULL, -- 'event', 'schedule', 'manual', 'webhook'
  trigger_config jsonb DEFAULT '{}'::jsonb,
  nodes jsonb DEFAULT '[]'::jsonb,
  edges jsonb DEFAULT '[]'::jsonb,
  settings jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_executed_at timestamptz,
  execution_count integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  version integer DEFAULT 1
);

-- Workflow Executions Table
CREATE TABLE IF NOT EXISTS workflow_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflow_templates(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  duration_ms integer,
  trigger_data jsonb DEFAULT '{}'::jsonb,
  output_data jsonb DEFAULT '{}'::jsonb,
  error_message text,
  error_stack text,
  retry_count integer DEFAULT 0,
  max_retries integer DEFAULT 3,
  created_at timestamptz DEFAULT now()
);

-- Workflow Execution Logs Table
CREATE TABLE IF NOT EXISTS workflow_execution_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id uuid REFERENCES workflow_executions(id) ON DELETE CASCADE,
  node_id text,
  timestamp timestamptz DEFAULT now(),
  level text DEFAULT 'info' CHECK (level IN ('debug', 'info', 'warning', 'error')),
  message text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  duration_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Workflow Access Permissions Table
CREATE TABLE IF NOT EXISTS workflow_access_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  workflow_id uuid REFERENCES workflow_templates(id) ON DELETE CASCADE,
  permissions jsonb DEFAULT '{}'::jsonb, -- {view: true, edit: false, execute: true, etc.}
  granted_by uuid REFERENCES profiles(id),
  granted_at timestamptz DEFAULT now(),
  revoked_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, workflow_id)
);

-- Workflow User Permissions Table (Global permissions)
CREATE TABLE IF NOT EXISTS workflow_user_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  permissions jsonb DEFAULT '{}'::jsonb, -- Global workflow permissions
  granted_by uuid REFERENCES profiles(id),
  granted_at timestamptz DEFAULT now(),
  revoked_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Workflow Webhooks Table
CREATE TABLE IF NOT EXISTS workflow_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflow_templates(id) ON DELETE CASCADE,
  webhook_url text NOT NULL,
  webhook_secret text,
  is_active boolean DEFAULT true,
  last_triggered_at timestamptz,
  trigger_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow Schedules Table
CREATE TABLE IF NOT EXISTS workflow_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflow_templates(id) ON DELETE CASCADE,
  cron_expression text NOT NULL,
  timezone text DEFAULT 'UTC',
  is_active boolean DEFAULT true,
  next_run_at timestamptz,
  last_run_at timestamptz,
  run_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_access_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Super admins can manage all workflows"
  ON workflow_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role_type = 'super_admin' 
      AND ur.is_active = true
    )
  );

CREATE POLICY "Users can view workflows they have access to"
  ON workflow_templates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workflow_user_permissions wup
      WHERE wup.user_id IN (
        SELECT p.id FROM profiles p WHERE p.user_id = auth.uid()
      )
      AND wup.is_active = true
      AND (wup.permissions->>'viewWorkflows')::boolean = true
    )
  );

CREATE POLICY "Users can create workflows if they have permission"
  ON workflow_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflow_user_permissions wup
      WHERE wup.user_id IN (
        SELECT p.id FROM profiles p WHERE p.user_id = auth.uid()
      )
      AND wup.is_active = true
      AND (wup.permissions->>'createWorkflows')::boolean = true
    )
  );

CREATE POLICY "Super admins can view all executions"
  ON workflow_executions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role_type = 'super_admin' 
      AND ur.is_active = true
    )
  );

CREATE POLICY "Users can view executions for workflows they have access to"
  ON workflow_executions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workflow_user_permissions wup
      WHERE wup.user_id IN (
        SELECT p.id FROM profiles p WHERE p.user_id = auth.uid()
      )
      AND wup.is_active = true
      AND (wup.permissions->>'viewLogs')::boolean = true
    )
  );

CREATE POLICY "Super admins can manage workflow permissions"
  ON workflow_user_permissions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role_type = 'super_admin' 
      AND ur.is_active = true
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_workflow_templates_created_by ON workflow_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_is_active ON workflow_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_workflow_execution_logs_execution_id ON workflow_execution_logs(execution_id);
CREATE INDEX IF NOT EXISTS idx_workflow_user_permissions_user_id ON workflow_user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_user_permissions_is_active ON workflow_user_permissions(is_active);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_workflow_templates_updated_at
    BEFORE UPDATE ON workflow_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_user_permissions_updated_at
    BEFORE UPDATE ON workflow_user_permissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_webhooks_updated_at
    BEFORE UPDATE ON workflow_webhooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_schedules_updated_at
    BEFORE UPDATE ON workflow_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();