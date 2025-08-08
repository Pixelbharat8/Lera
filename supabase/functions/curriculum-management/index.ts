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

    const { action, data } = await req.json()

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
      case 'get_curriculum_levels':
        result = await getCurriculumLevels(supabaseClient)
        break
      case 'get_course_materials':
        result = await getCourseMaterials(supabaseClient)
        break
      case 'create_lesson_plan':
        result = await createLessonPlan(supabaseClient, data)
        break
      case 'get_lesson_plans':
        result = await getLessonPlans(supabaseClient, data.courseId)
        break
      case 'conduct_placement_test':
        result = await conductPlacementTest(supabaseClient, data)
        break
      case 'get_student_curriculum_progress':
        result = await getStudentCurriculumProgress(supabaseClient, data.studentId)
        break
      case 'create_blended_module':
        result = await createBlendedModule(supabaseClient, data)
        break
      case 'track_module_progress':
        result = await trackModuleProgress(supabaseClient, data)
        break
      case 'generate_parent_report':
        result = await generateParentReport(supabaseClient, data.studentId)
        break
      case 'get_cambridge_yle_progress':
        result = await getCambridgeYLEProgress(supabaseClient, data.studentId)
        break
      case 'get_ielts_mock_results':
        result = await getIELTSMockResults(supabaseClient, data.studentId)
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

async function getCurriculumLevels(supabase: any) {
  const levels = [
    { code: 'KG1', name: 'Kindergarten 1', age_range: '3-4 years', cefr: 'Pre-A1', description: 'Phonics introduction and basic vocabulary' },
    { code: 'KG2', name: 'Kindergarten 2', age_range: '4-5 years', cefr: 'Pre-A1', description: 'Phonics consolidation and simple speaking' },
    { code: 'KG3', name: 'Kindergarten 3', age_range: '5-6 years', cefr: 'Pre-A1', description: 'Emerging literacy and cultural awareness' },
    { code: 'Primary_1', name: 'Primary Level 1', age_range: '6-7 years', cefr: 'A1', description: 'Grammar foundation with structured progression' },
    { code: 'Primary_2', name: 'Primary Level 2', age_range: '7-8 years', cefr: 'A1', description: 'Reading development and basic conversations' },
    { code: 'Primary_3', name: 'Primary Level 3', age_range: '8-9 years', cefr: 'A1+', description: 'Cambridge Starters preparation' },
    { code: 'Primary_4', name: 'Primary Level 4', age_range: '9-10 years', cefr: 'A2', description: 'Cambridge Movers preparation' },
    { code: 'Primary_5', name: 'Primary Level 5', age_range: '10-11 years', cefr: 'A2', description: 'Cambridge Flyers preparation' },
    { code: 'Primary_6', name: 'Primary Level 6', age_range: '11-12 years', cefr: 'A2+', description: 'Advanced primary with project work' },
    { code: 'Secondary_1', name: 'Secondary Level 1', age_range: '12-13 years', cefr: 'B1', description: 'Critical thinking and inquiry-based learning' },
    { code: 'Secondary_2', name: 'Secondary Level 2', age_range: '13-14 years', cefr: 'B1', description: 'Project-based learning and entrepreneurship' },
    { code: 'Secondary_3', name: 'Secondary Level 3', age_range: '14-15 years', cefr: 'B1+', description: '21st-century skills development' },
    { code: 'Secondary_4', name: 'Secondary Level 4', age_range: '15-16 years', cefr: 'B2', description: 'Cambridge PET/FCE preparation' },
    { code: 'IELTS_Foundation', name: 'IELTS Foundation', age_range: '15+ years', cefr: 'B1', description: 'IELTS format introduction (Band 5-5.5)' },
    { code: 'IELTS_Intermediate', name: 'IELTS Intermediate', age_range: '16+ years', cefr: 'B2', description: 'IELTS skill development (Band 6-6.5)' },
    { code: 'IELTS_Advanced', name: 'IELTS Advanced', age_range: '17+ years', cefr: 'B2+/C1', description: 'IELTS mastery (Band 7-8+)' }
  ]

  return { levels }
}

async function getCourseMaterials(supabase: any) {
  const { data: materials, error } = await supabase
    .from('course_materials')
    .select('*')
    .order('publisher', { ascending: true })

  if (error) throw error

  return { materials }
}

