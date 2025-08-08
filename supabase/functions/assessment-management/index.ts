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

    const { action, assessmentData, studentId, courseId } = await req.json()

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
      case 'create_assessment':
        result = await createAssessment(supabaseClient, user.id, assessmentData)
        break
      case 'get_student_assessments':
        result = await getStudentAssessments(supabaseClient, studentId)
        break
      case 'get_course_assessments':
        result = await getCourseAssessments(supabaseClient, courseId)
        break
      case 'update_assessment':
        result = await updateAssessment(supabaseClient, assessmentData)
        break
      case 'generate_progress_report':
        result = await generateProgressReport(supabaseClient, studentId)
        break
      case 'check_level_advancement':
        result = await checkLevelAdvancement(supabaseClient, studentId)
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

async function createAssessment(supabase: any, userId: string, assessmentData: any) {
  // Get teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('teacher_id, role')
    .eq('user_id', userId)
    .single()

  if (profile.role !== 'instructor' && profile.role !== 'admin') {
    throw new Error('Only teachers can create assessments')
  }

  // Calculate overall score from individual skill scores
  const skillScores = [
    assessmentData.listening_score,
    assessmentData.reading_score,
    assessmentData.speaking_score,
    assessmentData.writing_score,
    assessmentData.grammar_score,
    assessmentData.vocabulary_score
  ].filter(score => score !== null && score !== undefined)

  const overallScore = skillScores.length > 0 
    ? skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length 
    : null

  const { data: assessment, error } = await supabase
    .from('assessments')
    .insert({
      ...assessmentData,
      teacher_id: profile.teacher_id,
      overall_score: overallScore
    })
    .select()
    .single()

  if (error) throw error

  // Award points for assessment completion
  if (assessmentData.student_id) {
    const pointsAwarded = Math.round((overallScore || 0) / 10) // 1 point per 10% score
    await supabase
      .from('student_gamification')
      .update({
        total_points: supabase.raw(`total_points + ${pointsAwarded}`)
      })
      .eq('student_id', assessmentData.student_id)

    // Check for achievement badges
    await checkAssessmentBadges(supabase, assessmentData.student_id, overallScore)
  }

  // Create notification for student
  if (assessmentData.student_id) {
    await supabase
      .from('notifications')
      .insert({
        recipient_id: assessmentData.student_id,
        recipient_type: 'student',
        title: 'New Assessment Result',
        message: `Your ${assessmentData.assessment_type} assessment has been graded. Score: ${overallScore?.toFixed(1)}%`,
        type: overallScore >= 70 ? 'success' : 'warning'
      })
  }

  return { assessment, message: 'Assessment created successfully' }
}

async function getStudentAssessments(supabase: any, studentId: string) {
  const { data: assessments, error } = await supabase
    .from('assessments')
    .select(`
      *,
      teacher:teachers(full_name),
      course:courses_master(course_name)
    `)
    .eq('student_id', studentId)
    .order('assessment_date', { ascending: false })

  if (error) throw error

  // Calculate progress trends
  const progressTrend = calculateProgressTrend(assessments)

  return { assessments, progressTrend }
}

async function getCourseAssessments(supabase: any, courseId: string) {
  const { data: assessments, error } = await supabase
    .from('assessments')
    .select(`
      *,
      student:students(full_name, student_id),
      teacher:teachers(full_name)
    `)
    .eq('course_id', courseId)
    .order('assessment_date', { ascending: false })

  if (error) throw error

  // Calculate course statistics
  const courseStats = calculateCourseStats(assessments)

  return { assessments, courseStats }
}

async function updateAssessment(supabase: any, assessmentData: any) {
  const { id, ...updateData } = assessmentData

  // Recalculate overall score if skill scores are updated
  if (updateData.listening_score || updateData.reading_score || updateData.speaking_score || 
      updateData.writing_score || updateData.grammar_score || updateData.vocabulary_score) {
    
    const skillScores = [
      updateData.listening_score,
      updateData.reading_score,
      updateData.speaking_score,
      updateData.writing_score,
      updateData.grammar_score,
      updateData.vocabulary_score
    ].filter(score => score !== null && score !== undefined)

    if (skillScores.length > 0) {
      updateData.overall_score = skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length
    }
  }

  const { data: assessment, error } = await supabase
    .from('assessments')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return { assessment, message: 'Assessment updated successfully' }
}

