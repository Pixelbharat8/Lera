import React from 'react';
import { Handle, Position } from 'reactflow';
import { Clock, Wrench, Database, FileText, Calculator } from 'lucide-react';

interface UtilityNodeProps {
  data: {
    title: string;
    config: Record<string, any>;
    inputs: any[];
    outputs: any[];
  };
  selected?: boolean;
}

const UtilityNode: React.FC<UtilityNodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    if (data.title.includes('Delay')) return <Clock className="h-4 w-4" />;
    if (data.title.includes('Transform')) return <Wrench className="h-4 w-4" />;
    if (data.title.includes('Database')) return <Database className="h-4 w-4" />;
    if (data.title.includes('Calculator')) return <Calculator className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 ${
      selected ? 'border-gray-500 shadow-gray-200' : 'border-gray-200'
    }`}>
      {/* Input Handles */}
      {data.inputs.map((input, index) => (
        <Handle
          key={input.key}
          type="target"
          position={Position.Left}
          id={input.key}
          style={{ 
            top: `${50 + (index * 20)}%`,
            background: '#6b7280',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-3 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded mr-2">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-sm">{data.title}</div>
            <div className="text-xs text-gray-100">Utility</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {data.config.duration && (
          <div className="text-xs text-gray-600 mb-2">
            Duration: <span className="font-medium">{data.config.duration}s</span>
          </div>
        )}
        {data.config.transformation && (
          <div className="text-xs text-gray-600 mb-2">
            Transform: <span className="font-medium">Configured</span>
          </div>
        )}
        {data.config.operation && (
          <div className="text-xs text-gray-600 mb-2">
            Operation: <span className="font-medium">{data.config.operation}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Utility</span>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
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
            background: '#6b7280',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};

export default UtilityNode;