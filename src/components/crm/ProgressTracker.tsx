import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  BookOpen, 
  Star,
  Calendar,
  Download
} from 'lucide-react';

interface ProgressData {
  date: string;
  attendance: number;
  performance: number;
  completion: number;
}

interface SkillData {
  skill: string;
  current: number;
  target: number;
  improvement: number;
}

interface ProgressTrackerProps {
  userId: string;
  userType: 'student' | 'teacher';
  timeframe?: '1week' | '1month' | '3months' | '6months' | '1year';
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userId: _userId, userType: _userType, timeframe = '3months' }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);

  // Mock progress data
  const progressData: ProgressData[] = [
    { date: '2024-01-01', attendance: 85, performance: 75, completion: 20 },
    { date: '2024-01-08', attendance: 90, performance: 78, completion: 35 },
    { date: '2024-01-15', attendance: 88, performance: 82, completion: 50 },
    { date: '2024-01-22', attendance: 95, performance: 85, completion: 65 },
    { date: '2024-01-29', attendance: 92, performance: 88, completion: 75 },
    { date: '2024-02-05', attendance: 97, performance: 90, completion: 85 },
  ];

  const skillsData: SkillData[] = [
    { skill: 'Speaking', current: 85, target: 90, improvement: 15 },
    { skill: 'Writing', current: 78, target: 85, improvement: 12 },
    { skill: 'Reading', current: 92, target: 95, improvement: 8 },
    { skill: 'Listening', current: 88, target: 90, improvement: 10 },
    { skill: 'Grammar', current: 75, target: 80, improvement: 20 },
  ];

  const activityDistribution = [
    { name: 'Video Lessons', value: 40, color: '#3B82F6' },
    { name: 'Live Classes', value: 30, color: '#10B981' },
    { name: 'Assignments', value: 20, color: '#F59E0B' },
    { name: 'Assessments', value: 10, color: '#EF4444' },
  ];

  const milestones = [
    { date: '2024-01-15', title: 'Completed Foundation Level', type: 'achievement', status: 'completed' },
    { date: '2024-02-01', title: 'Mid-term Assessment', type: 'assessment', status: 'completed' },
    { date: '2024-02-15', title: 'Speaking Confidence Milestone', type: 'skill', status: 'in_progress' },
    { date: '2024-03-01', title: 'Course Completion', type: 'achievement', status: 'upcoming' },
  ];

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'assessment':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'skill':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Progress Tracker</h2>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1week">Last Week</option>
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Overall Progress</h3>
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold mb-1">85%</div>
          <div className="text-blue-100">+12% this month</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Attendance Rate</h3>
            <Calendar className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold mb-1">95%</div>
          <div className="text-green-100">Excellent</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Avg Score</h3>
            <Star className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold mb-1">88%</div>
          <div className="text-purple-100">Above target</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Study Hours</h3>
            <Clock className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold mb-1">156h</div>
          <div className="text-orange-100">Total logged</div>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [`${value}%`, name]}
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Attendance"
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Performance"
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Completion"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Assessment */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
              <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
              <Bar dataKey="target" fill="#10B981" name="Target Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Distribution and Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Activity Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Learning Activity Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Milestones */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Learning Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getMilestoneIcon(milestone.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{milestone.title}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneColor(milestone.status)}`}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Skills Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h3 className="text-lg font-semibold mb-4">Skills Development Progress</h3>
        <div className="space-y-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{skill.skill}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Current: {skill.current}%</span>
                  <span className="text-sm text-gray-600">Target: {skill.target}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full relative"
                      style={{ width: `${(skill.current / skill.target) * 100}%` }}
                    >
                      <div 
                        className="absolute right-0 top-0 h-3 w-1 bg-green-500 rounded-r-full"
                        style={{ 
                          right: `${100 - (skill.current / skill.target) * 100}%`,
                          display: skill.current >= skill.target ? 'none' : 'block'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <TrendingUp className={`h-4 w-4 mr-1 ${skill.improvement > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={skill.improvement > 0 ? 'text-green-600' : 'text-red-600'}>
                    {skill.improvement > 0 ? '+' : ''}{skill.improvement}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Setting */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Learning Goals</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Target className="h-4 w-4 mr-2" />
            Set New Goal
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { goal: 'Achieve IELTS Band 8.0', progress: 75, deadline: '2024-03-15', priority: 'high' },
            { goal: 'Complete Academic Writing Course', progress: 60, deadline: '2024-02-28', priority: 'medium' },
            { goal: 'Improve Speaking Fluency', progress: 85, deadline: '2024-02-15', priority: 'high' },
            { goal: 'Master Business Vocabulary', progress: 40, deadline: '2024-04-01', priority: 'low' }
          ].map((goal, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{goal.goal}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                  goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {goal.priority}
                </span>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-700">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      goal.progress >= 80 ? 'bg-green-500' :
                      goal.progress >= 60 ? 'bg-blue-500' :
                      goal.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;