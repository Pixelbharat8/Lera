import React from 'react';
import LearningAnalytics from '../../components/analytics/LearningAnalytics';

const StudentProgress = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
      <LearningAnalytics />
    </div>
  );
};

export default StudentProgress;