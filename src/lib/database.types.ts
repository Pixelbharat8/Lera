export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          student_id: string
          full_name: string
          date_of_birth: string
          gender: string | null
          nationality: string | null
          photo_url: string | null
          guardian_name: string
          contact_number: string
          email: string | null
          address: string | null
          enrollment_date: string | null
          current_level: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          class_group: string | null
          learning_goals: string | null
          special_notes: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string
          full_name: string
          date_of_birth: string
          gender?: string | null
          nationality?: string | null
          photo_url?: string | null
          guardian_name: string
          contact_number: string
          email?: string | null
          address?: string | null
          enrollment_date?: string | null
          current_level: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          class_group?: string | null
          learning_goals?: string | null
          special_notes?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          full_name?: string
          date_of_birth?: string
          gender?: string | null
          nationality?: string | null
          photo_url?: string | null
          guardian_name?: string
          contact_number?: string
          email?: string | null
          address?: string | null
          enrollment_date?: string | null
          current_level?: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          class_group?: string | null
          learning_goals?: string | null
          special_notes?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      teachers: {
        Row: {
          id: string
          teacher_id: string
          full_name: string
          date_of_birth: string | null
          gender: string | null
          nationality: string | null
          photo_url: string | null
          contact_number: string
          email: string
          qualifications: string[] | null
          work_experience_years: number | null
          specializations: string[] | null
          current_subjects: string[] | null
          working_hours: string | null
          employment_type: 'full_time' | 'part_time' | 'freelance' | 'contract' | null
          hourly_rate: number | null
          is_active: boolean | null
          feedback_rating: number | null
          total_feedback_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          teacher_id?: string
          full_name: string
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          photo_url?: string | null
          contact_number: string
          email: string
          qualifications?: string[] | null
          work_experience_years?: number | null
          specializations?: string[] | null
          current_subjects?: string[] | null
          working_hours?: string | null
          employment_type?: 'full_time' | 'part_time' | 'freelance' | 'contract' | null
          hourly_rate?: number | null
          is_active?: boolean | null
          feedback_rating?: number | null
          total_feedback_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          teacher_id?: string
          full_name?: string
          date_of_birth?: string | null
          gender?: string | null
          nationality?: string | null
          photo_url?: string | null
          contact_number?: string
          email?: string
          qualifications?: string[] | null
          work_experience_years?: number | null
          specializations?: string[] | null
          current_subjects?: string[] | null
          working_hours?: string | null
          employment_type?: 'full_time' | 'part_time' | 'freelance' | 'contract' | null
          hourly_rate?: number | null
          is_active?: boolean | null
          feedback_rating?: number | null
          total_feedback_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      courses_master: {
        Row: {
          id: string
          course_code: string
          course_name: string
          level: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          duration_weeks: number
          weekly_hours: number
          days_schedule: string[] | null
          time_schedule: string | null
          curriculum_reference: string | null
          syllabus_overview: string | null
          assigned_teachers: string[] | null
          max_students: number | null
          assessment_types: string[] | null
          certificate_rules: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          course_code: string
          course_name: string
          level: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          duration_weeks: number
          weekly_hours: number
          days_schedule?: string[] | null
          time_schedule?: string | null
          curriculum_reference?: string | null
          syllabus_overview?: string | null
          assigned_teachers?: string[] | null
          max_students?: number | null
          assessment_types?: string[] | null
          certificate_rules?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          course_code?: string
          course_name?: string
          level?: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
          duration_weeks?: number
          weekly_hours?: number
          days_schedule?: string[] | null
          time_schedule?: string | null
          curriculum_reference?: string | null
          syllabus_overview?: string | null
          assigned_teachers?: string[] | null
          max_students?: number | null
          assessment_types?: string[] | null
          certificate_rules?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      class_sessions: {
        Row: {
          id: string
          session_date: string
          session_time: string
          course_id: string | null
          teacher_id: string | null
          lesson_objective: string | null
          materials_used: string[] | null
          homework_given: string | null
          recording_url: string | null
          quiz_conducted: boolean | null
          behavioral_notes: string | null
          parent_note_sent: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          session_date: string
          session_time: string
          course_id?: string | null
          teacher_id?: string | null
          lesson_objective?: string | null
          materials_used?: string[] | null
          homework_given?: string | null
          recording_url?: string | null
          quiz_conducted?: boolean | null
          behavioral_notes?: string | null
          parent_note_sent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          session_date?: string
          session_time?: string
          course_id?: string | null
          teacher_id?: string | null
          lesson_objective?: string | null
          materials_used?: string[] | null
          homework_given?: string | null
          recording_url?: string | null
          quiz_conducted?: boolean | null
          behavioral_notes?: string | null
          parent_note_sent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_attendance: {
        Row: {
          id: string
          session_id: string | null
          student_id: string | null
          is_present: boolean | null
          participation_score: number | null
          behavioral_notes: string | null
          late_arrival: boolean | null
          early_departure: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          session_id?: string | null
          student_id?: string | null
          is_present?: boolean | null
          participation_score?: number | null
          behavioral_notes?: string | null
          late_arrival?: boolean | null
          early_departure?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          session_id?: string | null
          student_id?: string | null
          is_present?: boolean | null
          participation_score?: number | null
          behavioral_notes?: string | null
          late_arrival?: boolean | null
          early_departure?: boolean | null
          created_at?: string | null
        }
      }
      assessments: {
        Row: {
          id: string
          assessment_type: 'placement' | 'midterm' | 'final' | 'weekly_quiz' | 'oral_test' | 'writing_test' | 'listening_test'
          assessment_date: string
          student_id: string | null
          course_id: string | null
          teacher_id: string | null
          skills_tested: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          listening_score: number | null
          reading_score: number | null
          speaking_score: number | null
          writing_score: number | null
          grammar_score: number | null
          vocabulary_score: number | null
          overall_score: number | null
          teacher_feedback: string | null
          improvement_suggestions: string | null
          result_status: string | null
          level_advancement_decision: boolean | null
          parent_report_issued: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          assessment_type: 'placement' | 'midterm' | 'final' | 'weekly_quiz' | 'oral_test' | 'writing_test' | 'listening_test'
          assessment_date: string
          student_id?: string | null
          course_id?: string | null
          teacher_id?: string | null
          skills_tested?: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          listening_score?: number | null
          reading_score?: number | null
          speaking_score?: number | null
          writing_score?: number | null
          grammar_score?: number | null
          vocabulary_score?: number | null
          overall_score?: number | null
          teacher_feedback?: string | null
          improvement_suggestions?: string | null
          result_status?: string | null
          level_advancement_decision?: boolean | null
          parent_report_issued?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          assessment_type?: 'placement' | 'midterm' | 'final' | 'weekly_quiz' | 'oral_test' | 'writing_test' | 'listening_test'
          assessment_date?: string
          student_id?: string | null
          course_id?: string | null
          teacher_id?: string | null
          skills_tested?: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          listening_score?: number | null
          reading_score?: number | null
          speaking_score?: number | null
          writing_score?: number | null
          grammar_score?: number | null
          vocabulary_score?: number | null
          overall_score?: number | null
          teacher_feedback?: string | null
          improvement_suggestions?: string | null
          result_status?: string | null
          level_advancement_decision?: boolean | null
          parent_report_issued?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_gamification: {
        Row: {
          id: string
          student_id: string | null
          total_points: number | null
          current_level: number | null
          current_streak: number | null
          longest_streak: number | null
          badges_unlocked: string[] | null
          leaderboard_rank: number | null
          xp_progress: number | null
          challenges_completed: string[] | null
          participation_stars: number | null
          certificates_earned: string[] | null
          last_activity_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          total_points?: number | null
          current_level?: number | null
          current_streak?: number | null
          longest_streak?: number | null
          badges_unlocked?: string[] | null
          leaderboard_rank?: number | null
          xp_progress?: number | null
          challenges_completed?: string[] | null
          participation_stars?: number | null
          certificates_earned?: string[] | null
          last_activity_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          total_points?: number | null
          current_level?: number | null
          current_streak?: number | null
          longest_streak?: number | null
          badges_unlocked?: string[] | null
          leaderboard_rank?: number | null
          xp_progress?: number | null
          challenges_completed?: string[] | null
          participation_stars?: number | null
          certificates_earned?: string[] | null
          last_activity_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      parents: {
        Row: {
          id: string
          parent_id: string
          full_name: string
          relation_to_student: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          phone: string
          email: string | null
          preferred_language: string | null
          app_login_id: string | null
          password_hash: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          parent_id: string
          full_name: string
          relation_to_student: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          phone: string
          email?: string | null
          preferred_language?: string | null
          app_login_id?: string | null
          password_hash?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          parent_id?: string
          full_name?: string
          relation_to_student?: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          phone?: string
          email?: string | null
          preferred_language?: string | null
          app_login_id?: string | null
          password_hash?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string | null
          student_id: string | null
          relation_type: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          is_primary_contact: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          parent_id?: string | null
          student_id?: string | null
          relation_type: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          is_primary_contact?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          parent_id?: string | null
          student_id?: string | null
          relation_type?: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
          is_primary_contact?: boolean | null
          created_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          invoice_number: string
          student_id: string | null
          course_id: string | null
          fee_amount: number
          discount_amount: number | null
          final_amount: number
          payment_method: 'cash' | 'card' | 'bank_transfer' | 'momo' | 'zalopay' | 'installment'
          installment_plan: Json | null
          payment_date: string | null
          due_date: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial' | null
          receipt_url: string | null
          refund_amount: number | null
          refund_reason: string | null
          processed_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          invoice_number: string
          student_id?: string | null
          course_id?: string | null
          fee_amount: number
          discount_amount?: number | null
          final_amount: number
          payment_method: 'cash' | 'card' | 'bank_transfer' | 'momo' | 'zalopay' | 'installment'
          installment_plan?: Json | null
          payment_date?: string | null
          due_date?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial' | null
          receipt_url?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          processed_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          invoice_number?: string
          student_id?: string | null
          course_id?: string | null
          fee_amount?: number
          discount_amount?: number | null
          final_amount?: number
          payment_method?: 'cash' | 'card' | 'bank_transfer' | 'momo' | 'zalopay' | 'installment'
          installment_plan?: Json | null
          payment_date?: string | null
          due_date?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial' | null
          receipt_url?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          processed_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      teacher_attendance: {
        Row: {
          id: string
          teacher_id: string | null
          check_in_time: string | null
          check_out_time: string | null
          work_date: string | null
          total_hours: number | null
          location: string | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          teacher_id?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          work_date?: string | null
          total_hours?: number | null
          location?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          teacher_id?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          work_date?: string | null
          total_hours?: number | null
          location?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      homework_assignments: {
        Row: {
          id: string
          course_id: string | null
          teacher_id: string | null
          assignment_title: string
          description: string | null
          instructions: string | null
          due_date: string
          skills_focus: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          max_score: number | null
          attachment_urls: string[] | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          course_id?: string | null
          teacher_id?: string | null
          assignment_title: string
          description?: string | null
          instructions?: string | null
          due_date: string
          skills_focus?: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          max_score?: number | null
          attachment_urls?: string[] | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string | null
          teacher_id?: string | null
          assignment_title?: string
          description?: string | null
          instructions?: string | null
          due_date?: string
          skills_focus?: ('listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary')[] | null
          max_score?: number | null
          attachment_urls?: string[] | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      homework_submissions: {
        Row: {
          id: string
          assignment_id: string | null
          student_id: string | null
          submission_content: string | null
          attachment_urls: string[] | null
          submitted_at: string | null
          score: number | null
          teacher_feedback: string | null
          graded_at: string | null
          graded_by: string | null
          is_late: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          assignment_id?: string | null
          student_id?: string | null
          submission_content?: string | null
          attachment_urls?: string[] | null
          submitted_at?: string | null
          score?: number | null
          teacher_feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
          is_late?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          assignment_id?: string | null
          student_id?: string | null
          submission_content?: string | null
          attachment_urls?: string[] | null
          submitted_at?: string | null
          score?: number | null
          teacher_feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
          is_late?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      system_logs: {
        Row: {
          id: string
          user_id: string | null
          user_type: string | null
          action_type: string
          table_affected: string | null
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          session_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          user_type?: string | null
          action_type: string
          table_affected?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          user_type?: string | null
          action_type?: string
          table_affected?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
          created_at?: string | null
        }
      }
      user_activity_logs: {
        Row: {
          id: string
          user_id: string
          user_type: string | null
          login_time: string | null
          logout_time: string | null
          pages_visited: string[] | null
          time_spent_minutes: number | null
          device_info: Json | null
          location_info: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          user_type?: string | null
          login_time?: string | null
          logout_time?: string | null
          pages_visited?: string[] | null
          time_spent_minutes?: number | null
          device_info?: Json | null
          location_info?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          user_type?: string | null
          login_time?: string | null
          logout_time?: string | null
          pages_visited?: string[] | null
          time_spent_minutes?: number | null
          device_info?: Json | null
          location_info?: Json | null
          created_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          recipient_type: string | null
          title: string
          message: string
          type: string | null
          is_read: boolean | null
          action_url: string | null
          scheduled_for: string | null
          sent_at: string | null
          delivery_status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          recipient_id: string
          recipient_type?: string | null
          title: string
          message: string
          type?: string | null
          is_read?: boolean | null
          action_url?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          delivery_status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          recipient_id?: string
          recipient_type?: string | null
          title?: string
          message?: string
          type?: string | null
          is_read?: boolean | null
          action_url?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          delivery_status?: string | null
          created_at?: string | null
        }
      }
      student_enrollments: {
        Row: {
          id: string
          student_id: string | null
          course_id: string | null
          enrollment_date: string | null
          completion_date: string | null
          progress_percentage: number | null
          is_active: boolean | null
          final_grade: string | null
          certificate_issued: boolean | null
          certificate_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          completion_date?: string | null
          progress_percentage?: number | null
          is_active?: boolean | null
          final_grade?: string | null
          certificate_issued?: boolean | null
          certificate_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          completion_date?: string | null
          progress_percentage?: number | null
          is_active?: boolean | null
          final_grade?: string | null
          certificate_issued?: boolean | null
          certificate_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_attendance_rate: {
        Args: {
          student_uuid: string
          course_uuid?: string
        }
        Returns: number
      }
      calculate_assignment_completion_rate: {
        Args: {
          student_uuid: string
        }
        Returns: number
      }
    }
    Enums: {
      student_level: 'KG1' | 'KG2' | 'KG3' | 'Primary_1' | 'Primary_2' | 'Primary_3' | 'Primary_4' | 'Primary_5' | 'Primary_6' | 'Secondary_1' | 'Secondary_2' | 'Secondary_3' | 'Secondary_4' | 'CEFR_A1' | 'CEFR_A2' | 'CEFR_B1' | 'CEFR_B2' | 'CEFR_C1' | 'CEFR_C2' | 'IELTS_Foundation' | 'IELTS_Intermediate' | 'IELTS_Advanced' | 'Business_Beginner' | 'Business_Intermediate' | 'Business_Advanced'
      employment_type: 'full_time' | 'part_time' | 'freelance' | 'contract'
      assessment_type: 'placement' | 'midterm' | 'final' | 'weekly_quiz' | 'oral_test' | 'writing_test' | 'listening_test'
      skill_type: 'listening' | 'reading' | 'speaking' | 'writing' | 'grammar' | 'vocabulary'
      payment_method: 'cash' | 'card' | 'bank_transfer' | 'momo' | 'zalopay' | 'installment'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial'
      relation_type: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling' | 'other'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}