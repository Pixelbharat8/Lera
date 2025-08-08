/*
  # Add Live Sessions Support

  1. New Tables
    - `live_sessions`: Stores information about scheduled live classes
      - `id` (uuid, primary key)
      - `course_id` (uuid, references courses)
      - `instructor_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `scheduled_start` (timestamptz)
      - `scheduled_end` (timestamptz)
      - `status` (session_status)
      - Created/updated timestamps
    
    - `session_attendees`: Tracks student attendance in live sessions
      - `id` (uuid, primary key)
      - `session_id` (uuid, references live_sessions)
      - `user_id` (uuid, references profiles)
      - `joined_at` (timestamptz)
      - `left_at` (timestamptz)
      - Created/updated timestamps

  2. Security
    - Enable RLS on new tables
    - Add policies for instructors and students
*/

-- Create session status enum
DO $$ BEGIN
  CREATE TYPE session_status AS ENUM ('scheduled', 'live', 'ended', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create live sessions table
CREATE TABLE IF NOT EXISTS live_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  instructor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  status session_status DEFAULT 'scheduled',
  room_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_schedule CHECK (scheduled_end > scheduled_start)
);

-- Create session attendees table
CREATE TABLE IF NOT EXISTS session_attendees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  left_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, user_id)
);

-- Enable RLS
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendees ENABLE ROW LEVEL SECURITY;

-- Live sessions policies
CREATE POLICY "Live sessions are viewable by enrolled students and instructors"
  ON live_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.course_id = live_sessions.course_id
      AND e.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.user_id = auth.uid()
      AND p.id = live_sessions.instructor_id
    )
  );

CREATE POLICY "Instructors can manage live sessions"
  ON live_sessions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.user_id = auth.uid()
      AND p.id = live_sessions.instructor_id
    )
  );

-- Session attendees policies
CREATE POLICY "Users can view session attendance"
  ON session_attendees FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM live_sessions ls
      WHERE ls.id = session_attendees.session_id
      AND (
        ls.instructor_id IN (
          SELECT id FROM profiles WHERE user_id = auth.uid()
        ) OR
        session_attendees.user_id IN (
          SELECT id FROM profiles WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can join sessions"
  ON session_attendees FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM live_sessions ls
      JOIN enrollments e ON e.course_id = ls.course_id
      WHERE ls.id = session_attendees.session_id
      AND e.user_id = auth.uid()
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER update_live_sessions_updated_at
  BEFORE UPDATE ON live_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_attendees_updated_at
  BEFORE UPDATE ON session_attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();