import { useState } from 'react';
import { supabase } from '../lib/supabase';

export type EdgeFunctionPayload = Record<string, unknown>;

export const useSupabaseApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callEdgeFunction = async (
    functionName: string,
    payload: EdgeFunctionPayload
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload
      });

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Dashboard API calls
  const getUserDashboard = () => callEdgeFunction('get-user-dashboard', {});

  // Enrollment API calls
  const enrollInCourse = (courseId: string) => 
    callEdgeFunction('manage-enrollment', { action: 'enroll', courseId });

  const unenrollFromCourse = (courseId: string) => 
    callEdgeFunction('manage-enrollment', { action: 'unenroll', courseId });

  const getEnrollmentProgress = (courseId: string) => 
    callEdgeFunction('manage-enrollment', { action: 'get_progress', courseId });

  // Live Session API calls
  const createLiveSession = (sessionData: EdgeFunctionPayload) =>
    callEdgeFunction('manage-live-session', { action: 'create', sessionData });

  const joinLiveSession = (sessionId: string) => 
    callEdgeFunction('manage-live-session', { action: 'join', sessionId });

  const leaveLiveSession = (sessionId: string) => 
    callEdgeFunction('manage-live-session', { action: 'leave', sessionId });

  const startLiveSession = (sessionId: string) => 
    callEdgeFunction('manage-live-session', { action: 'start', sessionId });

  const endLiveSession = (sessionId: string) => 
    callEdgeFunction('manage-live-session', { action: 'end', sessionId });

  const getSessionAttendees = (sessionId: string) => 
    callEdgeFunction('manage-live-session', { action: 'get_attendees', sessionId });

  // Task Management API calls
  const createTask = (taskData: EdgeFunctionPayload) =>
    callEdgeFunction('manage-tasks', { action: 'create_task', taskData });

  const submitTask = (taskId: string, submissionData: EdgeFunctionPayload) =>
    callEdgeFunction('manage-tasks', { action: 'submit_task', taskId, submissionData });

  const gradeSubmission = (submissionData: EdgeFunctionPayload) =>
    callEdgeFunction('manage-tasks', { action: 'grade_submission', submissionData });

  const getStudentTasks = () => 
    callEdgeFunction('manage-tasks', { action: 'get_student_tasks' });

  const getInstructorTasks = () => 
    callEdgeFunction('manage-tasks', { action: 'get_instructor_tasks' });

  // Gamification API calls
  const awardPoints = (points: number, reason: string) => 
    callEdgeFunction('gamification', { action: 'award_points', points, reason });

  const awardBadge = (badgeName: string) => 
    callEdgeFunction('gamification', { action: 'award_badge', badgeName });

  const updateStreak = () => 
    callEdgeFunction('gamification', { action: 'update_streak' });

  const getLeaderboard = () => 
    callEdgeFunction('gamification', { action: 'get_leaderboard' });

  const getUserStats = () => 
    callEdgeFunction('gamification', { action: 'get_user_stats' });

  // Student Management API calls
  const createStudent = (studentData: EdgeFunctionPayload) =>
    callEdgeFunction('student-management', { action: 'create_student', studentData });

  const updateStudent = (
    studentId: string,
    studentData: EdgeFunctionPayload
  ) =>
    callEdgeFunction('student-management', { action: 'update_student', studentId, studentData });

  const getStudentDetails = (studentId: string) =>
    callEdgeFunction('student-management', { action: 'get_student_details', studentId });

  const getAllStudents = () =>
    callEdgeFunction('student-management', { action: 'get_all_students' });

  const enrollStudentInCourse = (studentId: string, courseId: string) =>
    callEdgeFunction('student-management', { action: 'enroll_student', studentData: { studentId, courseId } });

  const getStudentProgress = (studentId: string) =>
    callEdgeFunction('student-management', { action: 'get_student_progress', studentId });

  // Teacher Management API calls
  const teacherCheckIn = (attendanceData: EdgeFunctionPayload) =>
    callEdgeFunction('teacher-management', { action: 'check_in', attendanceData });

  const teacherCheckOut = (attendanceData: EdgeFunctionPayload) =>
    callEdgeFunction('teacher-management', { action: 'check_out', attendanceData });

  const getTeacherSchedule = (teacherId?: string) =>
    callEdgeFunction('teacher-management', { action: 'get_teacher_schedule', teacherId });

  const getTeacherStudents = (teacherId?: string) =>
    callEdgeFunction('teacher-management', { action: 'get_teacher_students', teacherId });

  const recordClassSession = (sessionData: EdgeFunctionPayload) =>
    callEdgeFunction('teacher-management', { action: 'record_class_session', sessionData });

  const getTeacherPerformance = (teacherId?: string) =>
    callEdgeFunction('teacher-management', { action: 'get_teacher_performance', teacherId });

  const updateTeacherProfile = (teacherData: EdgeFunctionPayload) =>
    callEdgeFunction('teacher-management', { action: 'update_teacher_profile', teacherData });

  // Assessment Management API calls
  const createAssessment = (assessmentData: EdgeFunctionPayload) =>
    callEdgeFunction('assessment-management', { action: 'create_assessment', assessmentData });

  const getStudentAssessments = (studentId: string) =>
    callEdgeFunction('assessment-management', { action: 'get_student_assessments', studentId });

  const getCourseAssessments = (courseId: string) =>
    callEdgeFunction('assessment-management', { action: 'get_course_assessments', courseId });

  const updateAssessment = (assessmentData: EdgeFunctionPayload) =>
    callEdgeFunction('assessment-management', { action: 'update_assessment', assessmentData });

  const generateProgressReport = (studentId: string) =>
    callEdgeFunction('assessment-management', { action: 'generate_progress_report', studentId });

  const checkLevelAdvancement = (studentId: string) =>
    callEdgeFunction('assessment-management', { action: 'check_level_advancement', studentId });

  // Parent Portal API calls
  const getParentDashboard = () =>
    callEdgeFunction('parent-portal', { action: 'get_parent_dashboard' });

  const getChildProgress = (studentId: string) =>
    callEdgeFunction('parent-portal', { action: 'get_child_progress', studentId });

  const getChildAttendance = (studentId: string) =>
    callEdgeFunction('parent-portal', { action: 'get_child_attendance', studentId });

  const getPaymentHistory = () =>
    callEdgeFunction('parent-portal', { action: 'get_payment_history' });

  const sendMessageToTeacher = (messageData: EdgeFunctionPayload) =>
    callEdgeFunction('parent-portal', { action: 'send_message_to_teacher', messageData });

  const updateParentPreferences = (preferences: EdgeFunctionPayload) =>
    callEdgeFunction('parent-portal', { action: 'update_parent_preferences', preferences });

  // Curriculum Management API calls
  const getCurriculumLevels = () =>
    callEdgeFunction('curriculum-management', { action: 'get_curriculum_levels' });

  const getCourseMaterials = () =>
    callEdgeFunction('curriculum-management', { action: 'get_course_materials' });

  const createLessonPlan = (planData: EdgeFunctionPayload) =>
    callEdgeFunction('curriculum-management', { action: 'create_lesson_plan', data: planData });

  const getLessonPlans = (courseId: string) =>
    callEdgeFunction('curriculum-management', { action: 'get_lesson_plans', data: { courseId } });

  const conductPlacementTest = (testData: EdgeFunctionPayload) =>
    callEdgeFunction('curriculum-management', { action: 'conduct_placement_test', data: testData });

  const getStudentCurriculumProgress = (studentId: string) =>
    callEdgeFunction('curriculum-management', { action: 'get_student_curriculum_progress', data: { studentId } });

  const generateParentReport = (studentId: string) =>
    callEdgeFunction('curriculum-management', { action: 'generate_parent_report', data: { studentId } });

  // Super Admin Task Management API calls
  const createSuperAdminTask = (taskData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'create_task', taskData });

  const assignTaskToEmployees = (assignmentData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'assign_task_to_employees', assignmentData });

  const assignTaskToStudents = (assignmentData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'assign_task_to_students', assignmentData });

  const getAllTasks = () =>
    callEdgeFunction('super-admin-tasks', { action: 'get_all_tasks' });

  const getEmployees = () =>
    callEdgeFunction('super-admin-tasks', { action: 'get_employees' });

  const getStudents = () =>
    callEdgeFunction('super-admin-tasks', { action: 'get_students' });

  const createEmployee = (employeeData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'create_employee', employeeData });

  const updateTaskStatus = (taskData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'update_task_status', taskData });

  const getTaskAnalytics = () =>
    callEdgeFunction('super-admin-tasks', { action: 'get_task_analytics' });

  const bulkAssignTasks = (assignmentData: EdgeFunctionPayload) =>
    callEdgeFunction('super-admin-tasks', { action: 'bulk_assign_tasks', assignmentData });

  const getDepartmentPerformance = () =>
    callEdgeFunction('super-admin-tasks', { action: 'get_department_performance' });

  return {
    loading,
    error,
    // Dashboard
    getUserDashboard,
    // Enrollment
    enrollInCourse,
    unenrollFromCourse,
    getEnrollmentProgress,
    // Live Sessions
    createLiveSession,
    joinLiveSession,
    leaveLiveSession,
    startLiveSession,
    endLiveSession,
    getSessionAttendees,
    // Tasks
    createTask,
    submitTask,
    gradeSubmission,
    getStudentTasks,
    getInstructorTasks,
    // Gamification
    awardPoints,
    awardBadge,
    updateStreak,
    getLeaderboard,
    getUserStats,
    // Student Management
    createStudent,
    updateStudent,
    getStudentDetails,
    getAllStudents,
    enrollStudentInCourse,
    getStudentProgress,
    // Teacher Management
    teacherCheckIn,
    teacherCheckOut,
    getTeacherSchedule,
    getTeacherStudents,
    recordClassSession,
    getTeacherPerformance,
    updateTeacherProfile,
    // Assessment Management
    createAssessment,
    getStudentAssessments,
    getCourseAssessments,
    updateAssessment,
    generateProgressReport,
    checkLevelAdvancement,
    // Parent Portal
    getParentDashboard,
    getChildProgress,
    getChildAttendance,
    getPaymentHistory,
    sendMessageToTeacher,
    updateParentPreferences,
    // Curriculum Management
    getCurriculumLevels,
    getCourseMaterials,
    createLessonPlan,
    getLessonPlans,
    conductPlacementTest,
    getStudentCurriculumProgress,
    generateParentReport,
    // Super Admin Task Management
    createSuperAdminTask,
    assignTaskToEmployees,
    assignTaskToStudents,
    getAllTasks,
    getEmployees,
    getStudents,
    createEmployee,
    updateTaskStatus,
    getTaskAnalytics,
    bulkAssignTasks,
    getDepartmentPerformance,
    callEdgeFunction,
  };
};