async function createLessonPlan(supabase: any, planData: any) {
  const { data: lessonPlan, error } = await supabase
    .from('lesson_plans')
    .insert({
      course_id: planData.courseId,
      week_number: planData.weekNumber,
      lesson_number: planData.lessonNumber,
      lesson_title: planData.title,
      big_question: planData.bigQuestion, // Oxford Discover methodology
      learning_objectives: planData.objectives,
      materials_needed: planData.materials,
      activities: planData.activities,
      clil_integration: planData.clilContent,
      assessment_criteria: planData.assessmentCriteria,
      homework_assignment: planData.homework,
      digital_resources: planData.digitalResources,
      estimated_duration_minutes: planData.duration || 90
    })
    .select()
    .single()

  if (error) throw error

  return { lessonPlan, message: 'Lesson plan created successfully' }
}

async function getLessonPlans(supabase: any, courseId: string) {
  const { data: lessonPlans, error } = await supabase
    .from('lesson_plans')
    .select(`
      *,
      course:courses_master(course_name, level)
    `)
    .eq('course_id', courseId)
    .order('week_number', { ascending: true })
    .order('lesson_number', { ascending: true })

  if (error) throw error

  return { lessonPlans }
}

async function conductPlacementTest(supabase: any, testData: any) {
  // Determine recommended level based on scores
  const averageScore = Object.values(testData.scores).reduce((sum: number, score: any) => sum + score, 0) / Object.keys(testData.scores).length
  
  let recommendedLevel = 'KG1'
  
  if (testData.testType === 'phonics') {
    if (averageScore >= 80) recommendedLevel = 'KG3'
    else if (averageScore >= 60) recommendedLevel = 'KG2'
    else recommendedLevel = 'KG1'
  } else if (testData.testType === 'cambridge_yle') {
    if (averageScore >= 80) recommendedLevel = 'Primary_4'
    else if (averageScore >= 60) recommendedLevel = 'Primary_2'
    else recommendedLevel = 'Primary_1'
  } else {
    // General placement
    if (averageScore >= 85) recommendedLevel = 'CEFR_B2'
    else if (averageScore >= 75) recommendedLevel = 'CEFR_B1'
    else if (averageScore >= 65) recommendedLevel = 'CEFR_A2'
    else if (averageScore >= 50) recommendedLevel = 'CEFR_A1'
    else recommendedLevel = 'Primary_6'
  }

  const { data: placement, error } = await supabase
    .from('student_placements')
    .insert({
      student_id: testData.studentId,
      test_type: testData.testType,
      skills_tested: testData.skillsTested,
      scores: testData.scores,
      recommended_level: recommendedLevel,
      placement_notes: testData.notes,
      conducted_by: testData.teacherId
    })
    .select()
    .single()

  if (error) throw error

  // Update student's current level
  await supabase
    .from('students')
    .update({ current_level: recommendedLevel })
    .eq('id', testData.studentId)

  return { placement, recommendedLevel, message: 'Placement test completed successfully' }
}

