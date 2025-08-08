import React, { useState, useEffect } from 'react';
import { useSupabaseApi } from '../../hooks/useSupabaseApi';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  BarChart3,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

interface TaskAssignment {
  id: string;
  status: string;
  progress_percentage: number;
  assigned_at: string;
  due_date: string;
  task: {
    title: string;
    description: string;
    priority: string;
    task_type: string;
  };
}

const EmployeeDashboard = () => {
  const [assignments, setAssignments] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });

  const { callEdgeFunction } = useSupabaseApi();

  useEffect(() => {
    fetchEmployeeTasks();
  }, []);

  const fetchEmployeeTasks = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockAssignments: TaskAssignment[] = [
        {
          id: '1',
          status: 'assigned',
          progress_percentage: 0,
          assigned_at: new Date().toISOString(),
          due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          task: {
            title: 'Monthly Sales Report',
            description: 'Prepare comprehensive sales analysis for Q4',
            priority: 'high',
            task_type: 'administrative'
          }
        },
        {
          id: '2',
          status: 'in_progress',
          progress_percentage: 65,
          assigned_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          task: {
            title: 'Customer Training Module',
            description: 'Develop training materials for new customer onboarding',
            priority: 'medium',
            task_type: 'training'
          }
        },
        {
          id: '3',
          status: 'completed',
          progress_percentage: 100,
          assigned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          task: {
            title: 'Team Performance Review',
            description: 'Complete quarterly performance evaluations',
            priority: 'high',
            task_type: 'assessment'
          }
        }
      ];

      setAssignments(mockAssignments);
      
      // Calculate stats
      const totalTasks = mockAssignments.length;
      const completedTasks = mockAssignments.filter(a => a.status === 'completed').length;
      const pendingTasks = mockAssignments.filter(a => a.status === 'assigned').length;
      const overdueTasks = mockAssignments.filter(a => 
        new Date(a.due_date) < new Date() && a.status !== 'completed'
      ).length;

      setStats({ totalTasks, completedTasks, pendingTasks, overdueTasks });
    } catch (error) {
      console.error('Error fetching employee tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Employee Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back! Here are your assigned tasks.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-3d bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 glow-effect">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 glow-effect">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 glow-effect">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 glow-effect">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overdue</p>
              <p className="text-3xl font-bold text-gray-900">{stats.overdueTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
          My Assigned Tasks
        </h2>
        
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{assignment.task.title}</h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{assignment.task.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className={`h-4 w-4 mr-1 ${getPriorityColor(assignment.task.priority)}`} />
                      <span className={`capitalize ${getPriorityColor(assignment.task.priority)}`}>
                        {assignment.task.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500">Type: {assignment.task.task_type}</span>
                    </div>
                  </div>
                  
                  {assignment.status !== 'completed' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{assignment.progress_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${assignment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  {assignment.status === 'assigned' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      Start Task
                    </button>
                  )}
                  {assignment.status === 'in_progress' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                      Submit
                    </button>
                  )}
                  {assignment.status === 'completed' && (
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm">
                      View Details
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

export default EmployeeDashboard;