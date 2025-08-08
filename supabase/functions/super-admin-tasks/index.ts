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

    const { action, taskData, assignmentData, employeeData } = await req.json()

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

    // Check if user is super admin
    const { data: userRole, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role_type')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (roleError || userRole?.role_type !== 'super_admin') {
      return new Response(
        JSON.stringify({ error: 'Super admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let result = {}

    switch (action) {
      case 'create_task':
        result = await createTask(supabaseClient, user.id, taskData)
        break
      case 'assign_task_to_employees':
        result = await assignTaskToEmployees(supabaseClient, user.id, assignmentData)
        break
      case 'assign_task_to_students':
        result = await assignTaskToStudents(supabaseClient, user.id, assignmentData)
        break
      case 'get_all_tasks':
        result = await getAllTasks(supabaseClient)
        break
      case 'get_employees':
        result = await getEmployees(supabaseClient)
        break
      case 'get_students':
        result = await getStudents(supabaseClient)
        break
      case 'create_employee':
        result = await createEmployee(supabaseClient, user.id, employeeData)
        break
      case 'update_task_status':
        result = await updateTaskStatus(supabaseClient, taskData)
        break
      case 'get_task_analytics':
        result = await getTaskAnalytics(supabaseClient)
        break
      case 'bulk_assign_tasks':
        result = await bulkAssignTasks(supabaseClient, user.id, assignmentData)
        break
      case 'get_department_performance':
        result = await getDepartmentPerformance(supabaseClient)
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

async function createTask(supabase: any, userId: string, taskData: any) {
  const { data: task, error } = await supabase
    .from('tasks')
    .insert({
      ...taskData,
      created_by: userId
    })
    .select()
    .single()

  if (error) throw error

  return { task, message: 'Task created successfully' }
}

async function assignTaskToEmployees(supabase: any, userId: string, assignmentData: any) {
  const { taskId, employeeIds, notes } = assignmentData

  const assignments = employeeIds.map((employeeId: string) => ({
    task_id: taskId,
    assignee_id: employeeId,
    assignee_type: 'employee',
    assigned_by: userId,
    notes
  }))

  const { data, error } = await supabase
    .from('task_assignments')
    .insert(assignments)
    .select(`
      *,
      assignee:company_employees!assignee_id(full_name, email, department),
      task:tasks(title, description)
    `)

  if (error) throw error

  // Send notifications to assigned employees
  const notifications = data.map((assignment: any) => ({
    user_id: assignment.assignee_id,
    title: 'New Task Assigned',
    message: `You have been assigned a new task: ${assignment.task.title}`,
    type: 'info',
    action_url: `/employee/tasks/${assignment.id}`
  }))

  await supabase
    .from('notifications')
    .insert(notifications)

  return { assignments: data, message: `Task assigned to ${employeeIds.length} employees` }
}

async function assignTaskToStudents(supabase: any, userId: string, assignmentData: any) {
  const { taskId, studentIds, notes } = assignmentData

  const assignments = studentIds.map((studentId: string) => ({
    task_id: taskId,
    assignee_id: studentId,
    assignee_type: 'student',
    assigned_by: userId,
    notes
  }))

  const { data, error } = await supabase
    .from('task_assignments')
    .insert(assignments)
    .select(`
      *,
      assignee:profiles!assignee_id(full_name, avatar_url),
      task:tasks(title, description)
    `)

  if (error) throw error

  // Send notifications to assigned students
  const notifications = data.map((assignment: any) => ({
    user_id: assignment.assignee_id,
    title: 'New Assignment',
    message: `You have been assigned: ${assignment.task.title}`,
    type: 'info',
    action_url: `/student/assignments/${assignment.id}`
  }))

  await supabase
    .from('notifications')
    .insert(notifications)

  return { assignments: data, message: `Task assigned to ${studentIds.length} students` }
}

async function getAllTasks(supabase: any) {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select(`
      *,
      category:task_categories(name, color_code, icon),
      creator:profiles!created_by(full_name),
      assignments:task_assignments(
        *,
        assignee:profiles!assignee_id(full_name, avatar_url),
        submissions:task_submissions(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return { tasks }
}

async function getEmployees(supabase: any) {
  const { data: employees, error } = await supabase
    .from('company_employees')
    .select(`
      *,
      user:profiles!user_id(full_name, avatar_url),
      manager:company_employees!manager_id(full_name),
      assigned_tasks:task_assignments(
        id,
        status,
        task:tasks(title, priority)
      )
    `)
    .eq('is_active', true)
    .order('full_name')

  if (error) throw error

  return { employees }
}

async function getStudents(supabase: any) {
  const { data: students, error } = await supabase
    .from('profiles')
    .select(`
      *,
      enrollments:enrollments(
        course:courses(title)
      ),
      assigned_tasks:task_assignments(
        id,
        status,
        task:tasks(title, priority)
      )
    `)
    .eq('role', 'student')
    .order('full_name')

  if (error) throw error

  return { students }
}

async function createEmployee(supabase: any, userId: string, employeeData: any) {
  // First create user account if needed
  let userAccount = null
  if (employeeData.createAccount) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: employeeData.email,
      password: employeeData.temporaryPassword,
      email_confirm: true
    })
    if (error) throw error
    userAccount = data.user
  }

  // Create employee profile
  const { data: employee, error } = await supabase
    .from('company_employees')
    .insert({
      ...employeeData,
      user_id: userAccount?.id,
      employee_id: `EMP${Date.now()}`
    })
    .select()
    .single()

  if (error) throw error

  // Create user role
  if (userAccount) {
    await supabase
      .from('user_roles')
      .insert({
        user_id: userAccount.id,
        role_type: employeeData.role_type || 'employee',
        department: employeeData.department,
        assigned_by: userId
      })
  }

  return { employee, message: 'Employee created successfully' }
}

async function updateTaskStatus(supabase: any, taskData: any) {
  const { taskId, status, notes } = taskData

  const { data: task, error } = await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error

  // Log status change
  await supabase
    .from('task_comments')
    .insert({
      task_id: taskId,
      user_id: (await supabase.auth.getUser()).data.user.id,
      content: `Task status changed to: ${status}${notes ? `. Notes: ${notes}` : ''}`,
      is_internal: true
    })

  return { task, message: 'Task status updated successfully' }
}

async function getTaskAnalytics(supabase: any) {
  // Get task statistics
  const { data: taskStats } = await supabase
    .from('tasks')
    .select('status, priority, department, task_type')

  const { data: assignmentStats } = await supabase
    .from('task_assignments')
    .select('status, assignee_type, progress_percentage')

  const { data: submissionStats } = await supabase
    .from('task_submissions')
    .select('submitted_at')
    .gte('submitted_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  // Calculate analytics
  const analytics = {
    totalTasks: taskStats?.length || 0,
    tasksByStatus: groupBy(taskStats || [], 'status'),
    tasksByPriority: groupBy(taskStats || [], 'priority'),
    tasksByDepartment: groupBy(taskStats || [], 'department'),
    assignmentsByType: groupBy(assignmentStats || [], 'assignee_type'),
    averageProgress: assignmentStats?.reduce((sum, a) => sum + (a.progress_percentage || 0), 0) / (assignmentStats?.length || 1),
    submissionsThisMonth: submissionStats?.length || 0,
    completionRate: (assignmentStats?.filter(a => a.status === 'completed').length || 0) / (assignmentStats?.length || 1) * 100
  }

  return { analytics }
}

async function bulkAssignTasks(supabase: any, userId: string, assignmentData: any) {
  const { taskIds, assigneeIds, assigneeType, notes } = assignmentData

  const assignments = []
  for (const taskId of taskIds) {
    for (const assigneeId of assigneeIds) {
      assignments.push({
        task_id: taskId,
        assignee_id: assigneeId,
        assignee_type: assigneeType,
        assigned_by: userId,
        notes
      })
    }
  }

  const { data, error } = await supabase
    .from('task_assignments')
    .insert(assignments)
    .select()

  if (error) throw error

  return { 
    assignments: data, 
    message: `${assignments.length} task assignments created successfully` 
  }
}

async function getDepartmentPerformance(supabase: any) {
  const { data: departments } = await supabase
    .from('company_employees')
    .select('department')
    .eq('is_active', true)

  const uniqueDepartments = [...new Set(departments?.map(d => d.department) || [])]

  const performance = []
  for (const dept of uniqueDepartments) {
    const { data: deptTasks } = await supabase
      .from('task_assignments')
      .select(`
        *,
        assignee:company_employees!assignee_id(department),
        task:tasks(priority)
      `)
      .eq('assignee.department', dept)

    const completed = deptTasks?.filter(t => t.status === 'completed').length || 0
    const total = deptTasks?.length || 0
    const avgProgress = deptTasks?.reduce((sum, t) => sum + (t.progress_percentage || 0), 0) / total

    performance.push({
      department: dept,
      totalTasks: total,
      completedTasks: completed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageProgress: avgProgress || 0
    })
  }

  return { performance }
}

function groupBy(array: any[], key: string) {
  return array.reduce((groups, item) => {
    const group = item[key] || 'Unknown'
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}