async function getStudentCurriculumProgress(supabase: any, studentId: string) {
  // Get student with current level and enrollments
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        *,
        course:courses_master(
          *,
          materials:course_materials(*)
        )
      ),
      placements:student_placements(*),
      gamification:student_gamification(*)
    `)
    .eq('id', studentId)
    .single()

  if (studentError) throw studentError

  // Get recent assessments
  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .order('assessment_date', { ascending: false })
    .limit(10)

  // Get blended learning progress
  const { data: moduleProgress } = await supabase
    .from('student_module_progress')
    .select(`
      *,
      module:blended_learning_modules(*)
    `)
    .eq('student_id', studentId)

  // Calculate curriculum progression
  const curriculumPath = getCurriculumProgression(student.current_level)
  const nextLevel = getNextLevel(student.current_level)
  const canAdvance = await checkLevelAdvancement(supabase, studentId, student.current_level)

  return {
    student,
    assessments,
    moduleProgress,
    curriculumPath,
    nextLevel,
    canAdvance
  }
}

async function createBlendedModule(supabase: any, moduleData: any) {
  const { data: module, error } = await supabase
    .from('blended_learning_modules')
    .insert(moduleData)
    .select()
    .single()

  if (error) throw error

  return { module, message: 'Blended learning module created successfully' }
}

async function trackModuleProgress(supabase: any, progressData: any) {
  const { data: progress, error } = await supabase
    .from('student_module_progress')
    .upsert({
      student_id: progressData.studentId,
      module_id: progressData.moduleId,
      started_at: progressData.startedAt || new Date().toISOString(),
      completed_at: progressData.completedAt,
      time_spent_minutes: progressData.timeSpent,
      completion_percentage: progressData.completionPercentage,
      quiz_score: progressData.quizScore
    })
    .select()
    .single()

  if (error) throw error

  // Award points for module completion
  if (progressData.completionPercentage === 100) {
    await supabase
      .from('student_gamification')
      .update({
        total_points: supabase.raw('total_points + 10'),
        xp_progress: supabase.raw('xp_progress + 10')
      })
      .eq('student_id', progressData.studentId)
  }

  return { progress, message: 'Module progress tracked successfully' }
}

async function generateParentReport(supabase: any, studentId: string) {
  // Get comprehensive student data
  const { data: student } = await supabase
    .from('students')
    .select(`
      *,
      enrollments:student_enrollments(
        *,
        course:courses_master(*)
      ),
      recent_assessments:assessments(*),
      gamification:student_gamification(*)
    `)
    .eq('id', studentId)
    .single()

  // Get attendance data
  const attendanceRate = await supabase.rpc('calculate_attendance_rate', { student_uuid: studentId })
  const assignmentCompletion = await supabase.rpc('calculate_assignment_completion_rate', { student_uuid: studentId })

  // Get recent class sessions
  const { data: recentSessions } = await supabase
    .from('student_attendance')
    .select(`
      *,
      session:class_sessions(
        session_date,
        lesson_objective,
        big_question_explored,
        course:courses_master(course_name)
      )
    `)
    .eq('student_id', studentId)
    .order('session.session_date', { ascending: false })
    .limit(10)

  // Generate recommendations based on curriculum
  const recommendations = generateCurriculumRecommendations(student, attendanceRate.data, assignmentCompletion.data)

  const report = {
    student,
    performance: {
      attendanceRate: attendanceRate.data,
      assignmentCompletion: assignmentCompletion.data,
      averageScore: student.recent_assessments?.reduce((sum: number, a: any) => sum + (a.overall_score || 0), 0) / (student.recent_assessments?.length || 1),
      currentLevel: student.current_level,
      gamificationStats: student.gamification
    },
    recentActivity: recentSessions,
    recommendations,
    nextSteps: getNextCurriculumSteps(student.current_level)
  }

  // Log report generation
  await supabase
    .from('system_logs')
    .insert({
      user_type: 'system',
      action_type: 'parent_report_generated',
      table_affected: 'students',
      record_id: studentId
    })

  return { report }
}

async function getCambridgeYLEProgress(supabase: any, studentId: string) {
  const { data: yleAssessments, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .eq('assessment_type', 'cambridge_yle')
    .order('assessment_date', { ascending: false })

  if (error) throw error

  // Determine YLE level progression
  const progression = {
    starters: yleAssessments?.filter(a => a.cambridge_yle_result?.includes('Starters')) || [],
    movers: yleAssessments?.filter(a => a.cambridge_yle_result?.includes('Movers')) || [],
    flyers: yleAssessments?.filter(a => a.cambridge_yle_result?.includes('Flyers')) || []
  }

  return { yleAssessments, progression }
}

async function getIELTSMockResults(supabase: any, studentId: string) {
  const { data: ieltsResults, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .eq('assessment_type', 'ielts_practice')
    .order('assessment_date', { ascending: false })

  if (error) throw error

  // Calculate band progression
  const bandProgression = ieltsResults?.map(result => ({
    date: result.assessment_date,
    overall_band: result.ielts_band_score,
    listening: result.listening_score,
    reading: result.reading_score,
    writing: result.writing_score,
    speaking: result.speaking_score
  })) || []

  return { ieltsResults, bandProgression }
}

function getCurriculumProgression(currentLevel: string) {
  const progression = [
    'KG1', 'KG2', 'KG3',
    'Primary_1', 'Primary_2', 'Primary_3', 'Primary_4', 'Primary_5', 'Primary_6',
    'Secondary_1', 'Secondary_2', 'Secondary_3', 'Secondary_4',
    'CEFR_A1', 'CEFR_A2', 'CEFR_B1', 'CEFR_B2', 'CEFR_C1', 'CEFR_C2'
  ]
  
  const currentIndex = progression.indexOf(currentLevel)
  return {
    completed: progression.slice(0, currentIndex + 1),
    current: currentLevel,
    upcoming: progression.slice(currentIndex + 1, currentIndex + 4)
  }
}

function getNextLevel(currentLevel: string) {
  const progression = [
    'KG1', 'KG2', 'KG3',
    'Primary_1', 'Primary_2', 'Primary_3', 'Primary_4', 'Primary_5', 'Primary_6',
    'Secondary_1', 'Secondary_2', 'Secondary_3', 'Secondary_4',
    'CEFR_A1', 'CEFR_A2', 'CEFR_B1', 'CEFR_B2', 'CEFR_C1', 'CEFR_C2'
  ]
  
  const currentIndex = progression.indexOf(currentLevel)
  return currentIndex < progression.length - 1 ? progression[currentIndex + 1] : null
}

async function checkLevelAdvancement(supabase: any, studentId: string, currentLevel: string) {
  // Get recent assessments
  const { data: recentAssessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', studentId)
    .gte('assessment_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('assessment_date', { ascending: false })

  if (!recentAssessments || recentAssessments.length < 2) {
    return { canAdvance: false, reason: 'Insufficient recent assessments' }
  }

  const averageScore = recentAssessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / recentAssessments.length
  const consistentPerformance = recentAssessments.filter(a => (a.overall_score || 0) >= 75).length >= Math.ceil(recentAssessments.length * 0.8)

  // Get attendance and completion rates
  const attendanceRate = await supabase.rpc('calculate_attendance_rate', { student_uuid: studentId })
  const completionRate = await supabase.rpc('calculate_assignment_completion_rate', { student_uuid: studentId })

  const criteria = {
    minimumScore: currentLevel.includes('IELTS') ? 80 : 75,
    minimumAttendance: 85,
    minimumCompletion: 80
  }

  const canAdvance = averageScore >= criteria.minimumScore && 
                    consistentPerformance && 
                    attendanceRate.data >= criteria.minimumAttendance && 
                    completionRate.data >= criteria.minimumCompletion

  return {
    canAdvance,
    currentPerformance: {
      averageScore,
      attendanceRate: attendanceRate.data,
      completionRate: completionRate.data
    },
    criteria,
    nextLevel: getNextLevel(currentLevel)
  }
}

function generateCurriculumRecommendations(student: any, attendanceRate: number, completionRate: number) {
  const recommendations = []

  // Age-appropriate recommendations
  if (student.current_level.includes('KG')) {
    if (attendanceRate < 80) {
      recommendations.push('Regular attendance is crucial for phonics development at this age')
    }
    recommendations.push('Encourage reading picture books at home to support literacy development')
    recommendations.push('Practice phonics sounds through songs and games')
  } else if (student.current_level.includes('Primary')) {
    if (completionRate < 80) {
      recommendations.push('Complete homework assignments to reinforce classroom learning')
    }
    recommendations.push('Participate in Cambridge Young Learners English tests for motivation')
    recommendations.push('Engage in CLIL activities to develop critical thinking')
  } else if (student.current_level.includes('Secondary')) {
    recommendations.push('Focus on project-based learning and 21st-century skills')
    recommendations.push('Consider Cambridge PET/FCE preparation')
    recommendations.push('Develop entrepreneurship and leadership skills through English')
  } else if (student.current_level.includes('IELTS')) {
    recommendations.push('Practice all four IELTS skills regularly')
    recommendations.push('Take monthly mock tests to track progress')
    recommendations.push('Focus on academic vocabulary and essay writing')
  }

  return recommendations
}

function getNextCurriculumSteps(currentLevel: string) {
  const steps = []

  if (currentLevel.includes('KG')) {
    steps.push('Master all 44 phonics sounds')
    steps.push('Develop basic vocabulary (colors, numbers, family)')
    steps.push('Practice simple conversations')
  } else if (currentLevel.includes('Primary')) {
    steps.push('Strengthen grammar foundations')
    steps.push('Prepare for Cambridge Young Learners tests')
    steps.push('Develop reading fluency')
  } else if (currentLevel.includes('Secondary')) {
    steps.push('Enhance critical thinking skills')
    steps.push('Complete project-based assignments')
    steps.push('Prepare for Cambridge B1 Preliminary')
  } else if (currentLevel.includes('IELTS')) {
    steps.push('Achieve target IELTS band score')
    steps.push('Master academic writing skills')
    steps.push('Develop test-taking strategies')
  }

  return steps
}