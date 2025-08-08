import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { action, studentData, studentId } = await req.json()

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user profile to check permissions
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    // Only admins and teachers can manage students
    if (profile.role !== 'admin' && profile.role !== 'instructor') {
      throw new Error('Insufficient permissions')
    }

    let result = {}

    switch (action) {
      case 'create_student':
        result = await createStudent(supabaseClient, studentData)
        break
      case 'update_student':
        result = await updateStudent(supabaseClient, studentId, studentData)
        break
      case 'get_student_details':
        result = await getStudentDetails(supabaseClient, studentId)
        break
      case 'get_all_students':
        result = await getAllStudents(supabaseClient)
        break
      case 'enroll_student':
        result = await enrollStudent(supabaseClient, studentData.studentId, studentData.courseId)
        break
      case 'get_student_progress':
        result = await getStudentProgress(supabaseClient, studentId)
        break
      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function createStudent(supabase: any, studentData: any) {
  const { data: student, error } = await supabase
    .from('students')
    .insert(studentData)
    .select()
    .single()

  if (error) throw error

  // Create gamification record for new student
  await supabase
    .from('student_gamification')
    .insert({
      student_id: student.id,
      total_points: 0,
      current_level: 1
    })

  // Log the action
  await supabase
    .from('system_logs')
    .insert({
      user_type: 'admin',
      action_type: 'student_created',
      table_affected: 'students',
      record_id: student.id,
      new_values: studentData
    })

  return { student, message: 'Student created successfully' }
}

async function updateStudent(supabase: any, studentId: string, studentData: any) {
  const { data: student, error } = await supabase
    .from('students')
    .update(studentData)
    .eq('id', studentId)
    .select()
    .single()

  if (error) throw error

  return { student, message: 'Student updated successfully' }
}

async function getStudentDetails(supabase: any, studentId: string) {
  // Get student with all related data
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        *,
        course:courses_master(*)
      ),
      gamification:student_gamification(*),
      assessments(*),
      attendance:student_attendance(
        *,
        session:class_sessions(*)
      )
    `)
    .eq('id', studentId)
    .single()

  if (studentError) throw studentError

  // Calculate attendance rate
  const { data: attendanceRate } = await supabase
    .rpc('calculate_attendance_rate', { student_uuid: studentId })

  // Calculate assignment completion rate
  const { data: completionRate } = await supabase
    .rpc('calculate_assignment_completion_rate', { student_uuid: studentId })

  return {
    student,
    attendanceRate,
    completionRate
  }
}

async function getAllStudents(supabase: any) {
  const { data: students, error } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        course:courses_master(course_name)
      ),
      gamification:student_gamification(total_points, current_level)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error

  return { students }
}

async function enrollStudent(supabase: any, studentId: string, courseId: string) {
  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from('student_enrollments')
    .select('id')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .single()

  if (existingEnrollment) {
    throw new Error('Student already enrolled in this course')
  }

  // Create enrollment
  const { data: enrollment, error } = await supabase
    .from('student_enrollments')
    .insert({
      student_id: studentId,
      course_id: courseId
    })
    .select()
    .single()

  if (error) throw error

  // Award enrollment points
  await supabase
    .from('student_gamification')
    .update({
      total_points: supabase.raw('total_points + 50')
    })
    .eq('student_id', studentId)

  return { enrollment, message: 'Student enrolled successfully' }
}

async function getStudentProgress(supabase: any, studentId: string) {
  // Get comprehensive progress data
  const { data: progress, error } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        *,
        course:courses_master(*)
      ),
      recent_assessments:assessments(*)
    `)
    .eq('id', studentId)
    .single()

  if (error) throw error

  // Get attendance statistics
  const { data: attendanceStats } = await supabase
    .from('student_attendance')
    .select('is_present, participation_score')
    .eq('student_id', studentId)

  const totalSessions = attendanceStats?.length || 0
  const attendedSessions = attendanceStats?.filter(a => a.is_present).length || 0
  const avgParticipation = attendanceStats?.reduce((sum, a) => sum + (a.participation_score || 0), 0) / totalSessions || 0

  return {
    progress,
    statistics: {
      attendanceRate: totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0,
      averageParticipation: avgParticipation,
      totalSessions
    }
  }
}