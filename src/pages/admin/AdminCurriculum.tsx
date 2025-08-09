import React, { useState, useEffect } from 'react';
import { useSupabaseApi } from '../../hooks/useSupabaseApi';
import { BookOpen, Users, Clock, Award, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

interface CurriculumLevel {
  code: string;
  name: string;
  age_range: string;
  cefr: string;
  description: string;
}

interface CourseMaterial {
  id: string;
  series_name: string;
  publisher: string;
  level_range: string[];
  age_range: string;
  cefr_range: string;
  description: string;
  key_features: string[];
  teaching_hours_per_level: number;
  is_recommended: boolean;
}

const AdminCurriculum = () => {
  const [curriculumLevels, setCurriculumLevels] = useState<CurriculumLevel[]>([]);
  const [courseMaterials, setCourseMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublisher, setFilterPublisher] = useState('');

  const { callEdgeFunction } = useSupabaseApi();

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const [levelsResult, materialsResult] = await Promise.all([
          callEdgeFunction('curriculum-management', { action: 'get_curriculum_levels' }),
          callEdgeFunction('curriculum-management', { action: 'get_course_materials' })
        ]);

        setCurriculumLevels(levelsResult.levels);
        setCourseMaterials(materialsResult.materials);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumData();
  }, [callEdgeFunction]);

  const filteredMaterials = courseMaterials.filter(material => {
    const matchesSearch = material.series_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublisher = !filterPublisher || material.publisher === filterPublisher;
    return matchesSearch && matchesPublisher;
  });

  const publishers = [...new Set(courseMaterials.map(m => m.publisher))];

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
        <h1 className="text-3xl font-bold gradient-text">Curriculum Management</h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Course
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'levels', label: 'Curriculum Levels', icon: Award },
            { key: 'materials', label: 'Course Materials', icon: BookOpen },
            { key: 'progression', label: 'Student Progression', icon: Users },
            { key: 'analytics', label: 'Curriculum Analytics', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
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

      {/* Curriculum Levels Tab */}
      {activeTab === 'levels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumLevels.map((level, index) => (
              <div key={level.code} className="card-3d bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 glow-effect">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    level.code.includes('KG') ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                    level.code.includes('Primary') ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                    level.code.includes('Secondary') ? 'bg-gradient-to-br from-purple-500 to-violet-600' :
                    'bg-gradient-to-br from-emerald-500 to-teal-600'
                  }`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">{level.cefr}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{level.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{level.age_range}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{level.description}</p>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    View Courses
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Materials Tab */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search course materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterPublisher}
                  onChange={(e) => setFilterPublisher(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Publishers</option>
                  {publishers.map(publisher => (
                    <option key={publisher} value={publisher}>{publisher}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="card-3d bg-white rounded-xl shadow-lg border p-6 glow-effect">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{material.series_name}</h3>
                    <p className="text-sm font-medium text-blue-600">{material.publisher}</p>
                  </div>
                  {material.is_recommended && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{material.age_range}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{material.cefr_range}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{material.teaching_hours_per_level} hours per level</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{material.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {material.key_features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
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
        </div>
      )}

      {/* Student Progression Tab */}
      {activeTab === 'progression' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Student Progression Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Students in Kindergarten</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">234</div>
              <div className="text-sm text-gray-600">Students in Primary</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
              <div className="text-sm text-gray-600">Students in IELTS Prep</div>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Curriculum Performance Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Level Advancement Rate</h3>
              <div className="text-2xl font-bold text-orange-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Students advancing on schedule</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Cambridge YLE Success</h3>
              <div className="text-2xl font-bold text-teal-600 mb-1">92%</div>
              <div className="text-sm text-gray-600">Pass rate for YLE exams</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCurriculum;