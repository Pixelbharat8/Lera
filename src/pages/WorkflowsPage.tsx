import React, { useEffect, useState } from 'react';
import { fetchWorkflows, createWorkflow } from '../lib/api';

const WorkflowsPage = () => {
  const [workflows, setWorkflows] = useState<string[]>([]);
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
        <ul className="list-disc pl-5">
          {workflows.map((wf, idx) => (
            <li key={idx}>{wf}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkflowsPage;
