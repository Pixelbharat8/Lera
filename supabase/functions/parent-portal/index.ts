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

    const { action, parentData, studentId } = await req.json()

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
      case 'get_parent_dashboard':
        result = await getParentDashboard(supabaseClient, user.id)
        break
      case 'get_child_progress':
        result = await getChildProgress(supabaseClient, user.id, studentId)
        break
      case 'get_child_attendance':
        result = await getChildAttendance(supabaseClient, user.id, studentId)
        break
      case 'get_payment_history':
        result = await getPaymentHistory(supabaseClient, user.id)
        break
      case 'send_message_to_teacher':
        result = await sendMessageToTeacher(supabaseClient, user.id, parentData)
        break
      case 'update_parent_preferences':
        result = await updateParentPreferences(supabaseClient, user.id, parentData)
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

async function getParentDashboard(supabase: any, userId: string) {
  // Get parent profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  if (!profile?.parent_id) {
    throw new Error('Parent profile not found')
  }

  // Get linked children
  const { data: children, error } = await supabase
    .from('parent_student_links')
    .select(`
      *,
      student:students(
        *,
        enrollments:student_enrollments(
          *,
          course:courses_master(*)
        ),
        gamification:student_gamification(*),
        recent_assessments:assessments(*)
      )
    `)
    .eq('parent_id', profile.parent_id)

  if (error) throw error

  // Get recent notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_id', profile.parent_id)
    .eq('recipient_type', 'parent')
    .order('created_at', { ascending: false })
    .limit(10)

  // Get upcoming events for all children
  const studentIds = children?.map(c => c.student.id) || []
  const { data: upcomingEvents } = await supabase
    .from('class_sessions')
    .select(`
      *,
      course:courses_master(course_name),
      teacher:teachers(full_name)
    `)
    .in('course_id', 
      await supabase
        .from('student_enrollments')
        .select('course_id')
        .in('student_id', studentIds)
        .then(({ data }) => data?.map(e => e.course_id) || [])
    )
    .gte('session_date', new Date().toISOString().split('T')[0])
    .order('session_date', { ascending: true })
    .limit(5)

  return {
    children,
    notifications,
    upcomingEvents,
    summary: {
      totalChildren: children?.length || 0,
      activeEnrollments: children?.reduce((sum, c) => sum + (c.student.enrollments?.length || 0), 0) || 0,
      unreadNotifications: notifications?.filter(n => !n.is_read).length || 0
    }
  }
}

