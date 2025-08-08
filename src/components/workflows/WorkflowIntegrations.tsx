import { useEffect } from 'react';
import React, { useState } from 'react';
import { useWorkflows } from '../../hooks/useWorkflows';
import { 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2,
  Mail,
  MessageSquare,
  Zap,
  Globe,
  Database,
  Webhook
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
  lastUsed?: string;
  usageCount: number;
}

const WorkflowIntegrations = () => {
  const { getIntegrationOptions } = useWorkflows();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Gmail SMTP',
      type: 'email',
      status: 'connected',
      config: { smtp_server: 'smtp.gmail.com', username: 'academy@lera.com' },
      lastUsed: '2025-01-22T14:30:00Z',
      usageCount: 156
    },
    {
      id: '2',
      name: 'Twilio SMS',
      type: 'sms',
      status: 'connected',
      config: { account_sid: 'AC...', auth_token: '***' },
      lastUsed: '2025-01-22T10:15:00Z',
      usageCount: 89
    },
    {
      id: '3',
      name: 'Slack Notifications',
      type: 'slack',
      status: 'disconnected',
      config: { webhook_url: '', channel: '#general' },
      usageCount: 0
    },
    {
      id: '4',
      name: 'Zoom API',
      type: 'zoom',
      status: 'error',
      config: { api_key: '***', api_secret: '***' },
      lastUsed: '2025-01-21T16:45:00Z',
      usageCount: 34
    }
  ]);

  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: '',
    config: {}
  });

  const integrationTypes = getIntegrationOptions();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'slack': return MessageSquare;
      case 'discord': return MessageSquare;
      case 'zoom': return Globe;
      case 'webhook': return Webhook;
      case 'database': return Database;
      default: return Zap;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddIntegration = () => {
    const integration: Integration = {
      id: Date.now().toString(),
      ...newIntegration,
      status: 'disconnected',
      usageCount: 0
    };
    
    setIntegrations([...integrations, integration]);
    setNewIntegration({ name: '', type: '', config: {} });
    setShowAddIntegration(false);
  };

  const handleTestConnection = async (integrationId: string) => {
    // Simulate testing connection
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'connected' as const }
        : integration
    ));
  };

  const handleDeleteIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.filter(integration => integration.id !== integrationId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">External Integrations</h2>
        <button
          onClick={() => setShowAddIntegration(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {integrations.filter(i => i.status === 'connected').length}
          </div>
          <div className="text-sm text-gray-600">Connected</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {integrations.filter(i => i.status === 'error').length}
          </div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {integrations.reduce((sum, i) => sum + i.usageCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Usage</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {integrationTypes.length}
          </div>
          <div className="text-sm text-gray-600">Available Types</div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = getTypeIcon(integration.type);
          return (
            <div key={integration.id} className="card-3d bg-white rounded-lg shadow-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-100 rounded-lg mr-3">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(integration.status)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Usage:</span>
                  <span className="font-medium text-gray-900">{integration.usageCount} times</span>
                </div>
                
                {integration.lastUsed && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Used:</span>
                    <span className="text-gray-900">
                      {new Date(integration.lastUsed).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                {integration.status !== 'connected' && (
                  <button
                    onClick={() => handleTestConnection(integration.id)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                  >
                    Test Connection
                  </button>
                )}
                <button
                  onClick={() => setEditingIntegration(integration)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteIntegration(integration.id)}
                  className="p-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Integrations */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Integrations</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {integrationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setNewIntegration({ name: type.name, type: type.id, config: {} });
                setShowAddIntegration(true);
              }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-sm font-medium text-gray-700">{type.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Integration Modal */}
      {showAddIntegration && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Integration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Integration Name</label>
                <input
                  type="text"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newIntegration.type}
                  onChange={(e) => setNewIntegration({...newIntegration, type: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  {integrationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {newIntegration.type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
                  <textarea
                    value={JSON.stringify(newIntegration.config, null, 2)}
                    onChange={(e) => {
                      try {
                        const config = JSON.parse(e.target.value);
                        setNewIntegration({...newIntegration, config});
                      } catch (error) {
                        // Invalid JSON, ignore
                      }
                    }}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                    placeholder='{"api_key": "your_key_here"}'
                  />
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddIntegration(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIntegration}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Add Integration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Integration Modal */}
      {editingIntegration && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Integration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingIntegration.name}
                  onChange={(e) => setEditingIntegration({...editingIntegration, name: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
                <textarea
                  value={JSON.stringify(editingIntegration.config, null, 2)}
                  onChange={(e) => {
                    try {
                      const config = JSON.parse(e.target.value);
                      setEditingIntegration({...editingIntegration, config});
                    } catch (error) {
                      // Invalid JSON, ignore
                    }
                  }}
                  rows={6}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingIntegration(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIntegrations(prev => prev.map(integration => 
                    integration.id === editingIntegration.id ? editingIntegration : integration
                  ));
                  setEditingIntegration(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowIntegrations;