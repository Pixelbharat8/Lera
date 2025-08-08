import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Calendar, 
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { EmployeeIdGenerator } from '../../utils/employeeIdGenerator';
import { Employee, Payroll, Leave } from '../../types';

const HRDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'payroll' | 'leaves' | 'reports'>('overview');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: 0,
    contractType: 'full_time' as const,
    hireDate: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = async () => {
    // Mock data for HR system
    const mockEmployees: Employee[] = [
      {
        id: '1',
        employeeId: 'LERA-EMP-2025-0001',
        userId: 'user1',
        fullName: 'Ms. Ledia Balliu',
        email: 'ledia@lera-academy.com',
        phone: '+84 123 456 789',
        position: 'CEO & Lead IELTS Instructor',
        department: 'Management',
        hireDate: '2018-01-15',
        salary: 3000,
        contractType: 'full_time',
        status: 'active',
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '+84 987 654 321',
          relationship: 'Family'
        },
        documents: [],
        createdAt: '2018-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        employeeId: 'LERA-EMP-2025-0002',
        userId: 'user2',
        fullName: 'Mr. Mo Tran',
        email: 'mo@lera-academy.com',
        phone: '+84 234 567 890',
        position: 'Operations Manager',
        department: 'Operations',
        hireDate: '2019-03-01',
        salary: 2500,
        contractType: 'full_time',
        status: 'active',
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '+84 876 543 210',
          relationship: 'Family'
        },
        documents: [],
        createdAt: '2019-03-01',
        updatedAt: '2024-01-15'
      }
    ];

    const mockLeaves: Leave[] = [
      {
        id: '1',
        employeeId: 'LERA-EMP-2025-0002',
        type: 'vacation',
        startDate: '2024-02-01',
        endDate: '2024-02-03',
        days: 3,
        reason: 'Family vacation',
        status: 'approved',
        approvedBy: 'LERA-EMP-2025-0001',
        approvedAt: '2024-01-20'
      }
    ];

    const mockPayrolls: Payroll[] = [
      {
        id: '1',
        employeeId: 'LERA-EMP-2025-0001',
        period: '2024-01',
        baseSalary: 3000,
        overtime: 0,
        bonuses: 500,
        deductions: 300,
        netPay: 3200,
        payDate: '2024-01-31',
        status: 'paid'
      }
    ];

    setEmployees(mockEmployees);
    setLeaves(mockLeaves);
    setPayrolls(mockPayrolls);
    setLoading(false);
  };

  const handleCreateEmployee = async () => {
    try {
      const employeeId = await EmployeeIdGenerator.generateEmployeeId();
      
      const employee: Employee = {
        id: Date.now().toString(),
        employeeId,
        userId: '', // Would be created separately
        fullName: newEmployee.fullName,
        email: newEmployee.email,
        phone: newEmployee.phone,
        position: newEmployee.position,
        department: newEmployee.department,
        hireDate: newEmployee.hireDate,
        salary: newEmployee.salary,
        contractType: newEmployee.contractType,
        status: 'active',
        emergencyContact: {
          name: newEmployee.emergencyContactName,
          phone: newEmployee.emergencyContactPhone,
          relationship: newEmployee.emergencyContactRelationship
        },
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setEmployees([...employees, employee]);
      setShowAddEmployee(false);
      setNewEmployee({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: 0,
        contractType: 'full_time',
        hireDate: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: ''
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">HR Management Dashboard</h1>
          <p className="text-gray-600">Manage employees, payroll, and human resources</p>
        </div>
        <button
          onClick={() => setShowAddEmployee(true)}
          className="btn-primary flex items-center"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-green-600">+2 this month</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Staff</p>
              <p className="text-2xl font-bold text-gray-900">{employees.filter(e => e.status === 'active').length}</p>
              <p className="text-sm text-blue-600">98% attendance</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Leaves</p>
              <p className="text-2xl font-bold text-gray-900">{leaves.filter(l => l.status === 'pending').length}</p>
              <p className="text-sm text-yellow-600">Needs approval</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900">$45,000</p>
              <p className="text-sm text-purple-600">15 employees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'employees', label: 'Employees', icon: Users },
            { key: 'payroll', label: 'Payroll', icon: DollarSign },
            { key: 'leaves', label: 'Leave Management', icon: Calendar },
            { key: 'reports', label: 'HR Reports', icon: FileText }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === key
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Department Overview */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { dept: 'Management', count: 2, avgSalary: 2750 },
                { dept: 'Teaching', count: 8, avgSalary: 1800 },
                { dept: 'Operations', count: 3, avgSalary: 1500 },
                { dept: 'Administration', count: 2, avgSalary: 1200 }
              ].map((dept, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{dept.count}</div>
                  <div className="text-sm text-gray-600">{dept.dept}</div>
                  <div className="text-xs text-gray-500">${dept.avgSalary} avg</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent HR Activity</h3>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'New employee onboarded', details: 'Sarah Johnson - Marketing Specialist', type: 'create' },
                { time: '1 day ago', action: 'Leave request approved', details: 'Mo Tran - 3 days vacation', type: 'approve' },
                { time: '2 days ago', action: 'Payroll processed', details: 'January 2024 - 15 employees', type: 'payroll' },
                { time: '3 days ago', action: 'Contract renewed', details: 'Emma Wilson - Teaching Contract', type: 'update' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 mr-4 ${
                    activity.type === 'create' ? 'bg-green-500' :
                    activity.type === 'approve' ? 'bg-blue-500' :
                    activity.type === 'payroll' ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'employees' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees, ID, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Departments</option>
                  <option>Management</option>
                  <option>Teaching</option>
                  <option>Operations</option>
                  <option>Administration</option>
                </select>
                <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Employee Directory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hire Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.fullName}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {employee.employeeId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(employee.hireDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payroll Management</h3>
            <button className="btn-primary flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Process Payroll
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$45,000</div>
              <div className="text-sm text-gray-600">Total Monthly Payroll</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Employees Paid</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$3,000</div>
              <div className="text-sm text-gray-600">Average Salary</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Leave Management</h3>
          
          <div className="space-y-4">
            {leaves.map((leave) => {
              const employee = employees.find(e => e.employeeId === leave.employeeId);
              return (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{employee?.fullName}</div>
                      <div className="text-sm text-gray-600 capitalize">{leave.type} Leave</div>
                      <div className="text-sm text-gray-500">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()} ({leave.days} days)
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{leave.reason}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                        leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {leave.status}
                      </span>
                      {leave.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Employee</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="text-sm text-blue-800">
                    <strong>Auto-Generated Employee ID:</strong> {employees.length > 0 ? 'LERA-EMP-2025-' + (employees.length + 1).toString().padStart(4, '0') : 'LERA-EMP-2025-0001'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    value={newEmployee.fullName}
                    onChange={(e) => setNewEmployee({...newEmployee, fullName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="john@lera-academy.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+84 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hire Date *</label>
                  <input
                    type="date"
                    value={newEmployee.hireDate}
                    onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position *</label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="English Teacher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department *</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="Management">Management</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Operations">Operations</option>
                    <option value="Administration">Administration</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Salary ($) *</label>
                  <input
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contract Type *</label>
                  <select
                    value={newEmployee.contractType}
                    onChange={(e) => setNewEmployee({...newEmployee, contractType: e.target.value as any})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={newEmployee.emergencyContactName}
                      onChange={(e) => setNewEmployee({...newEmployee, emergencyContactName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={newEmployee.emergencyContactPhone}
                      onChange={(e) => setNewEmployee({...newEmployee, emergencyContactPhone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+84 987 654 321"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                    <select
                      value={newEmployee.emergencyContactRelationship}
                      onChange={(e) => setNewEmployee({...newEmployee, emergencyContactRelationship: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddEmployee(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEmployee}
                disabled={!newEmployee.fullName || !newEmployee.email || !newEmployee.department}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;