import React from 'react';
import { Handle, Position } from 'reactflow';
import { Bot, Brain, Sparkles, Globe, FileText } from 'lucide-react';

interface AINodeProps {
  data: {
    title: string;
    config: Record<string, any>;
    inputs: any[];
    outputs: any[];
  };
  selected?: boolean;
}

const AINode: React.FC<AINodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    if (data.title.includes('Text Generation')) return <Brain className="h-4 w-4" />;
    if (data.title.includes('Grade')) return <FileText className="h-4 w-4" />;
    if (data.title.includes('Translate')) return <Globe className="h-4 w-4" />;
    if (data.title.includes('Summarize')) return <FileText className="h-4 w-4" />;
    return <Bot className="h-4 w-4" />;
  };

  const getModelInfo = () => {
    if (data.config.model) {
      return data.config.model.toUpperCase();
    }
    return 'AI';
  };

  return (
    <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 relative overflow-hidden ${
      selected ? 'border-purple-500 shadow-purple-200' : 'border-gray-200'
    }`}>
      {/* Sparkle Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-2 right-2 h-3 w-3 text-purple-300 animate-pulse" />
        <Sparkles className="absolute bottom-2 left-2 h-2 w-2 text-purple-200 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Input Handles */}
      {data.inputs.map((input, index) => (
        <Handle
          key={input.key}
          type="target"
          position={Position.Left}
          id={input.key}
          style={{ 
            top: `${50 + (index * 20)}%`,
            background: '#8b5cf6',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-3 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded mr-2">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{data.title}</div>
            <div className="text-xs text-purple-100 flex items-center">
              <span>AI</span>
              <span className="mx-1">•</span>
              <span>{getModelInfo()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {data.config.prompt && (
          <div className="text-xs text-gray-600 mb-2">
            Prompt: <span className="font-medium">Configured</span>
          </div>
        )}
        {data.config.temperature && (
          <div className="text-xs text-gray-600 mb-2">
            Temperature: <span className="font-medium">{data.config.temperature}</span>
          </div>
        )}
        {data.config.maxTokens && (
          <div className="text-xs text-gray-600 mb-2">
            Max Tokens: <span className="font-medium">{data.config.maxTokens}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>AI Powered</span>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
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
            background: '#8b5cf6',
            width: 12,
            height: 12,
            border: '2px solid white'
          }}
        />
      ))}
    </div>
  );
};

export default AINode;