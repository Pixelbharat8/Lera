import React, { useEffect, useState } from 'react';
import { fetchServerHealth } from '../lib/api';

const ServerStatus: React.FC = () => {
  const [status, setStatus] = useState<string>('loading');

  useEffect(() => {
    fetchServerHealth()
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error'));
  }, []);

  return <div>Server status: {status}</div>;
};

export default ServerStatus;
