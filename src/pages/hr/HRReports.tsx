import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

const HRReports = () => {
  const [reportType, setReportType] = useState<'attendance' | 'payroll' | 'performance' | 'turnover'>('attendance');
  const [dateRange, setDateRange] = useState('30d');

  const attendanceData = [
    { month: 'Jan', attendance: 95, employees: 15 },
    { month: 'Feb', attendance: 97, employees: 15 },
    { month: 'Mar', attendance: 93, employees: 16 },
    { month: 'Apr', attendance: 96, employees: 16 },
    { month: 'May', attendance: 98, employees: 17 },
    { month: 'Jun', attendance: 94, employees: 17 },
  ];

  const payrollData = [
    { month: 'Jan', total: 42000, overtime: 2000, bonuses: 3000 },
    { month: 'Feb', total: 45000, overtime: 2500, bonuses: 2800 },
    { month: 'Mar', total: 47000, overtime: 3000, bonuses: 3200 },
    { month: 'Apr', total: 48000, overtime: 2800, bonuses: 3500 },
    { month: 'May', total: 50000, overtime: 3200, bonuses: 4000 },
    { month: 'Jun', total: 52000, overtime: 3500, bonuses: 4200 },
  ];

  const departmentDistribution = [
    { name: 'Teaching', value: 8, color: '#3B82F6' },
    { name: 'Management', value: 2, color: '#10B981' },
    { name: 'Operations', value: 3, color: '#F59E0B' },
    { name: 'Administration', value: 2, color: '#EF4444' },
    { name: 'HR', value: 1, color: '#8B5CF6' },
    { name: 'IT', value: 1, color: '#EC4899' },
  ];

  const performanceData = [
    { department: 'Teaching', avgRating: 4.8, satisfaction: 95 },
    { department: 'Management', avgRating: 4.9, satisfaction: 98 },
    { department: 'Operations', avgRating: 4.6, satisfaction: 92 },
    { department: 'Administration', avgRating: 4.7, satisfaction: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">HR Reports & Analytics</h1>
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
            { key: 'attendance', label: 'Attendance Reports', icon: Users },
            { key: 'payroll', label: 'Payroll Analysis', icon: DollarSign },
            { key: 'performance', label: 'Performance Reports', icon: TrendingUp },
            { key: 'turnover', label: 'Turnover Analysis', icon: FileText }
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

      {/* Attendance Reports */}
      {reportType === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Attendance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Department Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">96%</div>
                <div className="text-sm text-gray-600">Overall Attendance</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Late Arrivals</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Sick Days</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Unexcused Absences</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Analysis */}
      {reportType === 'payroll' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Payroll Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="total" fill="#3B82F6" name="Total Payroll" />
                <Bar dataKey="overtime" fill="#10B981" name="Overtime" />
                <Bar dataKey="bonuses" fill="#F59E0B" name="Bonuses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$52,000</div>
              <div className="text-sm text-gray-600">Current Month Payroll</div>
              <div className="text-sm text-green-600 mt-1">+8% vs last month</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$3,059</div>
              <div className="text-sm text-gray-600">Average Employee Salary</div>
              <div className="text-sm text-blue-600 mt-1">Competitive rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$4,200</div>
              <div className="text-sm text-gray-600">Total Bonuses</div>
              <div className="text-sm text-purple-600 mt-1">Performance rewards</div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Reports */}
      {reportType === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgRating" fill="#8B5CF6" name="Average Rating" />
                <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h4 className="font-medium text-gray-900 mb-4">Top Performers</h4>
              <div className="space-y-3">
                {[
                  { name: 'Ms. Ledia Balliu', rating: 4.9, department: 'Management' },
                  { name: 'Mr. Mo Tran', rating: 4.8, department: 'Operations' },
                  { name: 'Ms. Sarah Thompson', rating: 4.7, department: 'Teaching' }
                ].map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{performer.name}</div>
                      <div className="text-sm text-gray-500">{performer.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{performer.rating}/5</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h4 className="font-medium text-gray-900 mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Employee Satisfaction</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="font-medium text-gray-900">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Retention Rate</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="font-medium text-gray-900">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Training Completion</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="font-medium text-gray-900">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Turnover Analysis */}
      {reportType === 'turnover' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8%</div>
              <div className="text-sm text-gray-600">Annual Turnover Rate</div>
              <div className="text-xs text-green-600 mt-1">Below industry average</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3</div>
              <div className="text-sm text-gray-600">Avg Years Tenure</div>
              <div className="text-xs text-blue-600 mt-1">Strong retention</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
              <div className="text-sm text-gray-600">Departures This Year</div>
              <div className="text-xs text-purple-600 mt-1">Voluntary resignation</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-sm text-gray-600">New Hires This Year</div>
              <div className="text-xs text-orange-600 mt-1">Growth trajectory</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Retention Analysis</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Reasons for Leaving</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Career advancement</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Relocation</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Personal reasons</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Retention by Department</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teaching</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Management</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operations</span>
                      <span className="font-medium text-green-600">90%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Administration</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRReports;