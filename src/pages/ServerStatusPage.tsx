import React from 'react';
import ServerStatus from '../components/ServerStatus';

const ServerStatusPage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Server Status</h1>
    <ServerStatus />
  </div>
);

export default ServerStatusPage;
