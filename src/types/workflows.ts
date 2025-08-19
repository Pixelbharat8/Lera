// Workflow automation platform types
export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'ai' | 'logic' | 'utility';
  category: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  data: {
    title: string;
    config: Record<string, any>;
    inputs: WorkflowInput[];
    outputs: WorkflowOutput[];
  };
  selected?: boolean;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  animated?: boolean;
}

export interface WorkflowInput {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'textarea' | 'json' | 'file';
  required: boolean;
  options?: { label: string; value: any }[];
  placeholder?: string;
  value?: any;
}

export interface WorkflowOutput {
  key: string;
  label: string;
  type: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isActive: boolean;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  settings: {
    timeout: number;
    retryAttempts: number;
    errorHandling: 'stop' | 'continue' | 'retry';
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastExecuted?: string;
  executionCount: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  triggerData?: Record<string, any>;
  logs: WorkflowExecutionLog[];
  nodeExecutions: NodeExecution[];
  error?: string;
}

export interface WorkflowExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  data?: Record<string, any>;
}

export interface NodeExecution {
  nodeId: string;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed' | 'skipped';
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  executionTime?: number;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  useCase: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime: string;
  workflow: Pick<Workflow, 'nodes' | 'edges' | 'settings'>;
  requiredIntegrations: string[];
  benefits: string[];
  previewImage?: string;
}

export interface NodeType {
  type: string;
  category: 'trigger' | 'action' | 'ai' | 'logic' | 'utility';
  name: string;
  description: string;
  icon: string;
  color: string;
  inputs: WorkflowInput[];
  outputs: WorkflowOutput[];
  configurable: boolean;
  premium?: boolean;
}

export interface WorkflowVariable {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  encrypted?: boolean;
}

export interface WorkflowWebhook {
  id: string;
  workflowId: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  isActive: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

export interface WorkflowSchedule {
  id: string;
  workflowId: string;
  cronExpression: string;
  timezone: string;
  isActive: boolean;
  nextRun?: string;
  lastRun?: string;
}