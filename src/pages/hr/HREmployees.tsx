import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Eye,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { EmployeeIdGenerator } from '../../utils/employeeIdGenerator';
import { Employee } from '../../types';

const HREmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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
    emergencyContactRelationship: '',
    address: '',
    bankAccountNumber: '',
    bankName: ''
  });

  const departments = ['Teaching', 'Management', 'Operations', 'Administration', 'HR', 'IT', 'Marketing'];
  const positions = [
    'English Teacher', 'IELTS Instructor', 'Business English Trainer', 'Academic Director',
    'Operations Manager', 'Student Advisor', 'HR Manager', 'Marketing Coordinator',
    'IT Support', 'Administrative Assistant', 'Finance Officer'
  ];

  const handleCreateEmployee = async () => {
    try {
      const employeeId = await EmployeeIdGenerator.generateEmployeeId();
      
      const employee: Employee = {
        id: Date.now().toString(),
        employeeId,
        userId: '', // Would be linked after user account creation
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
        bankDetails: newEmployee.bankAccountNumber ? {
          accountNumber: newEmployee.bankAccountNumber,
          bankName: newEmployee.bankName
        } : undefined,
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setEmployees([...employees, employee]);
      setShowAddModal(false);
      resetForm();
      
      // Show success message with employee ID
      alert(`Employee created successfully!\nEmployee ID: ${employeeId}`);
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Error creating employee. Please try again.');
    }
  };

  const resetForm = () => {
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
      emergencyContactRelationship: '',
      address: '',
      bankAccountNumber: '',
      bankName: ''
    });
  };

  const handleExportEmployees = () => {
    const csvContent = [
      ['Employee ID', 'Name', 'Email', 'Department', 'Position', 'Hire Date', 'Salary', 'Status'],
      ...employees.map(emp => [
        emp.employeeId,
        emp.fullName,
        emp.email,
        emp.department,
        emp.position,
        emp.hireDate,
        emp.salary.toString(),
        emp.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || emp.department === filterDepartment;
    const matchesStatus = !filterStatus || emp.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Employee Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleExportEmployees}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddEmployee(true)}
            className="btn-primary flex items-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{employees.filter(e => e.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">{departments.length}</div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-orange-600">
            {employees.length > 0 ? Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length) : 0}
          </div>
          <div className="text-sm text-gray-600">Avg Salary</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees, ID, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{employee.fullName}</h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <div className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">
                  {employee.employeeId}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {employee.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>${employee.salary}/month</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedEmployee(employee)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Employees Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterDepartment || filterStatus 
              ? "No employees match your current filters"
              : "Get started by adding your first employee"
            }
          </p>
          {!searchTerm && !filterDepartment && !filterStatus && (
            <button
              onClick={() => setShowAddEmployee(true)}
              className="btn-primary"
            >
              Add First Employee
            </button>
          )}
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Employee</h3>
              <button
                onClick={() => setShowAddEmployee(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Employee ID Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-blue-800">Auto-Generated Employee ID</div>
                  <div className="text-sm text-blue-600 font-mono">
                    LERA-EMP-{new Date().getFullYear()}-{(employees.length + 1).toString().padStart(4, '0')}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateEmployee(); }} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newEmployee.fullName}
                      onChange={(e) => setNewEmployee({...newEmployee, fullName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="john@lera-academy.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+84 123 456 789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={newEmployee.address}
                      onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Employment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position *</label>
                    <select
                      required
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Position</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department *</label>
                    <select
                      required
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hire Date *</label>
                    <input
                      type="date"
                      required
                      value={newEmployee.hireDate}
                      onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monthly Salary ($) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value) || 0})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="2000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Contract Type *</label>
                    <select
                      required
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
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input
                      type="text"
                      value={newEmployee.emergencyContactName}
                      onChange={(e) => setNewEmployee({...newEmployee, emergencyContactName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
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
                      <option value="Child">Child</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bank Details (Optional) */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Bank Details (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      value={newEmployee.bankName}
                      onChange={(e) => setNewEmployee({...newEmployee, bankName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Bank name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <input
                      type="text"
                      value={newEmployee.bankAccountNumber}
                      onChange={(e) => setNewEmployee({...newEmployee, bankAccountNumber: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Account number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddEmployee(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Employee Details</h3>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-gray-500" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{selectedEmployee.fullName}</h4>
                <p className="text-gray-600">{selectedEmployee.position}</p>
                <div className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded mt-2 inline-block">
                  {selectedEmployee.employeeId}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Contact Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Employment Details</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 font-medium">{selectedEmployee.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Hire Date:</span>
                      <span className="ml-2 font-medium">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Salary:</span>
                      <span className="ml-2 font-medium">${selectedEmployee.salary}/month</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Contract:</span>
                      <span className="ml-2 font-medium capitalize">{selectedEmployee.contractType.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEmployee.emergencyContact && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Emergency Contact</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium">{selectedEmployee.emergencyContact.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium">{selectedEmployee.emergencyContact.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Relationship:</span>
                        <span className="ml-2 font-medium">{selectedEmployee.emergencyContact.relationship}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HREmployees;