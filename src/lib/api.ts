export async function fetchServerHealth(): Promise<{ status: string }> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Failed to fetch server health');
  }
  return response.json();
}

export async function fetchWorkflows(): Promise<string[]> {
  const response = await fetch('/api/workflows');
  if (!response.ok) {
    throw new Error('Failed to fetch workflows');
  }
  const data = await response.json();
  return data.workflows ?? [];
}

export async function createWorkflow(name: string): Promise<void> {
  const response = await fetch('/api/workflows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!response.ok) {
    throw new Error('Failed to create workflow');
  }
}
