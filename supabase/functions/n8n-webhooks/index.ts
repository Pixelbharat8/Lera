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
    )

    const url = new URL(req.url)
    const webhookType = url.pathname.split('/')[2] // Get webhook type from path

    const payload = await req.json()

    let result = {}

    switch (webhookType) {
      case 'student-enrolled':
        result = await handleStudentEnrollment(supabaseClient, payload)
        break
      case 'payment-received':
        result = await handlePaymentReceived(supabaseClient, payload)
        break
      case 'assignment-submitted':
        result = await handleAssignmentSubmitted(supabaseClient, payload)
        break
      case 'course-completed':
        result = await handleCourseCompleted(supabaseClient, payload)
        break
      case 'student-absent':
        result = await handleStudentAbsent(supabaseClient, payload)
        break
      case 'low-performance':
        result = await handleLowPerformance(supabaseClient, payload)
        break
      case 'certificate-issued':
        result = await handleCertificateIssued(supabaseClient, payload)
        break
      case 'teacher-evaluation':
        result = await handleTeacherEvaluation(supabaseClient, payload)
        break
      case 'live-class-reminder':
        result = await handleLiveClassReminder(supabaseClient, payload)
        break
      case 'monthly-report':
        result = await handleMonthlyReport(supabaseClient, payload)
        break
      default:
        throw new Error('Unknown webhook type')
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

async function handleStudentEnrollment(supabase: any, payload: any) {
  const { studentId, courseId, enrollmentData } = payload

  // Send welcome email workflow
  await triggerN8NWorkflow('welcome-email', {
    studentId,
    courseId,
    studentEmail: enrollmentData.email,
    courseName: enrollmentData.courseName
  })

  // Notify teacher workflow
  await triggerN8NWorkflow('notify-teacher-new-student', {
    teacherId: enrollmentData.instructorId,
    studentName: enrollmentData.studentName,
    courseName: enrollmentData.courseName
  })

  // Create study schedule workflow
  await triggerN8NWorkflow('create-study-schedule', {
    studentId,
    courseId,
    courseDuration: enrollmentData.duration
  })

  // Log enrollment analytics
  await supabase
    .from('workflow_logs')
    .insert({
      workflow_type: 'student_enrollment',
      trigger_data: payload,
      executed_at: new Date().toISOString()
    })

  return { message: 'Student enrollment workflows triggered', workflows: 3 }
}

async function handlePaymentReceived(supabase: any, payload: any) {
  const { paymentId, studentId, amount, courseId } = payload

  // Send payment confirmation workflow
  await triggerN8NWorkflow('payment-confirmation', {
    paymentId,
    studentId,
    amount,
    receiptUrl: payload.receiptUrl
  })

  // Update CRM workflow
  await triggerN8NWorkflow('update-crm-payment', {
    studentId,
    paymentAmount: amount,
    paymentDate: new Date().toISOString()
  })

  // Trigger course access workflow
  await triggerN8NWorkflow('grant-course-access', {
    studentId,
    courseId,
    accessLevel: 'full'
  })

  return { message: 'Payment workflows triggered', workflows: 3 }
}

async function handleAssignmentSubmitted(supabase: any, payload: any) {
  const { assignmentId, studentId, teacherId, submissionData } = payload

  // Notify teacher workflow
  await triggerN8NWorkflow('notify-teacher-submission', {
    teacherId,
    studentId,
    assignmentTitle: submissionData.title,
    submissionUrl: submissionData.url
  })

  // Auto-grade workflow (if applicable)
  if (submissionData.type === 'quiz') {
    await triggerN8NWorkflow('auto-grade-quiz', {
      assignmentId,
      studentId,
      answers: submissionData.answers
    })
  }

  // Update progress tracking workflow
  await triggerN8NWorkflow('update-progress-tracking', {
    studentId,
    courseId: submissionData.courseId,
    completedItem: assignmentId
  })

  return { message: 'Assignment submission workflows triggered', workflows: 3 }
}

async function handleCourseCompleted(supabase: any, payload: any) {
  const { studentId, courseId, completionData } = payload

  // Generate certificate workflow
  await triggerN8NWorkflow('generate-certificate', {
    studentId,
    courseId,
    completionDate: completionData.date,
    finalGrade: completionData.grade
  })

  // Send congratulations workflow
  await triggerN8NWorkflow('send-congratulations', {
    studentId,
    courseName: completionData.courseName,
    achievement: 'course_completion'
  })

  // Update gamification workflow
  await triggerN8NWorkflow('award-completion-badge', {
    studentId,
    courseId,
    badgeType: 'course_completer'
  })

  // Recommend next course workflow
  await triggerN8NWorkflow('recommend-next-course', {
    studentId,
    completedCourseId: courseId,
    studentLevel: completionData.level
  })

  return { message: 'Course completion workflows triggered', workflows: 4 }
}

async function handleStudentAbsent(supabase: any, payload: any) {
  const { studentId, classId, absenceData } = payload

  // Send absence notification workflow
  await triggerN8NWorkflow('notify-absence', {
    studentId,
    parentContact: absenceData.parentEmail,
    className: absenceData.className,
    date: absenceData.date
  })

  // Check attendance pattern workflow
  await triggerN8NWorkflow('check-attendance-pattern', {
    studentId,
    recentAbsences: absenceData.recentCount
  })

  return { message: 'Student absence workflows triggered', workflows: 2 }
}

async function handleLowPerformance(supabase: any, payload: any) {
  const { studentId, performanceData } = payload

  // Alert teacher workflow
  await triggerN8NWorkflow('alert-teacher-performance', {
    teacherId: performanceData.teacherId,
    studentId,
    performance: performanceData.scores
  })

  // Schedule intervention workflow
  await triggerN8NWorkflow('schedule-intervention', {
    studentId,
    interventionType: 'academic_support',
    urgency: performanceData.urgency
  })

  // Notify parents workflow
  await triggerN8NWorkflow('notify-parents-performance', {
    studentId,
    parentContact: performanceData.parentEmail,
    concerns: performanceData.concerns
  })

  return { message: 'Low performance workflows triggered', workflows: 3 }
}

async function handleCertificateIssued(supabase: any, payload: any) {
  const { certificateId, studentId, certificateData } = payload

  // Email certificate workflow
  await triggerN8NWorkflow('email-certificate', {
    studentId,
    certificateUrl: certificateData.url,
    certificateType: certificateData.type
  })

  // Update LinkedIn integration workflow
  await triggerN8NWorkflow('linkedin-certificate', {
    studentId,
    certificateTitle: certificateData.title,
    issueDate: certificateData.date
  })

  // Social media sharing workflow
  await triggerN8NWorkflow('social-media-certificate', {
    studentId,
    achievement: certificateData.title,
    academyBranding: true
  })

  return { message: 'Certificate issuance workflows triggered', workflows: 3 }
}

async function handleTeacherEvaluation(supabase: any, payload: any) {
  const { teacherId, evaluationData } = payload

  // HR notification workflow
  await triggerN8NWorkflow('hr-evaluation-notification', {
    teacherId,
    evaluationScore: evaluationData.score,
    evaluationPeriod: evaluationData.period
  })

  // Performance improvement workflow (if needed)
  if (evaluationData.score < 70) {
    await triggerN8NWorkflow('performance-improvement-plan', {
      teacherId,
      areas: evaluationData.improvementAreas,
      timeline: '90_days'
    })
  }

  return { message: 'Teacher evaluation workflows triggered' }
}

async function handleLiveClassReminder(supabase: any, payload: any) {
  const { classId, reminderData } = payload

  // Send email reminders workflow
  await triggerN8NWorkflow('email-class-reminder', {
    classId,
    students: reminderData.enrolledStudents,
    classTime: reminderData.startTime
  })

  // Send SMS reminders workflow
  await triggerN8NWorkflow('sms-class-reminder', {
    classId,
    phoneNumbers: reminderData.phoneNumbers,
    classDetails: reminderData.details
  })

  // Prepare classroom workflow
  await triggerN8NWorkflow('prepare-classroom', {
    classId,
    roomId: reminderData.roomId,
    materials: reminderData.materials
  })

  return { message: 'Live class reminder workflows triggered', workflows: 3 }
}

async function handleMonthlyReport(supabase: any, payload: any) {
  const { reportType, reportData } = payload

  // Generate analytics report workflow
  await triggerN8NWorkflow('generate-analytics-report', {
    reportType,
    period: reportData.period,
    metrics: reportData.metrics
  })

  // Distribute reports workflow
  await triggerN8NWorkflow('distribute-monthly-reports', {
    recipients: reportData.recipients,
    reportUrl: reportData.url
  })

  // Schedule next report workflow
  await triggerN8NWorkflow('schedule-next-report', {
    reportType,
    nextDue: reportData.nextDueDate
  })

  return { message: 'Monthly report workflows triggered', workflows: 3 }
}

async function triggerN8NWorkflow(workflowName: string, data: any) {
  // This would integrate with your n8n instance
  // For now, we'll log the workflow trigger
  console.log(`Triggering n8n workflow: ${workflowName}`, data)
  
  // In production, this would make an HTTP request to your n8n webhook
  // const response = await fetch(`${N8N_WEBHOOK_URL}/${workflowName}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // })
  
  return { triggered: true, workflow: workflowName, data }
}