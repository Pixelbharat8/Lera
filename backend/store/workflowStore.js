import { initialWorkflows } from '../data/database.js';

const workflows = [...initialWorkflows];

export function listWorkflows() {
  return workflows;
}

export function createWorkflow({ name, description = '', status = 'draft', steps = [] }) {
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  if (!trimmedName) {
    throw new Error('Workflow name is required');
  }

  const workflow = {
    id: `workflow-${Date.now()}`,
    name: trimmedName,
    description,
    status,
    steps: Array.isArray(steps)
      ? steps.map((step, index) => ({
          id: step?.id ?? `step-${index + 1}`,
          title: step?.title ?? `Step ${index + 1}`,
          type: step?.type ?? 'task',
          dueAfterHours: step?.dueAfterHours ?? 0
        }))
      : []
  };

  workflows.push(workflow);
  return workflow;
}
