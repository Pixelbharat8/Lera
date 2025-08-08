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

    const { action, teacherData, teacherId, attendanceData } = await req.json()

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

    let result = {}

    switch (action) {
      case 'check_in':
        result = await teacherCheckIn(supabaseClient, user.id, attendanceData)
        break
      case 'check_out':
        result = await teacherCheckOut(supabaseClient, user.id, attendanceData)
        break
      case 'get_teacher_schedule':
        result = await getTeacherSchedule(supabaseClient, teacherId || user.id)
        break
      case 'get_teacher_students':
        result = await getTeacherStudents(supabaseClient, teacherId || user.id)
        break
      case 'record_class_session':
        result = await recordClassSession(supabaseClient, user.id, teacherData)
        break
      case 'get_teacher_performance':
        result = await getTeacherPerformance(supabaseClient, teacherId || user.id)
        break
      case 'update_teacher_profile':
        result = await updateTeacherProfile(supabaseClient, user.id, teacherData)
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

async function teacherCheckIn(supabase: any, userId: string, attendanceData: any) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  const today = new Date().toISOString().split('T')[0]
  
  // Check if already checked in today
  const { data: existingRecord } = await supabase
    .from('teacher_attendance')
    .select('*')
    .eq('teacher_id', profile.teacher_id)
    .eq('work_date', today)
    .single()

  if (existingRecord && existingRecord.check_in_time) {
    throw new Error('Already checked in today')
  }

  const checkInData = {
    teacher_id: profile.teacher_id,
    check_in_time: new Date().toISOString(),
    work_date: today,
    location: attendanceData?.location || 'Main Campus',
    notes: attendanceData?.notes
  }

  const { data: attendance, error } = await supabase
    .from('teacher_attendance')
    .upsert(checkInData)
    .select()
    .single()

  if (error) throw error

  // Log the action
  await supabase
    .from('system_logs')
    .insert({
      user_id: userId,
      user_type: 'teacher',
      action_type: 'check_in',
      table_affected: 'teacher_attendance',
      record_id: attendance.id
    })

  return { attendance, message: 'Checked in successfully' }
}

async function teacherCheckOut(supabase: any, userId: string, attendanceData: any) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  const today = new Date().toISOString().split('T')[0]
  
  // Get today's attendance record
  const { data: attendanceRecord } = await supabase
    .from('teacher_attendance')
    .select('*')
    .eq('teacher_id', profile.teacher_id)
    .eq('work_date', today)
    .single()

  if (!attendanceRecord || !attendanceRecord.check_in_time) {
    throw new Error('No check-in record found for today')
  }

  if (attendanceRecord.check_out_time) {
    throw new Error('Already checked out today')
  }

  const checkOutTime = new Date()
  const checkInTime = new Date(attendanceRecord.check_in_time)
  const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)

  const { data: attendance, error } = await supabase
    .from('teacher_attendance')
    .update({
      check_out_time: checkOutTime.toISOString(),
      total_hours: Math.round(totalHours * 100) / 100,
      notes: attendanceData?.notes
    })
    .eq('id', attendanceRecord.id)
    .select()
    .single()

  if (error) throw error

  return { attendance, message: 'Checked out successfully' }
}

async function getTeacherSchedule(supabase: any, userId: string) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  // Get upcoming class sessions
  const { data: sessions, error } = await supabase
    .from('class_sessions')
    .select(`
      *,
      course:courses_master(*),
      attendance:student_attendance(
        student:students(full_name)
      )
    `)
    .eq('teacher_id', profile.teacher_id)
    .gte('session_date', new Date().toISOString().split('T')[0])
    .order('session_date', { ascending: true })
    .order('session_time', { ascending: true })

  if (error) throw error

  return { sessions }
}

async function getTeacherStudents(supabase: any, userId: string) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  // Get students from courses taught by this teacher
  const { data: students, error } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments!inner(
        course:courses_master!inner(*)
      ),
      gamification:student_gamification(*),
      recent_assessments:assessments(*)
    `)
    .contains('enrollments.course.assigned_teachers', [profile.teacher_id])
    .eq('is_active', true)

  if (error) throw error

  return { students }
}

async function recordClassSession(supabase: any, userId: string, sessionData: any) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  // Create class session record
  const { data: session, error } = await supabase
    .from('class_sessions')
    .insert({
      ...sessionData,
      teacher_id: profile.teacher_id
    })
    .select()
    .single()

  if (error) throw error

  // Record attendance for each student
  if (sessionData.attendance && Array.isArray(sessionData.attendance)) {
    const attendanceRecords = sessionData.attendance.map((record: any) => ({
      session_id: session.id,
      student_id: record.student_id,
      is_present: record.is_present,
      participation_score: record.participation_score,
      behavioral_notes: record.behavioral_notes,
      late_arrival: record.late_arrival,
      early_departure: record.early_departure
    }))

    await supabase
      .from('student_attendance')
      .insert(attendanceRecords)
  }

  return { session, message: 'Class session recorded successfully' }
}

async function getTeacherPerformance(supabase: any, userId: string) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  // Get attendance statistics
  const { data: attendanceStats } = await supabase
    .from('teacher_attendance')
    .select('*')
    .eq('teacher_id', profile.teacher_id)
    .gte('work_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

  // Get class statistics
  const { data: classStats } = await supabase
    .from('class_sessions')
    .select('*')
    .eq('teacher_id', profile.teacher_id)
    .gte('session_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

  // Get student feedback/ratings
  const { data: teacher } = await supabase
    .from('teachers')
    .select('feedback_rating, total_feedback_count')
    .eq('id', profile.teacher_id)
    .single()

  // Calculate performance metrics
  const totalWorkDays = attendanceStats?.length || 0
  const totalHours = attendanceStats?.reduce((sum, record) => sum + (record.total_hours || 0), 0) || 0
  const totalClasses = classStats?.length || 0
  const avgRating = teacher?.feedback_rating || 0

  return {
    performance: {
      totalWorkDays,
      totalHours,
      totalClasses,
      averageRating: avgRating,
      punctualityScore: calculatePunctualityScore(attendanceStats),
      classCompletionRate: calculateClassCompletionRate(classStats)
    },
    attendanceStats,
    classStats
  }
}

async function updateTeacherProfile(supabase: any, userId: string, teacherData: any) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.teacher_id) {
    throw new Error('Teacher profile not found')
  }

  const { data: teacher, error } = await supabase
    .from('teachers')
    .update(teacherData)
    .eq('id', profile.teacher_id)
    .select()
    .single()

  if (error) throw error

  return { teacher, message: 'Profile updated successfully' }
}

function calculatePunctualityScore(attendanceStats: any[]) {
  if (!attendanceStats || attendanceStats.length === 0) return 0
  
  // Assuming work starts at 8:00 AM
  const onTimeCount = attendanceStats.filter(record => {
    if (!record.check_in_time) return false
    const checkInHour = new Date(record.check_in_time).getHours()
    return checkInHour <= 8
  }).length
  
  return Math.round((onTimeCount / attendanceStats.length) * 100)
}

function calculateClassCompletionRate(classStats: any[]) {
  if (!classStats || classStats.length === 0) return 0
  
  // Assuming a class is complete if it has lesson objectives recorded
  const completedClasses = classStats.filter(session => 
    session.lesson_objective && session.lesson_objective.trim().length > 0
  ).length
  
  return Math.round((completedClasses / classStats.length) * 100)
}