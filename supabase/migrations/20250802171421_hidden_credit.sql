/*
  # Fix profiles table RLS policy for user registration

  1. Security Changes
    - Add INSERT policy for profiles table to allow users to create their own profile
    - Policy allows authenticated users to insert their own profile record
    - Uses auth.uid() to ensure users can only create profiles for themselves

  This fixes the registration error where new users couldn't create their profile
  due to missing INSERT permissions in the RLS policy.
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);