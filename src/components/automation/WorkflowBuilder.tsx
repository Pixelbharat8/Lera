import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  Panel,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { WorkflowNode as WorkflowNodeType, WorkflowEdge, NodeType } from '../../types/workflows';
import NodePalette from './NodePalette';
import NodePropertiesPanel from './NodePropertiesPanel';
import WorkflowToolbar from './WorkflowToolbar';
import WorkflowExecutionPanel from './WorkflowExecutionPanel';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import AINode from './nodes/AINode';
import LogicNode from './nodes/LogicNode';
import UtilityNode from './nodes/UtilityNode';

import { Play, Save, Settings, Eye, Zap, Share2 } from 'lucide-react';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  ai: AINode,
  logic: LogicNode,
  utility: UtilityNode,
};

interface WorkflowBuilderProps {
  workflowId?: string;
  readOnly?: boolean;
  onSave?: (workflow: any) => void;
  onExecute?: (workflow: any) => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  workflowId,
  readOnly = false,
  onSave,
  onExecute
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeType | null>(null);
  const [showExecutionPanel, setShowExecutionPanel] = useState(false);
  const [workflowSettings, setWorkflowSettings] = useState({
    name: 'New Workflow',
    description: '',
    timeout: 300,
    retryAttempts: 3,
    errorHandling: 'stop' as 'stop' | 'continue' | 'retry'
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as WorkflowNodeType);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onAddNode = useCallback((nodeType: NodeType) => {
    const newNode: WorkflowNodeType = {
      id: `${nodeType.type}_${Date.now()}`,
      type: nodeType.category,
      category: nodeType.category,
      name: nodeType.name,
      description: nodeType.description,
      icon: nodeType.icon,
      color: nodeType.color,
      position: { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 300 + 100 
      },
      data: {
        title: nodeType.name,
        config: {},
        inputs: nodeType.inputs,
        outputs: nodeType.outputs
      }
    };

    setNodes((nds) => [...nds, newNode as Node]);
  }, [setNodes]);

  const onUpdateNode = useCallback((nodeId: string, updates: Partial<WorkflowNodeType>) => {
    setNodes((nds) => 
      nds.map((node) => 
        node.id === nodeId 
          ? { ...node, ...updates, data: { ...node.data, ...updates.data } }
          : node
      )
    );
  }, [setNodes]);

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [setNodes, setEdges, selectedNode]);

  const handleSaveWorkflow = useCallback(() => {
    const workflow = {
      id: workflowId || `workflow_${Date.now()}`,
      name: workflowSettings.name,
      description: workflowSettings.description,
      nodes: nodes as WorkflowNodeType[],
      edges: edges as WorkflowEdge[],
      settings: workflowSettings,
      updatedAt: new Date().toISOString()
    };
    
    onSave?.(workflow);
  }, [workflowId, workflowSettings, nodes, edges, onSave]);

  const handleExecuteWorkflow = useCallback(() => {
    const workflow = {
      id: workflowId || `workflow_${Date.now()}`,
      name: workflowSettings.name,
      nodes: nodes as WorkflowNodeType[],
      edges: edges as WorkflowEdge[],
      settings: workflowSettings
    };
    
    onExecute?.(workflow);
    setShowExecutionPanel(true);
  }, [workflowId, workflowSettings, nodes, edges, onExecute]);

  const validateWorkflow = useMemo(() => {
    const triggerNodes = nodes.filter(n => n.type === 'trigger');
    const errors = [];
    
    if (triggerNodes.length === 0) {
      errors.push('Workflow must have at least one trigger node');
    }
    
    if (nodes.length === 0) {
      errors.push('Workflow cannot be empty');
    }
    
    // Check for disconnected nodes
    const connectedNodeIds = new Set([
      ...edges.map(e => e.source),
      ...edges.map(e => e.target)
    ]);
    
    const disconnectedNodes = nodes.filter(n => 
      n.type !== 'trigger' && !connectedNodeIds.has(n.id)
    );
    
    if (disconnectedNodes.length > 0) {
      errors.push(`${disconnectedNodes.length} node(s) are not connected`);
    }
    
    return { isValid: errors.length === 0, errors };
  }, [nodes, edges]);

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Node Palette */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-lg">
        <NodePalette onAddNode={onAddNode} />
      </div>

      {/* Main Workflow Canvas */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            className="bg-gray-50"
            fitView
            snapToGrid
            snapGrid={[20, 20]}
          >
            <Background color="#f1f5f9" gap={20} />
            <Controls className="bg-white shadow-lg border rounded-lg" />
            <MiniMap 
              className="bg-white border rounded-lg shadow-lg"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'trigger': return '#3b82f6';
                  case 'action': return '#10b981';
                  case 'ai': return '#8b5cf6';
                  case 'logic': return '#f59e0b';
                  case 'utility': return '#6b7280';
                  default: return '#9ca3af';
                }
              }}
            />
            
            {/* Workflow Toolbar */}
            <Panel position="top-center" className="bg-white rounded-lg shadow-lg border p-2">
              <WorkflowToolbar
                workflowSettings={workflowSettings}
                onSettingsChange={setWorkflowSettings}
                onSave={handleSaveWorkflow}
                onExecute={handleExecuteWorkflow}
                validation={validateWorkflow}
                readOnly={readOnly}
              />
            </Panel>

            {/* Quick Actions */}
            <Panel position="top-right" className="space-y-2">
              <button
                onClick={handleExecuteWorkflow}
                disabled={!validateWorkflow.isValid || readOnly}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Workflow
              </button>
              
              <button
                onClick={() => setShowExecutionPanel(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Logs
              </button>
              
              {!readOnly && (
                <button
                  onClick={handleSaveWorkflow}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
              )}
            </Panel>

            {/* Validation Errors */}
            {!validateWorkflow.isValid && (
              <Panel position="bottom-center" className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
                <div className="text-red-800 font-medium mb-2">Workflow Validation Errors:</div>
                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                  {validateWorkflow.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Panel>
            )}
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Node Properties Panel */}
      {selectedNode && (
        <div className="w-80 bg-white border-l border-gray-200 shadow-lg">
          <NodePropertiesPanel
            node={selectedNode}
            onUpdateNode={onUpdateNode}
            onDeleteNode={onDeleteNode}
            readOnly={readOnly}
          />
        </div>
      )}

      {/* Execution Panel */}
      {showExecutionPanel && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <WorkflowExecutionPanel
              workflowId={workflowId}
              onClose={() => setShowExecutionPanel(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;