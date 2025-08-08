import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';

const AdminReports = () => {
  const [reportType, setReportType] = useState<'academic' | 'financial' | 'attendance' | 'performance'>('academic');
  const [dateRange, setDateRange] = useState('30d');

  const academicData = [
    { month: 'Jan', enrollments: 45, completions: 38, dropouts: 2 },
    { month: 'Feb', enrollments: 52, completions: 42, dropouts: 3 },
    { month: 'Mar', enrollments: 48, completions: 45, dropouts: 1 },
    { month: 'Apr', enrollments: 61, completions: 48, dropouts: 4 },
    { month: 'May', enrollments: 55, completions: 52, dropouts: 2 },
    { month: 'Jun', enrollments: 67, completions: 58, dropouts: 3 },
  ];

  const financialData = [
    { month: 'Jan', revenue: 25000, expenses: 18000, profit: 7000 },
    { month: 'Feb', revenue: 28500, expenses: 19200, profit: 9300 },
    { month: 'Mar', revenue: 32000, expenses: 20100, profit: 11900 },
    { month: 'Apr', revenue: 35200, expenses: 21500, profit: 13700 },
    { month: 'May', revenue: 38000, expenses: 22800, profit: 15200 },
    { month: 'Jun', revenue: 42000, expenses: 24000, profit: 18000 },
  ];

  const courseDistribution = [
    { name: 'IELTS Preparation', value: 35, color: '#3B82F6' },
    { name: 'Business English', value: 25, color: '#10B981' },
    { name: 'General English', value: 20, color: '#F59E0B' },
    { name: 'Academic Writing', value: 15, color: '#8B5CF6' },
    { name: 'Young Learners', value: 5, color: '#EF4444' },
  ];

  const teacherPerformance = [
    { name: 'Ms. Ledia Balliu', students: 45, satisfaction: 96, hours: 85 },
    { name: 'Mr. Mo Tran', students: 32, satisfaction: 94, hours: 72 },
    { name: 'Ms. Sarah Thompson', students: 28, satisfaction: 91, hours: 45 },
    { name: 'Mr. Michael Anderson', students: 24, satisfaction: 89, hours: 56 },
    { name: 'Ms. Emma Wilson', students: 22, satisfaction: 93, hours: 48 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn-primary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'academic', label: 'Academic Performance', icon: BookOpen },
            { key: 'financial', label: 'Financial Reports', icon: DollarSign },
            { key: 'attendance', label: 'Attendance Reports', icon: Users },
            { key: 'performance', label: 'Teacher Performance', icon: TrendingUp }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setReportType(key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                reportType === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Academic Performance Tab */}
      {reportType === 'academic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Enrollment Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrollments" stroke="#3B82F6" strokeWidth={2} name="Enrollments" />
                  <Line type="monotone" dataKey="completions" stroke="#10B981" strokeWidth={2} name="Completions" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Course Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Academic Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Course Completion Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
              <div className="text-sm text-gray-600">Average Student Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Student Satisfaction</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">2.1%</div>
              <div className="text-sm text-gray-600">Dropout Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Reports Tab */}
      {reportType === 'financial' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="profit" fill="#3B82F6" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$42,000</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
              <div className="text-sm text-green-600 mt-1">+18% vs last month</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">$24,000</div>
              <div className="text-sm text-gray-600">Monthly Expenses</div>
              <div className="text-sm text-red-600 mt-1">+8% vs last month</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$18,000</div>
              <div className="text-sm text-gray-600">Net Profit</div>
              <div className="text-sm text-blue-600 mt-1">+25% vs last month</div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Performance Tab */}
      {reportType === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Teacher Performance Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={teacherPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3B82F6" name="Students" />
                <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction %" />
                <Bar dataKey="hours" fill="#F59E0B" name="Monthly Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Detailed Performance Metrics</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours/Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teacherPerformance.map((teacher, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.satisfaction}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.hours}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">4.{9 - index}/5</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Reports Tab */}
      {reportType === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Student Attendance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrollments" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Excellent Attendance (95%+)</span>
                  <span className="text-green-600 font-bold">156 students</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Good Attendance (85-94%)</span>
                  <span className="text-blue-600 font-bold">89 students</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-900">Average Attendance (75-84%)</span>
                  <span className="text-yellow-600 font-bold">34 students</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-900">Poor Attendance (&lt;75%)</span>
                  <span className="text-red-600 font-bold">12 students</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Class Attendance Rates</h3>
            <div className="space-y-4">
              {[
                { class: 'IELTS Speaking Practice', rate: 96, students: 15 },
                { class: 'Business English Excellence', rate: 94, students: 12 },
                { class: 'Academic Writing Workshop', rate: 91, students: 18 },
                { class: 'Grammar Fundamentals', rate: 89, students: 20 },
                { class: 'Conversation Club', rate: 98, students: 10 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.class}</div>
                    <div className="text-sm text-gray-500">{item.students} students enrolled</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${
                          item.rate >= 95 ? 'bg-green-500' : 
                          item.rate >= 85 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${item.rate}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{item.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;