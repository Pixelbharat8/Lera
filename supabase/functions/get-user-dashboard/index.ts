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

    // Get user profile with role
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    let dashboardData = {}

    // Get role-specific dashboard data
    switch (profile.role) {
      case 'student':
        dashboardData = await getStudentDashboard(supabaseClient, profile.id)
        break
      case 'instructor':
        dashboardData = await getInstructorDashboard(supabaseClient, profile.id)
        break
      case 'admin':
        dashboardData = await getAdminDashboard(supabaseClient)
        break
      default:
        dashboardData = { message: 'Unknown role' }
    }

    return new Response(
      JSON.stringify({
        profile,
        dashboardData,
      }),
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

async function getStudentDashboard(supabase: any, profileId: string) {
  // Get enrolled courses with progress
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(
        *,
        instructor:profiles!instructor_id(full_name, avatar_url)
      )
    `)
    .eq('user_id', profileId)

  // Get recent lesson progress
  const { data: recentProgress } = await supabase
    .from('lesson_progress')
    .select(`
      *,
      lesson:lessons(
        *,
        course:courses(title)
      )
    `)
    .eq('user_id', profileId)
    .order('updated_at', { ascending: false })
    .limit(5)

  // Get upcoming live sessions
  const { data: upcomingSessions } = await supabase
    .from('live_sessions')
    .select(`
      *,
      course:courses(title),
      instructor:profiles!instructor_id(full_name)
    `)
    .gte('scheduled_start', new Date().toISOString())
    .order('scheduled_start', { ascending: true })
    .limit(5)

  // Get pending tasks
  const { data: pendingTasks } = await supabase
    .from('tasks')
    .select(`
      *,
      course:courses(title),
      submission:task_submissions(id, submitted_at)
    `)
    .in('course_id', enrollments?.map(e => e.course_id) || [])
    .gte('due_date', new Date().toISOString())
    .order('due_date', { ascending: true })
    .limit(5)

  // Get gamification data
  const { data: gamification } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', profileId)
    .single()

  // Get user badges
  const { data: badges } = await supabase
    .from('user_badges')
    .select(`
      *,
      badge:badges(*)
    `)
    .eq('user_id', profileId)

  return {
    enrollments,
    recentProgress,
    upcomingSessions,
    pendingTasks,
    gamification,
    badges,
  }
}

async function getInstructorDashboard(supabase: any, profileId: string) {
  // Get instructor's courses
  const { data: courses } = await supabase
    .from('courses')
    .select(`
      *,
      enrollments(count),
      lessons(count)
    `)
    .eq('instructor_id', profileId)

  // Get today's live sessions
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

  const { data: todaySessions } = await supabase
    .from('live_sessions')
    .select(`
      *,
      course:courses(title),
      attendees:session_attendees(count)
    `)
    .eq('instructor_id', profileId)
    .gte('scheduled_start', startOfDay)
    .lte('scheduled_start', endOfDay)
    .order('scheduled_start', { ascending: true })

  // Get pending submissions to grade
  const { data: pendingSubmissions } = await supabase
    .from('task_submissions')
    .select(`
      *,
      task:tasks(*),
      student:profiles!student_id(full_name)
    `)
    .is('score', null)
    .in('task_id', 
      await supabase
        .from('tasks')
        .select('id')
        .eq('instructor_id', profileId)
        .then(({ data }) => data?.map(t => t.id) || [])
    )
    .order('submitted_at', { ascending: true })
    .limit(10)

  // Get recent student activity
  const { data: recentActivity } = await supabase
    .from('lesson_progress')
    .select(`
      *,
      user:profiles!user_id(full_name),
      lesson:lessons(
        title,
        course:courses!inner(instructor_id)
      )
    `)
    .eq('lesson.course.instructor_id', profileId)
    .order('updated_at', { ascending: false })
    .limit(10)

  return {
    courses,
    todaySessions,
    pendingSubmissions,
    recentActivity,
  }
}

async function getAdminDashboard(supabase: any) {
  // Get overall statistics
  const { data: totalStudents } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' })
    .eq('role', 'student')

  const { data: totalInstructors } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' })
    .eq('role', 'instructor')

  const { data: totalCourses } = await supabase
    .from('courses')
    .select('id', { count: 'exact' })

  const { data: totalEnrollments } = await supabase
    .from('enrollments')
    .select('id', { count: 'exact' })

  // Get recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      user:profiles!user_id(full_name),
      course:courses(title)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get active live sessions
  const { data: activeSessions } = await supabase
    .from('live_sessions')
    .select(`
      *,
      course:courses(title),
      instructor:profiles!instructor_id(full_name),
      attendees:session_attendees(count)
    `)
    .eq('status', 'live')

  // Get system metrics
  const { data: systemMetrics } = await supabase
    .from('user_analytics')
    .select('event_type, created_at')
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

  return {
    statistics: {
      totalStudents: totalStudents?.length || 0,
      totalInstructors: totalInstructors?.length || 0,
      totalCourses: totalCourses?.length || 0,
      totalEnrollments: totalEnrollments?.length || 0,
    },
    recentEnrollments,
    activeSessions,
    systemMetrics,
  }
}