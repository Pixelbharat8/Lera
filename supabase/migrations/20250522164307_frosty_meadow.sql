/*
  # Add Task Tracking System

  1. New Tables
    - `tasks`: Stores student tasks and assignments
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `due_date` (timestamptz)
      - `status` (task_status)
      - `priority` (task_priority)
      - Created/updated timestamps
    
    - `task_submissions`: Tracks task submissions and feedback
      - `id` (uuid, primary key)
      - `task_id` (uuid, references tasks)
      - `student_id` (uuid, references profiles)
      - `content` (text)
      - `feedback` (text)
      - `score` (integer)
      - Created/updated timestamps

  2. Security
    - Enable RLS on new tables
    - Add policies for students and instructors
*/

-- Create task status and priority enums
DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'submitted', 'completed', 'overdue');
  CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  status task_status DEFAULT 'pending',
  priority task_priority DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create task submissions table
CREATE TABLE IF NOT EXISTS task_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  feedback text,
  score integer CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(task_id, student_id)
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Students can view own tasks"
  ON tasks FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id = tasks.student_id
    )
  );

CREATE POLICY "Instructors can view student tasks"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role = 'instructor'
    )
  );

CREATE POLICY "Instructors can manage tasks"
  ON tasks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role = 'instructor'
    )
  );

-- Task submissions policies
CREATE POLICY "Students can view and submit own tasks"
  ON task_submissions FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id = task_submissions.student_id
    )
  );

CREATE POLICY "Instructors can view and grade submissions"
  ON task_submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role = 'instructor'
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_task_submissions_updated_at
  BEFORE UPDATE ON task_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();