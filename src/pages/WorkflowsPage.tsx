import React, { useEffect, useState } from 'react';
import { fetchWorkflows, createWorkflow, WorkflowSummary } from '../lib/api';

const WorkflowsPage = () => {
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newWorkflow, setNewWorkflow] = useState('');

  useEffect(() => {
    fetchWorkflows()
      .then(setWorkflows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Workflows</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createWorkflow(newWorkflow);
            setNewWorkflow('');
            setLoading(true);
            const updated = await fetchWorkflows();
            setWorkflows(updated);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }}
        className="mb-4 flex gap-2"
      >
        <input
          type="text"
          value={newWorkflow}
          onChange={(e) => setNewWorkflow(e.target.value)}
          placeholder="New workflow name"
          className="border px-2 py-1 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
          disabled={!newWorkflow}
        >
          Add
        </button>
      </form>
      {workflows.length === 0 ? (
        <p>No workflows available</p>
      ) : (
        <ul className="space-y-3">
          {workflows.map((workflow) => (
            <li key={workflow.id} className="rounded border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{workflow.name}</h2>
                  {workflow.description ? (
                    <p className="text-sm text-gray-600">{workflow.description}</p>
                  ) : null}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    workflow.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : workflow.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {workflow.status}
                </span>
              </div>
              {workflow.steps.length > 0 ? (
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-700">Steps</h3>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-gray-600">
                    {workflow.steps.map((step) => (
                      <li key={step.id}>
                        <span className="font-medium text-gray-800">{step.title}</span>{' '}
                        <span className="text-gray-500">({step.type}, due +{step.dueAfterHours}h)</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkflowsPage;
