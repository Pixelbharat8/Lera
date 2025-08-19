import React, { useState, useEffect } from 'react';
import { WorkflowNode, WorkflowInput } from '../../types/workflows';
import { Settings, Trash2, Copy, Eye, EyeOff, Save } from 'lucide-react';

interface NodePropertiesPanelProps {
  node: WorkflowNode;
  onUpdateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  onDeleteNode: (nodeId: string) => void;
  readOnly?: boolean;
}

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  node,
  onUpdateNode,
  onDeleteNode,
  readOnly = false
}) => {
  const [localConfig, setLocalConfig] = useState(node.data.config);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setLocalConfig(node.data.config);
    setHasUnsavedChanges(false);
  }, [node]);

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...localConfig, [key]: value };
    setLocalConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onUpdateNode(node.id, {
      data: {
        ...node.data,
        config: localConfig
      }
    });
    setHasUnsavedChanges(false);
  };

  const handleTitleChange = (newTitle: string) => {
    onUpdateNode(node.id, {
      data: {
        ...node.data,
        title: newTitle
      }
    });
  };

  const renderInput = (input: WorkflowInput) => {
    const value = localConfig[input.key] ?? input.value;

    switch (input.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            placeholder={input.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={readOnly}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleConfigChange(input.key, parseFloat(e.target.value) || 0)}
            placeholder={input.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={readOnly}
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleConfigChange(input.key, e.target.checked)}
              className="sr-only"
              disabled={readOnly}
            />
            <div className={`relative w-11 h-6 rounded-full transition-colors ${
              value ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                value ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
            <span className="ml-3 text-sm text-gray-700">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={readOnly}
          >
            <option value="">Select option...</option>
            {input.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            placeholder={input.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            disabled={readOnly}
          />
        );

      case 'json':
        return (
          <div className="space-y-2">
            <textarea
              value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleConfigChange(input.key, parsed);
                } catch {
                  handleConfigChange(input.key, e.target.value);
                }
              }}
              placeholder={input.placeholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              disabled={readOnly}
            />
            <p className="text-xs text-gray-500">Enter valid JSON</p>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            placeholder={input.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={readOnly}
          />
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3"
              style={{ backgroundColor: node.color }}
            >
              <span className="text-sm">{node.icon}</span>
            </div>
            <div>
              <input
                type="text"
                value={node.data.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-lg font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                disabled={readOnly}
              />
              <p className="text-sm text-gray-500">{node.description}</p>
            </div>
          </div>
          
          {!readOnly && (
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                  title="Save changes"
                >
                  <Save className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => onDeleteNode(node.id)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                title="Delete node"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            node.category === 'trigger' ? 'bg-blue-100 text-blue-800' :
            node.category === 'action' ? 'bg-green-100 text-green-800' :
            node.category === 'ai' ? 'bg-purple-100 text-purple-800' :
            node.category === 'logic' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {node.category}
          </span>
          
          {hasUnsavedChanges && (
            <span className="text-xs text-orange-600 font-medium">● Unsaved changes</span>
          )}
        </div>
      </div>

      {/* Configuration */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h3 className="text-md font-semibold text-gray-900">Configuration</h3>
        
        {node.data.inputs.map(input => (
          <div key={input.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {input.label}
              {input.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput(input)}
            {input.type === 'json' && localConfig[input.key] && typeof localConfig[input.key] === 'string' && (
              <p className="text-xs text-red-500">Invalid JSON format</p>
            )}
          </div>
        ))}

        {/* Advanced Settings */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Settings className="h-4 w-4 mr-2" />
            Advanced Settings
            {showAdvanced ? <EyeOff className="h-4 w-4 ml-auto" /> : <Eye className="h-4 w-4 ml-auto" />}
          </button>
          
          {showAdvanced && (
            <div className="mt-4 space-y-4 bg-gray-50 p-3 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Node ID
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={node.id}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(node.id)}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                    title="Copy node ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={node.position.x}
                    onChange={(e) => onUpdateNode(node.id, {
                      position: { ...node.position, x: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="X"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={readOnly}
                  />
                  <input
                    type="number"
                    value={node.position.y}
                    onChange={(e) => onUpdateNode(node.id, {
                      position: { ...node.position, y: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="Y"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled={readOnly}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Node Information */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Node Information</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Inputs:</span>
              <div className="mt-1 space-y-1">
                {node.data.inputs.map(input => (
                  <div key={input.key} className="flex justify-between">
                    <span className="text-gray-700">{input.label}</span>
                    <span className="text-gray-500 text-xs">{input.type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <span className="font-medium text-gray-600">Outputs:</span>
              <div className="mt-1 space-y-1">
                {node.data.outputs.map(output => (
                  <div key={output.key} className="flex justify-between">
                    <span className="text-gray-700">{output.label}</span>
                    <span className="text-gray-500 text-xs">{output.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">How it works</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {node.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      {!readOnly && hasUnsavedChanges && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={() => {
                setLocalConfig(node.data.config);
                setHasUnsavedChanges(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodePropertiesPanel;