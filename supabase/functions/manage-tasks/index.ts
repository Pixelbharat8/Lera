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

    const { action, taskId, taskData, submissionData } = await req.json()

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
      case 'create_task':
        if (profile.role !== 'instructor' && profile.role !== 'admin') {
          throw new Error('Only instructors can create tasks')
        }
        result = await createTask(supabaseClient, profile.id, taskData)
        break
      case 'submit_task':
        result = await submitTask(supabaseClient, profile.id, taskId, submissionData)
        break
      case 'grade_submission':
        if (profile.role !== 'instructor' && profile.role !== 'admin') {
          throw new Error('Only instructors can grade submissions')
        }
        result = await gradeSubmission(supabaseClient, profile.id, submissionData)
        break
      case 'get_student_tasks':
        result = await getStudentTasks(supabaseClient, profile.id)
        break
      case 'get_instructor_tasks':
        if (profile.role !== 'instructor' && profile.role !== 'admin') {
          throw new Error('Only instructors can view instructor tasks')
        }
        result = await getInstructorTasks(supabaseClient, profile.id)
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

async function createTask(supabase: any, instructorId: string, taskData: any) {
  const { data: task, error } = await supabase
    .from('tasks')
    .insert({
      ...taskData,
      instructor_id: instructorId,
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
    .eq('course_id', taskData.course_id)

  if (enrollments) {
    const notifications = enrollments.map((enrollment: any) => ({
      user_id: enrollment.user_id,
      title: 'New Assignment',
      message: `A new assignment "${taskData.title}" has been posted`,
      type: 'info',
      action_url: `/tasks/${task.id}`
    }))

    await supabase
      .from('notifications')
      .insert(notifications)
  }

  return { task, message: 'Task created successfully' }
}

async function submitTask(supabase: any, studentId: string, taskId: string, submissionData: any) {
  // Check if task exists and is not past due
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single()

  if (taskError) {
    throw taskError
  }

  const now = new Date()
  const dueDate = new Date(task.due_date)
  
  if (now > dueDate) {
    throw new Error('Task submission deadline has passed')
  }

  // Create or update submission
  const { data: submission, error: submissionError } = await supabase
    .from('task_submissions')
    .upsert({
      task_id: taskId,
      student_id: studentId,
      ...submissionData,
      submitted_at: new Date().toISOString()
    })
    .select()
    .single()

  if (submissionError) {
    throw submissionError
  }

  // Award points for submission
  await supabase.rpc('award_points', {
    user_id: studentId,
    points: 20,
    reason: 'Task submission'
  })

  // Notify instructor
  await supabase
    .from('notifications')
    .insert({
      user_id: task.instructor_id,
      title: 'New Submission',
      message: `A student has submitted "${task.title}"`,
      type: 'info',
      action_url: `/grading/${submission.id}`
    })

  return { submission, message: 'Task submitted successfully' }
}

async function gradeSubmission(supabase: any, instructorId: string, submissionData: any) {
  const { submissionId, score, feedback } = submissionData

  // Verify instructor has permission to grade this submission
  const { data: submission, error: submissionError } = await supabase
    .from('task_submissions')
    .select(`
      *,
      task:tasks!inner(instructor_id)
    `)
    .eq('id', submissionId)
    .single()

  if (submissionError) {
    throw submissionError
  }

  if (submission.task.instructor_id !== instructorId) {
    throw new Error('You can only grade submissions for your own tasks')
  }

  // Update submission with grade
  const { data: gradedSubmission, error: gradeError } = await supabase
    .from('task_submissions')
    .update({
      score,
      feedback,
      graded_at: new Date().toISOString(),
      graded_by: instructorId
    })
    .eq('id', submissionId)
    .select()
    .single()

  if (gradeError) {
    throw gradeError
  }

  // Award points based on score
  const pointsAwarded = Math.round((score / 100) * 50) // Max 50 points for perfect score
  await supabase.rpc('award_points', {
    user_id: submission.student_id,
    points: pointsAwarded,
    reason: 'Task graded'
  })

  // Notify student
  await supabase
    .from('notifications')
    .insert({
      user_id: submission.student_id,
      title: 'Assignment Graded',
      message: `Your assignment has been graded. Score: ${score}%`,
      type: score >= 70 ? 'success' : 'warning',
      action_url: `/tasks/${submission.task_id}`
    })

  return { submission: gradedSubmission, message: 'Submission graded successfully' }
}

async function getStudentTasks(supabase: any, studentId: string) {
  // Get tasks for courses the student is enrolled in
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select(`
      *,
      course:courses(title),
      submission:task_submissions(
        id,
        content,
        submitted_at,
        score,
        feedback,
        graded_at
      )
    `)
    .in('course_id', 
      await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', studentId)
        .then(({ data }) => data?.map(e => e.course_id) || [])
    )
    .eq('is_published', true)
    .order('due_date', { ascending: true })

  if (error) {
    throw error
  }

  return { tasks }
}

async function getInstructorTasks(supabase: any, instructorId: string) {
  // Get tasks created by the instructor
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select(`
      *,
      course:courses(title),
      submissions:task_submissions(
        id,
        student:profiles!student_id(full_name),
        submitted_at,
        score,
        graded_at
      )
    `)
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return { tasks }
}