async function generateProgressReport(supabase: any, studentId: string) {
  // Get student details
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single()

  // Get all assessments
  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .order('assessment_date', { ascending: true })

  // Get attendance data
  const { data: attendanceData } = await supabase
    .from('student_attendance')
    .select(`
      *,
      session:class_sessions(session_date, course:courses_master(course_name))
    `)
    .eq('student_id', studentId)

  // Get homework submissions
  const { data: homeworkData } = await supabase
    .from('homework_submissions')
    .select(`
      *,
      assignment:homework_assignments(assignment_title, course:courses_master(course_name))
    `)
    .eq('student_id', studentId)

  // Get gamification data
  const { data: gamification } = await supabase
    .from('student_gamification')
    .select('*')
    .eq('student_id', studentId)
    .single()

  // Calculate comprehensive metrics
  const report = {
    student,
    assessmentSummary: {
      totalAssessments: assessments?.length || 0,
      averageScore: assessments?.reduce((sum, a) => sum + (a.overall_score || 0), 0) / (assessments?.length || 1),
      latestScore: assessments?.[assessments.length - 1]?.overall_score || 0,
      improvement: calculateImprovement(assessments)
    },
    attendanceSummary: {
      totalSessions: attendanceData?.length || 0,
      attendedSessions: attendanceData?.filter(a => a.is_present).length || 0,
      attendanceRate: attendanceData?.length > 0 ? (attendanceData.filter(a => a.is_present).length / attendanceData.length) * 100 : 0,
      averageParticipation: attendanceData?.reduce((sum, a) => sum + (a.participation_score || 0), 0) / (attendanceData?.length || 1)
    },
    homeworkSummary: {
      totalAssignments: homeworkData?.length || 0,
      submittedAssignments: homeworkData?.filter(h => h.submission_content).length || 0,
      averageScore: homeworkData?.reduce((sum, h) => sum + (h.score || 0), 0) / (homeworkData?.length || 1),
      onTimeSubmissions: homeworkData?.filter(h => !h.is_late).length || 0
    },
    gamificationSummary: gamification,
    recommendations: generateRecommendations(assessments, attendanceData, homeworkData)
  }

  return { report }
}

async function checkLevelAdvancement(supabase: any, studentId: string) {
  // Get recent assessments
  const { data: recentAssessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .gte('assessment_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('assessment_date', { ascending: false })

  if (!recentAssessments || recentAssessments.length === 0) {
    return { canAdvance: false, reason: 'No recent assessments found' }
  }

  // Check advancement criteria
  const averageScore = recentAssessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / recentAssessments.length
  const consistentPerformance = recentAssessments.filter(a => (a.overall_score || 0) >= 70).length >= Math.ceil(recentAssessments.length * 0.8)
  
  // Get attendance rate
  const { data: attendanceRate } = await supabase
    .rpc('calculate_attendance_rate', { student_uuid: studentId })

  // Get assignment completion rate
  const { data: completionRate } = await supabase
    .rpc('calculate_assignment_completion_rate', { student_uuid: studentId })

  const canAdvance = averageScore >= 75 && consistentPerformance && attendanceRate >= 80 && completionRate >= 80

  const advancement = {
    canAdvance,
    currentAverageScore: averageScore,
    attendanceRate,
    assignmentCompletionRate: completionRate,
    requirements: {
      minimumScore: 75,
      minimumAttendance: 80,
      minimumCompletion: 80
    },
    recommendation: canAdvance ? 'Student is ready for level advancement' : 'Student needs improvement before advancement'
  }

  return { advancement }
}

async function checkAssessmentBadges(supabase: any, studentId: string, score: number) {
  const badges = []

  if (score >= 95) {
    badges.push('Perfect Score')
  } else if (score >= 90) {
    badges.push('Excellent Performance')
  } else if (score >= 80) {
    badges.push('Great Job')
  }

  if (badges.length > 0) {
    await supabase
      .from('student_gamification')
      .update({
        badges_unlocked: supabase.raw(`array_cat(badges_unlocked, ARRAY[${badges.map(b => `'${b}'`).join(',')}])`)
      })
      .eq('student_id', studentId)
  }
}

function calculateProgressTrend(assessments: any[]) {
  if (!assessments || assessments.length < 2) return 'insufficient_data'

  const recent = assessments.slice(0, 3)
  const older = assessments.slice(3, 6)

  const recentAvg = recent.reduce((sum, a) => sum + (a.overall_score || 0), 0) / recent.length
  const olderAvg = older.length > 0 ? older.reduce((sum, a) => sum + (a.overall_score || 0), 0) / older.length : recentAvg

  if (recentAvg > olderAvg + 5) return 'improving'
  if (recentAvg < olderAvg - 5) return 'declining'
  return 'stable'
}

function calculateCourseStats(assessments: any[]) {
  if (!assessments || assessments.length === 0) return {}

  const totalStudents = new Set(assessments.map(a => a.student_id)).size
  const averageScore = assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / assessments.length
  const passRate = (assessments.filter(a => (a.overall_score || 0) >= 70).length / assessments.length) * 100

  return {
    totalStudents,
    totalAssessments: assessments.length,
    averageScore,
    passRate
  }
}

function calculateImprovement(assessments: any[]) {
  if (!assessments || assessments.length < 2) return 0

  const firstScore = assessments[0]?.overall_score || 0
  const lastScore = assessments[assessments.length - 1]?.overall_score || 0

  return lastScore - firstScore
}

function generateRecommendations(assessments: any[], attendance: any[], homework: any[]) {
  const recommendations = []

  // Assessment recommendations
  if (assessments && assessments.length > 0) {
    const avgScore = assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / assessments.length
    if (avgScore < 70) {
      recommendations.push('Focus on improving overall performance through additional practice')
    }
  }

  // Attendance recommendations
  if (attendance && attendance.length > 0) {
    const attendanceRate = (attendance.filter(a => a.is_present).length / attendance.length) * 100
    if (attendanceRate < 80) {
      recommendations.push('Improve class attendance to enhance learning outcomes')
    }
  }

  // Homework recommendations
  if (homework && homework.length > 0) {
    const completionRate = (homework.filter(h => h.submission_content).length / homework.length) * 100
    if (completionRate < 80) {
      recommendations.push('Complete homework assignments regularly for better progress')
    }
  }

  return recommendations
}