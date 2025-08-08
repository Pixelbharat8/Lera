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

    const { workflowId, triggerData } = await req.json()

    // Get workflow template
    const { data: workflow, error: workflowError } = await supabaseClient
      .from('workflow_templates')
      .select('*')
      .eq('id', workflowId)
      .single()

    if (workflowError) {
      throw workflowError
    }

    if (!workflow.isActive) {
      throw new Error('Workflow is not active')
    }

    // Create execution record
    const executionId = crypto.randomUUID()
    const { data: execution, error: executionError } = await supabaseClient
      .from('workflow_executions')
      .insert({
        id: executionId,
        workflow_id: workflowId,
        status: 'running',
        started_at: new Date().toISOString(),
        trigger_data: triggerData,
        logs: []
      })
      .select()
      .single()

    if (executionError) {
      throw executionError
    }

    const logs: any[] = []
    let currentStatus = 'running'
    let error = null

    try {
      // Execute each action in order
      for (const action of workflow.actions.sort((a: any, b: any) => a.order - b.order)) {
        logs.push({
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Starting action: ${action.name}`,
          actionId: action.id
        })

        const actionResult = await executeAction(supabaseClient, action, triggerData, execution)
        
        logs.push({
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Completed action: ${action.name}`,
          actionId: action.id,
          result: actionResult
        })
      }

      currentStatus = 'completed'
      logs.push({
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Workflow execution completed successfully'
      })

    } catch (executionError) {
      currentStatus = 'failed'
      error = executionError.message
      logs.push({
        timestamp: new Date().toISOString(),
        level: 'error',
        message: `Workflow execution failed: ${executionError.message}`
      })
    }

    // Update execution record
    await supabaseClient
      .from('workflow_executions')
      .update({
        status: currentStatus,
        completed_at: new Date().toISOString(),
        error: error,
        logs: logs
      })
      .eq('id', executionId)

    return new Response(
      JSON.stringify({
        executionId,
        status: currentStatus,
        logsCount: logs.length,
        error
      }),
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

async function executeAction(supabase: any, action: any, triggerData: any, execution: any) {
  switch (action.type) {
    case 'email':
      return await executeEmailAction(supabase, action, triggerData)
    case 'sms':
      return await executeSMSAction(supabase, action, triggerData)
    case 'notification':
      return await executeNotificationAction(supabase, action, triggerData)
    case 'webhook':
      return await executeWebhookAction(action, triggerData)
    case 'database':
      return await executeDatabaseAction(supabase, action, triggerData)
    case 'integration':
      return await executeIntegrationAction(action, triggerData)
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

async function executeEmailAction(supabase: any, action: any, triggerData: any) {
  // Get email template and configuration
  const { template, recipient, subject, variables } = action.config

  // In a real implementation, this would integrate with your email service
  // For now, we'll create a notification record
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      recipient_id: triggerData.studentId || triggerData.teacherId,
      recipient_type: 'user',
      title: subject || 'Automated Email',
      message: `Email sent via workflow: ${template}`,
      type: 'info',
      delivery_method: 'email'
    })

  if (error) throw error

  return { emailSent: true, notificationId: data.id, template }
}

async function executeSMSAction(supabase: any, action: any, triggerData: any) {
  // Get SMS configuration
  const { message, phoneNumber } = action.config

  // In a real implementation, this would integrate with SMS service (Twilio, etc.)
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      recipient_id: triggerData.studentId || triggerData.teacherId,
      recipient_type: 'user',
      title: 'SMS Notification',
      message: message,
      type: 'info',
      delivery_method: 'sms'
    })

  if (error) throw error

  return { smsSent: true, notificationId: data.id }
}

async function executeNotificationAction(supabase: any, action: any, triggerData: any) {
  const { title, message, type, actionUrl } = action.config

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      recipient_id: triggerData.studentId || triggerData.teacherId,
      recipient_type: 'user',
      title: title || 'Workflow Notification',
      message: message || 'Automated notification from workflow',
      type: type || 'info',
      action_url: actionUrl
    })

  if (error) throw error

  return { notificationCreated: true, notificationId: data.id }
}

async function executeWebhookAction(action: any, triggerData: any) {
  const { url, method, headers, body } = action.config

  const response = await fetch(url, {
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({ ...triggerData, ...body })
  })

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`)
  }

  const result = await response.text()
  return { webhookCalled: true, status: response.status, response: result }
}

async function executeDatabaseAction(supabase: any, action: any, triggerData: any) {
  const { table, operation, data, conditions } = action.config

  let result
  switch (operation) {
    case 'insert':
      const { data: insertData, error: insertError } = await supabase
        .from(table)
        .insert({ ...data, ...triggerData })
      if (insertError) throw insertError
      result = { operation: 'insert', data: insertData }
      break

    case 'update':
      const { data: updateData, error: updateError } = await supabase
        .from(table)
        .update(data)
        .match(conditions)
      if (updateError) throw updateError
      result = { operation: 'update', data: updateData }
      break

    case 'select':
      const { data: selectData, error: selectError } = await supabase
        .from(table)
        .select('*')
        .match(conditions)
      if (selectError) throw selectError
      result = { operation: 'select', data: selectData }
      break

    default:
      throw new Error(`Unknown database operation: ${operation}`)
  }

  return result
}

async function executeIntegrationAction(action: any, triggerData: any) {
  const { integration, method, data } = action.config

  // This would integrate with various external services
  // For demonstration, we'll simulate the integration call
  
  switch (integration) {
    case 'salesforce':
      return { integration: 'salesforce', method, result: 'simulated_success' }
    case 'hubspot':
      return { integration: 'hubspot', method, result: 'simulated_success' }
    case 'mailchimp':
      return { integration: 'mailchimp', method, result: 'simulated_success' }
    case 'stripe':
      return { integration: 'stripe', method, result: 'simulated_success' }
    default:
      return { integration, method, result: 'unknown_integration' }
  }
}