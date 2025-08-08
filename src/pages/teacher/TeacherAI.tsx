import React from 'react';
import TeacherAIAssistant from '../../components/teacher/TeacherAIAssistant';

const TeacherAI = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Teaching Assistant</h1>
      <TeacherAIAssistant />
    </div>
  );
};

export default TeacherAI;