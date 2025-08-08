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

    const { action, courseId } = await req.json()

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
      case 'enroll':
        result = await enrollStudent(supabaseClient, profile.id, courseId)
        break
      case 'unenroll':
        result = await unenrollStudent(supabaseClient, profile.id, courseId)
        break
      case 'get_progress':
        result = await getEnrollmentProgress(supabaseClient, profile.id, courseId)
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

async function enrollStudent(supabase: any, profileId: string, courseId: string) {
  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', profileId)
    .eq('course_id', courseId)
    .single()

  if (existingEnrollment) {
    throw new Error('Already enrolled in this course')
  }

  // Get course details
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  if (courseError) {
    throw courseError
  }

  // Check if course has space
  const { data: enrollmentCount } = await supabase
    .from('enrollments')
    .select('id', { count: 'exact' })
    .eq('course_id', courseId)

  if (enrollmentCount && enrollmentCount.length >= course.max_students) {
    throw new Error('Course is full')
  }

  // Create enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .insert({
      user_id: profileId,
      course_id: courseId,
    })
    .select()
    .single()

  if (enrollmentError) {
    throw enrollmentError
  }

  // Award points for enrollment
  await supabase.rpc('award_points', {
    user_id: profileId,
    points: 50,
    reason: 'Course enrollment'
  })

  // Create notification
  await supabase
    .from('notifications')
    .insert({
      user_id: profileId,
      title: 'Course Enrollment Successful',
      message: `You have successfully enrolled in ${course.title}`,
      type: 'success'
    })

  return { enrollment, message: 'Successfully enrolled in course' }
}

async function unenrollStudent(supabase: any, profileId: string, courseId: string) {
  const { error } = await supabase
    .from('enrollments')
    .delete()
    .eq('user_id', profileId)
    .eq('course_id', courseId)

  if (error) {
    throw error
  }

  return { message: 'Successfully unenrolled from course' }
}

async function getEnrollmentProgress(supabase: any, profileId: string, courseId: string) {
  // Get enrollment with progress
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(
        *,
        lessons(count)
      )
    `)
    .eq('user_id', profileId)
    .eq('course_id', courseId)
    .single()

  if (enrollmentError) {
    throw enrollmentError
  }

  // Get completed lessons
  const { data: completedLessons } = await supabase
    .from('lesson_progress')
    .select(`
      *,
      lesson:lessons!inner(course_id)
    `)
    .eq('user_id', profileId)
    .eq('lesson.course_id', courseId)
    .eq('completed', true)

  // Get all lessons for the course
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('lesson_order')

  // Get task submissions
  const { data: submissions } = await supabase
    .from('task_submissions')
    .select(`
      *,
      task:tasks!inner(course_id)
    `)
    .eq('student_id', profileId)
    .eq('task.course_id', courseId)

  return {
    enrollment,
    completedLessons: completedLessons || [],
    allLessons: allLessons || [],
    submissions: submissions || [],
    progressPercentage: enrollment.progress || 0
  }
}