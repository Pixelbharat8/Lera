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

    const { action, sessionId, sessionData } = await req.json()

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

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    let result = {}

    switch (action) {
      case 'create':
        if (profile.role !== 'instructor' && profile.role !== 'admin') {
          throw new Error('Only instructors can create live sessions')
        }
        result = await createLiveSession(supabaseClient, profile.id, sessionData)
        break
      case 'join':
        result = await joinLiveSession(supabaseClient, profile.id, sessionId)
        break
      case 'leave':
        result = await leaveLiveSession(supabaseClient, profile.id, sessionId)
        break
      case 'start':
        result = await startLiveSession(supabaseClient, profile.id, sessionId)
        break
      case 'end':
        result = await endLiveSession(supabaseClient, profile.id, sessionId)
        break
      case 'get_attendees':
        result = await getSessionAttendees(supabaseClient, sessionId)
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

async function createLiveSession(supabase: any, instructorId: string, sessionData: any) {
  const { data: session, error } = await supabase
    .from('live_sessions')
    .insert({
      ...sessionData,
      instructor_id: instructorId,
      room_id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  // Notify enrolled students
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id')
    .eq('course_id', sessionData.course_id)

  if (enrollments) {
    const notifications = enrollments.map((enrollment: any) => ({
      user_id: enrollment.user_id,
      title: 'New Live Session Scheduled',
      message: `A new live session "${sessionData.title}" has been scheduled`,
      type: 'info',
      action_url: `/live-session/${session.id}`
    }))

    await supabase
      .from('notifications')
      .insert(notifications)
  }

  return { session, message: 'Live session created successfully' }
}

async function joinLiveSession(supabase: any, userId: string, sessionId: string) {
  // Check if session exists and is live
  const { data: session, error: sessionError } = await supabase
    .from('live_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (sessionError) {
    throw sessionError
  }

  if (session.status !== 'live' && session.status !== 'scheduled') {
    throw new Error('Session is not available for joining')
  }

  // Check if user is enrolled in the course (for students)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (profile.role === 'student') {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', session.course_id)
      .single()

    if (!enrollment) {
      throw new Error('You must be enrolled in this course to join the session')
    }
  }

  // Record attendance
  const { data: attendance, error: attendanceError } = await supabase
    .from('session_attendees')
    .upsert({
      session_id: sessionId,
      user_id: userId,
      joined_at: new Date().toISOString()
    })
    .select()
    .single()

  if (attendanceError) {
    throw attendanceError
  }

  return { 
    attendance, 
    session,
    message: 'Successfully joined live session' 
  }
}

async function leaveLiveSession(supabase: any, userId: string, sessionId: string) {
  const now = new Date().toISOString()
  
  // Update attendance record with leave time
  const { data: attendance, error } = await supabase
    .from('session_attendees')
    .update({ 
      left_at: now,
      attendance_duration_minutes: supabase.rpc('calculate_duration_minutes', {
        start_time: 'joined_at',
        end_time: now
      })
    })
    .eq('session_id', sessionId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return { attendance, message: 'Successfully left live session' }
}

async function startLiveSession(supabase: any, instructorId: string, sessionId: string) {
  // Verify instructor owns this session
  const { data: session, error: sessionError } = await supabase
    .from('live_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('instructor_id', instructorId)
    .single()

  if (sessionError) {
    throw sessionError
  }

  // Update session status to live
  const { data: updatedSession, error: updateError } = await supabase
    .from('live_sessions')
    .update({
      status: 'live',
      actual_start: new Date().toISOString()
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (updateError) {
    throw updateError
  }

  // Notify enrolled students
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id')
    .eq('course_id', session.course_id)

  if (enrollments) {
    const notifications = enrollments.map((enrollment: any) => ({
      user_id: enrollment.user_id,
      title: 'Live Session Started',
      message: `The live session "${session.title}" has started. Join now!`,
      type: 'info',
      action_url: `/live-session/${sessionId}`
    }))

    await supabase
      .from('notifications')
      .insert(notifications)
  }

  return { session: updatedSession, message: 'Live session started' }
}

async function endLiveSession(supabase: any, instructorId: string, sessionId: string) {
  // Verify instructor owns this session
  const { data: session, error: sessionError } = await supabase
    .from('live_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('instructor_id', instructorId)
    .single()

  if (sessionError) {
    throw sessionError
  }

  // Update session status to ended
  const { data: updatedSession, error: updateError } = await supabase
    .from('live_sessions')
    .update({
      status: 'ended',
      actual_end: new Date().toISOString()
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (updateError) {
    throw updateError
  }

  // Update all attendees who haven't left yet
  await supabase
    .from('session_attendees')
    .update({ 
      left_at: new Date().toISOString()
    })
    .eq('session_id', sessionId)
    .is('left_at', null)

  return { session: updatedSession, message: 'Live session ended' }
}

async function getSessionAttendees(supabase: any, sessionId: string) {
  const { data: attendees, error } = await supabase
    .from('session_attendees')
    .select(`
      *,
      user:profiles!user_id(
        full_name,
        avatar_url,
        role
      )
    `)
    .eq('session_id', sessionId)
    .order('joined_at', { ascending: true })

  if (error) {
    throw error
  }

  return { attendees }
}