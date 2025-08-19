/*
  # Gamification System

  1. New Tables
    - `badges` - Available badges in the system
    - `user_badges` - Badges earned by users
    - `achievements` - Available achievements
    - `user_achievements` - Achievements earned by users
    - `user_gamification` - User points, levels, streaks
    - `point_transactions` - History of points awarded/deducted
    
  2. Security
    - Enable RLS on all gamification tables
    - Users can view their own gamification data
    - Instructors can award points to students
    - Admins can manage the gamification system
*/

-- Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text DEFAULT '🏆',
  rarity text DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  category text DEFAULT 'general',
  points_required integer DEFAULT 0,
  conditions jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  progress_data jsonb DEFAULT '{}'::jsonb,
  UNIQUE(user_id, badge_id)
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text DEFAULT '🎯',
  type text DEFAULT 'milestone' CHECK (type IN ('milestone', 'streak', 'performance', 'social', 'special')),
  requirements jsonb DEFAULT '{}'::jsonb,
  rewards jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  is_completed boolean DEFAULT false,
  UNIQUE(user_id, achievement_id)
);

-- User Gamification Table
CREATE TABLE IF NOT EXISTS user_gamification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  total_points integer DEFAULT 0,
  current_level integer DEFAULT 1,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date DEFAULT CURRENT_DATE,
  xp_progress integer DEFAULT 0,
  leaderboard_rank integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Point Transactions Table
CREATE TABLE IF NOT EXISTS point_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  points integer NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('earned', 'spent', 'bonus', 'penalty')),
  reason text NOT NULL,
  related_entity_type text, -- 'lesson', 'course', 'task', 'achievement'
  related_entity_id uuid,
  awarded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Leaderboard View
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  ug.user_id,
  p.full_name,
  p.avatar_url,
  ug.total_points,
  ug.current_level,
  ug.current_streak,
  RANK() OVER (ORDER BY ug.total_points DESC) as rank
FROM user_gamification ug
JOIN profiles p ON p.id = ug.user_id
WHERE ug.total_points > 0
ORDER BY ug.total_points DESC;

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage badges"
  ON badges FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role_type IN ('admin', 'super_admin')
      AND ur.is_active = true
    )
  );

CREATE POLICY "Users can view their own badges"
  ON user_badges FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can award badges"
  ON user_badges FOR INSERT TO authenticated
  WITH CHECK (true); -- Will be controlled by functions

CREATE POLICY "Users can view their own gamification data"
  ON user_gamification FOR ALL TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own point transactions"
  ON point_transactions FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Triggers
CREATE TRIGGER update_workflow_templates_updated_at
    BEFORE UPDATE ON workflow_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_gamification_updated_at
    BEFORE UPDATE ON user_gamification
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default badges
INSERT INTO badges (name, description, icon, rarity, category, points_required) VALUES
('Quick Learner', 'Complete 5 lessons in a day', '🚀', 'common', 'learning', 0),
('Quiz Master', 'Score 100% on 10 quizzes', '🎯', 'rare', 'performance', 0),
('Streak Champion', 'Maintain 30-day learning streak', '🔥', 'epic', 'consistency', 0),
('Course Completer', 'Complete an entire course', '🏆', 'common', 'achievement', 0),
('Perfect Score', 'Score 100% on final exam', '⭐', 'legendary', 'performance', 0),
('Early Bird', 'Complete 10 lessons before 9 AM', '🌅', 'rare', 'dedication', 0),
('Night Owl', 'Complete 10 lessons after 9 PM', '🦉', 'rare', 'dedication', 0),
('Social Learner', 'Participate in 5 discussion forums', '💬', 'common', 'social', 0),
('Helper', 'Help 3 students in forums', '🤝', 'rare', 'social', 0),
('Speed Demon', 'Complete a lesson in under 5 minutes', '⚡', 'epic', 'efficiency', 0)
ON CONFLICT (name) DO NOTHING;

-- Insert default achievements
INSERT INTO achievements (name, description, icon, type, requirements, rewards) VALUES
('First Steps', 'Complete your first lesson', '👶', 'milestone', '{"lessons_completed": 1}', '{"points": 10, "badge": "First Steps"}'),
('Getting Started', 'Complete 5 lessons', '🌟', 'milestone', '{"lessons_completed": 5}', '{"points": 50}'),
('Dedicated Learner', 'Study for 7 consecutive days', '📚', 'streak', '{"streak_days": 7}', '{"points": 100}'),
('Quiz Pro', 'Pass 10 quizzes with 80%+ score', '🧠', 'performance', '{"quiz_passes": 10, "min_score": 80}', '{"points": 150}'),
('Course Master', 'Complete 3 courses', '🎓', 'milestone', '{"courses_completed": 3}', '{"points": 300, "badge": "Course Master"}')
ON CONFLICT (name) DO NOTHING;

