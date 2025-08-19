import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap, Clock, Webhook } from 'lucide-react';

interface TriggerNodeProps {
  data: {
    title: string;
    config: Record<string, any>;
    inputs: any[];
    outputs: any[];
  };
  selected?: boolean;
}

const TriggerNode: React.FC<TriggerNodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    if (data.title.includes('Schedule')) return <Clock className="h-4 w-4" />;
    if (data.title.includes('Webhook')) return <Webhook className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };

  return (
    <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 ${
      selected ? 'border-blue-500 shadow-blue-200' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-3 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded mr-2">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-sm">{data.title}</div>
            <div className="text-xs text-blue-100">Trigger</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {data.config.event && (
          <div className="text-xs text-gray-600 mb-2">
            Event: <span className="font-medium">{data.config.event}</span>
          </div>
        )}
        {data.config.schedule && (
          <div className="text-xs text-gray-600 mb-2">
            Schedule: <span className="font-medium font-mono">{data.config.schedule}</span>
          </div>
        )}
        {data.config.webhook_url && (
          <div className="text-xs text-gray-600 mb-2">
            Webhook: <span className="font-medium">Configured</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Outputs: {data.outputs.length}</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Output Handles */}
      {data.outputs.map((output, index) => (
        <Handle
          key={output.key}
          type="source"
          position={Position.Right}
          id={output.key}
          style={{ 
            top: `${50 + (index * 20)}%`,
            background: '#3b82f6',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};

export default TriggerNode;