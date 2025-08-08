import { supabase } from '../../lib/supabase';

// Workflow trigger helper functions
export class WorkflowTriggers {
  private static async triggerWorkflow(eventType: string, eventData: any) {
    try {
      const { data, error } = await supabase.functions.invoke('n8n-webhooks', {
        body: { eventType, eventData }
      });

      if (error) {
        console.error('Error triggering workflow:', error);
      }

      return data;
    } catch (error) {
      console.error('Error triggering workflow:', error);
    }
  }

  // Student Management Triggers
  static async onStudentEnrolled(studentId: string, courseId: string, enrollmentData: any) {
    return this.triggerWorkflow('student-enrolled', {
      studentId,
      courseId,
      enrollmentData: {
        ...enrollmentData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onStudentCompleted(studentId: string, courseId: string, completionData: any) {
    return this.triggerWorkflow('course-completed', {
      studentId,
      courseId,
      completionData: {
        ...completionData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onStudentAbsent(studentId: string, classId: string, absenceData: any) {
    return this.triggerWorkflow('student-absent', {
      studentId,
      classId,
      absenceData: {
        ...absenceData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Academic Triggers
  static async onAssignmentSubmitted(assignmentId: string, studentId: string, submissionData: any) {
    return this.triggerWorkflow('assignment-submitted', {
      assignmentId,
      studentId,
      submissionData: {
        ...submissionData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onLowPerformance(studentId: string, performanceData: any) {
    return this.triggerWorkflow('low-performance', {
      studentId,
      performanceData: {
        ...performanceData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onCertificateIssued(certificateId: string, studentId: string, certificateData: any) {
    return this.triggerWorkflow('certificate-issued', {
      certificateId,
      studentId,
      certificateData: {
        ...certificateData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Payment Triggers
  static async onPaymentReceived(paymentId: string, studentId: string, paymentData: any) {
    return this.triggerWorkflow('payment-received', {
      paymentId,
      studentId,
      paymentData: {
        ...paymentData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onPaymentFailed(paymentId: string, studentId: string, failureData: any) {
    return this.triggerWorkflow('payment-failed', {
      paymentId,
      studentId,
      failureData: {
        ...failureData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Teacher Management Triggers
  static async onTeacherEvaluation(teacherId: string, evaluationData: any) {
    return this.triggerWorkflow('teacher-evaluation', {
      teacherId,
      evaluationData: {
        ...evaluationData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onTeacherAbsent(teacherId: string, absenceData: any) {
    return this.triggerWorkflow('teacher-absent', {
      teacherId,
      absenceData: {
        ...absenceData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Live Class Triggers
  static async onLiveClassStarting(classId: string, classData: any) {
    return this.triggerWorkflow('live-class-reminder', {
      classId,
      reminderData: {
        ...classData,
        timestamp: new Date().toISOString(),
        reminderTime: '1_hour_before'
      }
    });
  }

  static async onLiveClassEnded(classId: string, sessionData: any) {
    return this.triggerWorkflow('live-class-ended', {
      classId,
      sessionData: {
        ...sessionData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Reporting Triggers
  static async onMonthlyReport(reportType: string, reportData: any) {
    return this.triggerWorkflow('monthly-report', {
      reportType,
      reportData: {
        ...reportData,
        timestamp: new Date().toISOString()
      }
    });
  }

  static async onWeeklyDigest(digestData: any) {
    return this.triggerWorkflow('weekly-digest', {
      digestData: {
        ...digestData,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Custom Event Trigger
  static async triggerCustomEvent(eventName: string, eventData: any) {
    return this.triggerWorkflow(eventName, {
      customEvent: true,
      eventName,
      eventData: {
        ...eventData,
        timestamp: new Date().toISOString()
      }
    });
  }
}

// React Hook for easy trigger usage
export const useWorkflowTriggers = () => {
  return {
    triggerStudentEnrolled: WorkflowTriggers.onStudentEnrolled,
    triggerStudentCompleted: WorkflowTriggers.onStudentCompleted,
    triggerStudentAbsent: WorkflowTriggers.onStudentAbsent,
    triggerAssignmentSubmitted: WorkflowTriggers.onAssignmentSubmitted,
    triggerLowPerformance: WorkflowTriggers.onLowPerformance,
    triggerCertificateIssued: WorkflowTriggers.onCertificateIssued,
    triggerPaymentReceived: WorkflowTriggers.onPaymentReceived,
    triggerPaymentFailed: WorkflowTriggers.onPaymentFailed,
    triggerTeacherEvaluation: WorkflowTriggers.onTeacherEvaluation,
    triggerTeacherAbsent: WorkflowTriggers.onTeacherAbsent,
    triggerLiveClassStarting: WorkflowTriggers.onLiveClassStarting,
    triggerLiveClassEnded: WorkflowTriggers.onLiveClassEnded,
    triggerMonthlyReport: WorkflowTriggers.onMonthlyReport,
    triggerWeeklyDigest: WorkflowTriggers.onWeeklyDigest,
    triggerCustomEvent: WorkflowTriggers.triggerCustomEvent
  };
};