async function getChildProgress(supabase: any, userId: string, studentId: string) {
  // Verify parent has access to this student
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  const { data: link } = await supabase
    .from('parent_student_links')
    .select('id')
    .eq('parent_id', profile.parent_id)
    .eq('student_id', studentId)
    .single()

  if (!link) {
    throw new Error('Access denied to this student')
  }

  // Get comprehensive progress data
  const { data: student } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        *,
        course:courses_master(*)
      ),
      assessments(*),
      gamification:student_gamification(*),
      homework:homework_submissions(
        *,
        assignment:homework_assignments(assignment_title, due_date)
      )
    `)
    .eq('id', studentId)
    .single()

  // Calculate progress metrics
  const progressMetrics = {
    attendanceRate: await supabase.rpc('calculate_attendance_rate', { student_uuid: studentId }),
    assignmentCompletion: await supabase.rpc('calculate_assignment_completion_rate', { student_uuid: studentId }),
    averageScore: student.assessments?.reduce((sum: number, a: any) => sum + (a.overall_score || 0), 0) / (student.assessments?.length || 1),
    recentTrend: calculateRecentTrend(student.assessments)
  }

  return { student, progressMetrics }
}

async function getChildAttendance(supabase: any, userId: string, studentId: string) {
  // Verify parent access
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  const { data: link } = await supabase
    .from('parent_student_links')
    .select('id')
    .eq('parent_id', profile.parent_id)
    .eq('student_id', studentId)
    .single()

  if (!link) {
    throw new Error('Access denied to this student')
  }

  // Get attendance records
  const { data: attendance, error } = await supabase
    .from('student_attendance')
    .select(`
      *,
      session:class_sessions(
        session_date,
        session_time,
        lesson_objective,
        course:courses_master(course_name),
        teacher:teachers(full_name)
      )
    `)
    .eq('student_id', studentId)
    .order('session.session_date', { ascending: false })

  if (error) throw error

  // Calculate attendance statistics
  const stats = {
    totalSessions: attendance?.length || 0,
    attendedSessions: attendance?.filter(a => a.is_present).length || 0,
    lateArrivals: attendance?.filter(a => a.late_arrival).length || 0,
    earlyDepartures: attendance?.filter(a => a.early_departure).length || 0,
    averageParticipation: attendance?.reduce((sum, a) => sum + (a.participation_score || 0), 0) / (attendance?.length || 1)
  }

  return { attendance, stats }
}

async function getPaymentHistory(supabase: any, userId: string) {
  // Get parent profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  // Get all children's payment records
  const { data: payments, error } = await supabase
    .from('payments')
    .select(`
      *,
      student:students(full_name, student_id),
      course:courses_master(course_name)
    `)
    .in('student_id',
      await supabase
        .from('parent_student_links')
        .select('student_id')
        .eq('parent_id', profile.parent_id)
        .then(({ data }) => data?.map(l => l.student_id) || [])
    )
    .order('created_at', { ascending: false })

  if (error) throw error

  // Calculate payment summary
  const summary = {
    totalPaid: payments?.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.final_amount, 0) || 0,
    pendingAmount: payments?.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.final_amount, 0) || 0,
    totalInvoices: payments?.length || 0,
    overduePayments: payments?.filter(p => p.status === 'pending' && new Date(p.due_date) < new Date()).length || 0
  }

  return { payments, summary }
}

async function sendMessageToTeacher(supabase: any, userId: string, messageData: any) {
  // Get parent profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  // Create notification for teacher
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      recipient_id: messageData.teacherId,
      recipient_type: 'teacher',
      title: `Message from Parent: ${messageData.subject}`,
      message: messageData.message,
      type: 'info',
      action_url: `/teacher/messages`
    })
    .select()
    .single()

  if (error) throw error

  // Log the communication
  await supabase
    .from('system_logs')
    .insert({
      user_id: userId,
      user_type: 'parent',
      action_type: 'message_sent',
      table_affected: 'notifications',
      record_id: notification.id,
      new_values: messageData
    })

  return { notification, message: 'Message sent successfully' }
}

async function updateParentPreferences(supabase: any, userId: string, preferences: any) {
  // Get parent profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('parent_id')
    .eq('user_id', userId)
    .single()

  const { data: parent, error } = await supabase
    .from('parents')
    .update({
      preferred_language: preferences.language,
      email: preferences.email,
      phone: preferences.phone
    })
    .eq('id', profile.parent_id)
    .select()
    .single()

  if (error) throw error

  return { parent, message: 'Preferences updated successfully' }
}

function calculateRecentTrend(assessments: any[]) {
  if (!assessments || assessments.length < 2) return 'insufficient_data'

  const sortedAssessments = assessments.sort((a, b) => new Date(a.assessment_date).getTime() - new Date(b.assessment_date).getTime())
  const recent = sortedAssessments.slice(-3)
  const previous = sortedAssessments.slice(-6, -3)

  if (previous.length === 0) return 'insufficient_data'

  const recentAvg = recent.reduce((sum, a) => sum + (a.overall_score || 0), 0) / recent.length
  const previousAvg = previous.reduce((sum, a) => sum + (a.overall_score || 0), 0) / previous.length

  if (recentAvg > previousAvg + 5) return 'improving'
  if (recentAvg < previousAvg - 5) return 'declining'
  return 'stable'
}