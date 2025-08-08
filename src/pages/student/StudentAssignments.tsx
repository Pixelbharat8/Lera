import { useEffect } from 'react';
import React from 'react';
import { Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

const StudentAssignments = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Graded</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">All Assignments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              title: 'IELTS Writing Task 2 - Environment Essay',
              course: 'IELTS Academic Preparation',
              dueDate: 'Due in 2 days',
              status: 'pending',
              priority: 'high'
            },
            {
              title: 'Business Email Writing Exercise',
              course: 'Business English Communication',
              dueDate: 'Due tomorrow',
              status: 'pending',
              priority: 'high'
            },
            {
              title: 'Grammar Quiz - Present Perfect',
              course: 'English Grammar Mastery',
              dueDate: 'Due in 5 days',
              status: 'pending',
              priority: 'normal'
            },
            {
              title: 'Speaking Recording - Job Interview',
              course: 'English Conversation for Beginners',
              dueDate: 'Submitted 2 days ago',
              status: 'submitted',
              score: null
            },
            {
              title: 'Reading Comprehension Test',
              course: 'IELTS Academic Preparation',
              dueDate: 'Graded 1 week ago',
              status: 'graded',
              score: 85
            }
          ].map((assignment, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {assignment.dueDate}
                    {assignment.score && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-green-600">Score: {assignment.score}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'pending' 
                      ? assignment.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      : assignment.status === 'submitted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {assignment.status === 'pending' ? 'Pending' : 
                     assignment.status === 'submitted' ? 'Submitted' : 'Graded'}
                  </span>
                  {assignment.status === 'pending' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      Start Assignment
                    </button>
                  )}
                  {assignment.status === 'graded' && (
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      View Feedback
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;