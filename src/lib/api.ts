export interface WorkflowSummary {
  id: string;
  name: string;
  description?: string;
  status: string;
  steps: Array<{
    id: string;
    title: string;
    type: string;
    dueAfterHours: number;
  }>;
}

export async function fetchServerHealth(): Promise<{ status: string }> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Failed to fetch server health');
  }
  return response.json();
}

export async function fetchWorkflows(): Promise<WorkflowSummary[]> {
  const response = await fetch('/api/workflows');
  if (!response.ok) {
    throw new Error('Failed to fetch workflows');
  }
  const data = await response.json();
  return Array.isArray(data.workflows) ? data.workflows : [];
}

export async function createWorkflow(name: string): Promise<WorkflowSummary> {
  const response = await fetch('/api/workflows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!response.ok) {
    throw new Error('Failed to create workflow');
  }
  const data = await response.json();
  return data.workflow;
}
