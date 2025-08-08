/*
  # Add Super Admin System

  1. New Tables
    - `user_roles` - Extended role management system
    - `system_permissions` - Permission definitions
    - `role_permissions` - Role-permission mapping

  2. Security
    - Enable RLS on all new tables
    - Add policies for super admin access
    - Create function to check super admin status

  3. Initial Data
    - Create super admin role
    - Set up basic permissions
    - Create demo super admin user
*/

-- Create extended role management system
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role_type text NOT NULL CHECK (role_type IN ('student', 'instructor', 'admin', 'super_admin', 'employee')),
  department text,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  permissions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create system permissions table
CREATE TABLE IF NOT EXISTS system_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  permission_name text UNIQUE NOT NULL,
  description text,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Create role permissions mapping
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_type text NOT NULL,
  permission_name text REFERENCES system_permissions(permission_name),
  granted boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_type, permission_name)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Super admins can manage all user roles"
  ON user_roles
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

CREATE POLICY "Users can view their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for system_permissions
CREATE POLICY "Super admins can manage permissions"
  ON system_permissions
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

CREATE POLICY "All authenticated users can read permissions"
  ON system_permissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for role_permissions
CREATE POLICY "Super admins can manage role permissions"
  ON role_permissions
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

CREATE POLICY "All authenticated users can read role permissions"
  ON role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = user_uuid 
    AND role_type = 'super_admin' 
    AND is_active = true
  );
$$;

-- Create function to get user role type
CREATE OR REPLACE FUNCTION get_user_role_type(user_uuid uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role_type 
  FROM user_roles 
  WHERE user_id = user_uuid 
  AND is_active = true 
  ORDER BY created_at DESC 
  LIMIT 1;
$$;

-- Insert basic system permissions
INSERT INTO system_permissions (permission_name, description, category) VALUES
  ('manage_users', 'Create, update, and delete user accounts', 'user_management'),
  ('manage_courses', 'Create, update, and delete courses', 'content_management'),
  ('manage_system', 'Access system settings and configurations', 'system_administration'),
  ('view_analytics', 'Access analytics and reports', 'reporting'),
  ('manage_payments', 'Process and manage payments', 'financial'),
  ('manage_workflows', 'Create and manage automated workflows', 'automation'),
  ('super_admin_access', 'Full system access and control', 'administration')
ON CONFLICT (permission_name) DO NOTHING;

-- Insert role permissions
INSERT INTO role_permissions (role_type, permission_name) VALUES
  ('super_admin', 'manage_users'),
  ('super_admin', 'manage_courses'),
  ('super_admin', 'manage_system'),
  ('super_admin', 'view_analytics'),
  ('super_admin', 'manage_payments'),
  ('super_admin', 'manage_workflows'),
  ('super_admin', 'super_admin_access'),
  ('admin', 'manage_courses'),
  ('admin', 'view_analytics'),
  ('admin', 'manage_payments'),
  ('instructor', 'manage_courses'),
  ('instructor', 'view_analytics')
ON CONFLICT (role_type, permission_name) DO NOTHING;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_roles_updated_at 
  BEFORE UPDATE ON user_roles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();