-- Functions for gamification
CREATE OR REPLACE FUNCTION award_points(
  p_user_id uuid,
  p_points integer,
  p_reason text,
  p_related_entity_type text DEFAULT NULL,
  p_related_entity_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  profile_id uuid;
  current_points integer;
  new_level integer;
BEGIN
  -- Get profile ID
  SELECT id INTO profile_id FROM profiles WHERE user_id = p_user_id;
  
  IF profile_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found for user %', p_user_id;
  END IF;

  -- Insert point transaction
  INSERT INTO point_transactions (user_id, points, transaction_type, reason, related_entity_type, related_entity_id)
  VALUES (profile_id, p_points, 'earned', p_reason, p_related_entity_type, p_related_entity_id);

  -- Update user gamification
  INSERT INTO user_gamification (user_id, total_points)
  VALUES (profile_id, p_points)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    total_points = user_gamification.total_points + p_points,
    current_level = GREATEST(1, (user_gamification.total_points + p_points) / 1000 + 1),
    updated_at = now();

  -- Check for new achievements
  PERFORM check_achievements(profile_id);
END;
$$;

CREATE OR REPLACE FUNCTION check_achievements(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  achievement_record RECORD;
  user_stats RECORD;
BEGIN
  -- Get user statistics
  SELECT 
    (SELECT COUNT(*) FROM lesson_progress WHERE user_id = p_user_id AND completed = true) as lessons_completed,
    (SELECT current_streak FROM user_gamification WHERE user_id = p_user_id) as current_streak,
    (SELECT COUNT(*) FROM enrollments WHERE user_id = p_user_id) as courses_enrolled
  INTO user_stats;

  -- Check each achievement
  FOR achievement_record IN 
    SELECT * FROM achievements WHERE is_active = true
  LOOP
    -- Check if user already has this achievement
    IF NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = p_user_id AND achievement_id = achievement_record.id
    ) THEN
      -- Check requirements (simplified logic)
      IF achievement_record.requirements->>'lessons_completed' IS NOT NULL THEN
        IF user_stats.lessons_completed >= (achievement_record.requirements->>'lessons_completed')::integer THEN
          -- Award achievement
          INSERT INTO user_achievements (user_id, achievement_id, is_completed)
          VALUES (p_user_id, achievement_record.id, true);
          
          -- Award points if specified
          IF achievement_record.rewards->>'points' IS NOT NULL THEN
            PERFORM award_points(
              (SELECT user_id FROM profiles WHERE id = p_user_id),
              (achievement_record.rewards->>'points')::integer,
              'Achievement: ' || achievement_record.name,
              'achievement',
              achievement_record.id
            );
          END IF;
        END IF;
      END IF;
    END IF;
  END LOOP;
END;
$$;

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  profile_id uuid;
  today_date date := CURRENT_DATE;
  yesterday_date date := CURRENT_DATE - INTERVAL '1 day';
  last_activity date;
  current_streak_val integer;
BEGIN
  -- Get profile ID
  SELECT id INTO profile_id FROM profiles WHERE user_id = p_user_id;
  
  IF profile_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found for user %', p_user_id;
  END IF;

  -- Get current streak data
  SELECT last_activity_date, current_streak 
  INTO last_activity, current_streak_val
  FROM user_gamification 
  WHERE user_id = profile_id;

  -- Initialize if no record exists
  IF last_activity IS NULL THEN
    INSERT INTO user_gamification (user_id, current_streak, last_activity_date)
    VALUES (profile_id, 1, today_date)
    ON CONFLICT (user_id) DO UPDATE SET
      current_streak = 1,
      last_activity_date = today_date,
      updated_at = now();
    RETURN;
  END IF;

  -- Update streak logic
  IF last_activity = yesterday_date THEN
    -- Continue streak
    UPDATE user_gamification
    SET 
      current_streak = current_streak + 1,
      longest_streak = GREATEST(longest_streak, current_streak + 1),
      last_activity_date = today_date,
      updated_at = now()
    WHERE user_id = profile_id;
  ELSIF last_activity < yesterday_date THEN
    -- Streak broken, reset
    UPDATE user_gamification
    SET 
      current_streak = 1,
      last_activity_date = today_date,
      updated_at = now()
    WHERE user_id = profile_id;
  END IF;
  -- If last_activity = today, do nothing (already updated today)
END;
$$;