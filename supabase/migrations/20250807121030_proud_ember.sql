/*
  # Add email column to profiles table

  1. Changes
    - Add `email` column to `profiles` table
    - Column type: text
    - Nullable to support existing profiles
  
  2. Notes
    - This resolves the registration error where the application
      attempts to insert email data into the profiles table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text;
  END IF;
END $$;