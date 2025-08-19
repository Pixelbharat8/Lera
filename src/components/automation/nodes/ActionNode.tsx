import React from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, MessageSquare, Bell, Globe, Database } from 'lucide-react';

interface ActionNodeProps {
  data: {
    title: string;
    config: Record<string, any>;
    inputs: any[];
    outputs: any[];
  };
  selected?: boolean;
}

const ActionNode: React.FC<ActionNodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    if (data.title.includes('Email')) return <Mail className="h-4 w-4" />;
    if (data.title.includes('SMS')) return <MessageSquare className="h-4 w-4" />;
    if (data.title.includes('Notification')) return <Bell className="h-4 w-4" />;
    if (data.title.includes('HTTP')) return <Globe className="h-4 w-4" />;
    if (data.title.includes('Database')) return <Database className="h-4 w-4" />;
    return <Globe className="h-4 w-4" />;
  };

  const getStatusColor = () => {
    if (data.config.to || data.config.url || data.config.table) {
      return 'bg-green-500';
    }
    return 'bg-yellow-500';
  };

  return (
    <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 ${
      selected ? 'border-green-500 shadow-green-200' : 'border-gray-200'
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
            background: '#10b981',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded mr-2">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-sm">{data.title}</div>
            <div className="text-xs text-green-100">Action</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {data.config.to && (
          <div className="text-xs text-gray-600 mb-2">
            To: <span className="font-medium">{data.config.to}</span>
          </div>
        )}
        {data.config.subject && (
          <div className="text-xs text-gray-600 mb-2">
            Subject: <span className="font-medium">{data.config.subject}</span>
          </div>
        )}
        {data.config.url && (
          <div className="text-xs text-gray-600 mb-2">
            URL: <span className="font-medium truncate">{data.config.url}</span>
          </div>
        )}
        {data.config.table && (
          <div className="text-xs text-gray-600 mb-2">
            Table: <span className="font-medium">{data.config.table}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Inputs: {data.inputs.length}</span>
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
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
            background: '#10b981',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};

export default ActionNode;