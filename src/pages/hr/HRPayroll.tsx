import React, { useState } from 'react';
import { DollarSign, Calendar, Download, Plus, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Payroll, Employee } from '../../types';

const HRPayroll = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([
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
    },
    {
      id: '2',
      employeeId: 'LERA-EMP-2025-0002',
      period: '2024-01',
      baseSalary: 2500,
      overtime: 200,
      bonuses: 0,
      deductions: 250,
      netPay: 2450,
      payDate: '2024-01-31',
      status: 'paid'
    }
  ]);

  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-02');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleProcessPayroll = () => {
    // Mock processing payroll for all employees
    const newPayrolls = [
      {
        id: Date.now().toString(),
        employeeId: 'LERA-EMP-2025-0001',
        period: selectedPeriod,
        baseSalary: 3000,
        overtime: 0,
        bonuses: 0,
        deductions: 300,
        netPay: 2700,
        payDate: new Date().toISOString(),
        status: 'pending' as const
      }
    ];

    setPayrolls([...payrolls, ...newPayrolls]);
    setShowProcessModal(false);
  };

  const totalPayroll = payrolls
    .filter(p => p.period === selectedPeriod)
    .reduce((sum, p) => sum + p.netPay, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Payroll Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowProcessModal(true)}
            className="btn-primary flex items-center"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Process Payroll
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</p>
              <p className="text-sm text-green-600">Current period</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employees Paid</p>
              <p className="text-2xl font-bold text-gray-900">{payrolls.filter(p => p.status === 'paid').length}</p>
              <p className="text-sm text-blue-600">This period</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{payrolls.filter(p => p.status === 'pending').length}</p>
              <p className="text-sm text-yellow-600">Awaiting approval</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pay Period</p>
              <p className="text-2xl font-bold text-gray-900">{selectedPeriod}</p>
              <p className="text-sm text-purple-600">Current</p>
            </div>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Pay Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="2024-02">February 2024</option>
              <option value="2024-01">January 2024</option>
              <option value="2023-12">December 2023</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Total Budget: ${totalPayroll.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Payroll Records - {selectedPeriod}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bonuses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrolls
                .filter(p => p.period === selectedPeriod)
                .map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.employeeId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payroll.baseSalary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payroll.overtime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payroll.bonuses}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${payroll.deductions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${payroll.netPay}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payroll.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payroll.status)}`}>
                        {payroll.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Payroll Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Process Payroll</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pay Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="2024-02">February 2024</option>
                  <option value="2024-03">March 2024</option>
                  <option value="2024-04">April 2024</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800">Processing payroll for all active employees</div>
                    <div className="text-yellow-600">This action will generate payroll records for the selected period</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowProcessModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessPayroll}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
              >
                Process Payroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRPayroll;