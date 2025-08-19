import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  Settings, 
  Download, 
  Upload, 
  Share2, 
  Copy,
  Trash2,
  Eye,
  Pause,
  RotateCcw,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface WorkflowToolbarProps {
  workflowSettings: {
    name: string;
    description: string;
    timeout: number;
    retryAttempts: number;
    errorHandling: 'stop' | 'continue' | 'retry';
  };
  onSettingsChange: (settings: any) => void;
  onSave: () => void;
  onExecute: () => void;
  validation: {
    isValid: boolean;
    errors: string[];
  };
  readOnly?: boolean;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  workflowSettings,
  onSettingsChange,
  onSave,
  onExecute,
  validation,
  readOnly = false
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await onExecute();
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Workflow Name */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={workflowSettings.name}
          onChange={(e) => onSettingsChange({ ...workflowSettings, name: e.target.value })}
          className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          placeholder="Workflow Name"
          disabled={readOnly}
        />
        
        {validation.isValid ? (
          <CheckCircle className="h-5 w-5 text-green-500" title="Workflow is valid" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500" title={validation.errors.join(', ')} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleExecute}
          disabled={!validation.isValid || isExecuting || readOnly}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isExecuting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Execute
            </>
          )}
        </button>

        {!readOnly && (
          <button
            onClick={onSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </button>
        )}

        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </button>

        <div className="border-l border-gray-300 pl-2 flex space-x-2">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Export workflow"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Import workflow"
          >
            <Upload className="h-4 w-4" />
          </button>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Share workflow"
          >
            <Share2 className="h-4 w-4" />
          </button>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Duplicate workflow"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={workflowSettings.name}
                  onChange={(e) => onSettingsChange({ ...workflowSettings, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={workflowSettings.description}
                  onChange={(e) => onSettingsChange({ ...workflowSettings, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this workflow does..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    value={workflowSettings.timeout}
                    onChange={(e) => onSettingsChange({ ...workflowSettings, timeout: parseInt(e.target.value) || 300 })}
                    min="1"
                    max="3600"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retry Attempts
                  </label>
                  <input
                    type="number"
                    value={workflowSettings.retryAttempts}
                    onChange={(e) => onSettingsChange({ ...workflowSettings, retryAttempts: parseInt(e.target.value) || 3 })}
                    min="0"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Error Handling
                </label>
                <select
                  value={workflowSettings.errorHandling}
                  onChange={(e) => onSettingsChange({ ...workflowSettings, errorHandling: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="stop">Stop on Error</option>
                  <option value="continue">Continue on Error</option>
                  <option value="retry">Retry on Error</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowToolbar;