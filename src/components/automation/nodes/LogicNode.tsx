import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch, RotateCcw, AlertTriangle, Filter } from 'lucide-react';

interface LogicNodeProps {
  data: {
    title: string;
    config: Record<string, any>;
    inputs: any[];
    outputs: any[];
  };
  selected?: boolean;
}

const LogicNode: React.FC<LogicNodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    if (data.title.includes('If')) return <GitBranch className="h-4 w-4" />;
    if (data.title.includes('Loop')) return <RotateCcw className="h-4 w-4" />;
    if (data.title.includes('Error')) return <AlertTriangle className="h-4 w-4" />;
    return <Filter className="h-4 w-4" />;
  };

  return (
    <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 ${
      selected ? 'border-yellow-500 shadow-yellow-200' : 'border-gray-200'
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
            background: '#f59e0b',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-3 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded mr-2">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-sm">{data.title}</div>
            <div className="text-xs text-yellow-100">Logic</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {data.config.condition && (
          <div className="text-xs text-gray-600 mb-2">
            Condition: <span className="font-medium font-mono">{data.config.condition}</span>
          </div>
        )}
        {data.config.items && (
          <div className="text-xs text-gray-600 mb-2">
            Items: <span className="font-medium">Array configured</span>
          </div>
        )}
        {data.config.maxIterations && (
          <div className="text-xs text-gray-600 mb-2">
            Max: <span className="font-medium">{data.config.maxIterations}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Logic Node</span>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
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
            background: '#f59e0b',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};

export default LogicNode;