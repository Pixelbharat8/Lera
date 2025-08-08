import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../components/ui/Toast';
import { Star, Award, Clock, Users, CheckCircle, Lock, Play, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourse, getLessonsByCourse, enrollInCourse } = useCourses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const course = getCourse(courseId || '');
  const lessons = getLessonsByCourse(courseId || '');
  
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <p className="mt-2 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }
  
  // Group lessons by sections (for demo, creating sections based on order)
  const sections = lessons.reduce((acc, lesson) => {
    const sectionIndex = Math.floor((lesson.order - 1) / 5);
    const sectionName = `Section ${sectionIndex + 1}`;
    
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    
    acc[sectionName].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);
  
  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    enrollInCourse(course.id).catch(error => {
      showToast.error('Failed to enroll. Please try again.');
    });
  };
  
  const toggleSection = (sectionName: string) => {
    if (expandedSection === sectionName) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionName);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course header with colored background */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="md:flex-1">
                <div className="mb-3 flex items-center">
                  <span className="bg-blue-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center text-yellow-300">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span>{course.rating.toFixed(1)}</span>
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-blue-100 mb-6 text-lg">{course.description}</p>
                
                <div className="flex items-center mb-6">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-white"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-xs text-blue-200">{course.instructor.bio.split(' ').slice(0, 6).join(' ')}...</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-blue-700/50 rounded-lg p-3">
                    <Award className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm">{course.level.charAt(0).toUpperCase() + course.level.slice(1)}</p>
                  </div>
                  <div className="bg-blue-700/50 rounded-lg p-3">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm">{course.totalDuration}</p>
                  </div>
                  <div className="bg-blue-700/50 rounded-lg p-3">
                    <Users className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm">{course.totalLessons} lessons</p>
                  </div>
                  <div className="bg-blue-700/50 rounded-lg p-3">
                    <Play className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm">On-demand</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-96 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                {course.thumbnail && (
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="mb-4 flex items-baseline">
                    <span className="text-3xl font-bold">{(course.price / 1000).toFixed(0)}k VND</span>
                    {course.price < 100 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">{((course.price * 1.3) / 1000).toFixed(0)}k VND</span>
                    )}
                  </div>
                  
                  {course.enrolled ? (
                    <Link
                      to={`/lesson/${lessons[0]?.id}`}
                      className="block w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-center font-medium rounded-md transition-colors duration-300"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md transition-colors duration-300"
                    >
                      Enroll Now
                    </button>
                  )}
                  
                  <div className="mt-4">
                    <p className="text-center text-sm text-gray-500">30-Day Money-Back Guarantee</p>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">Full lifetime access</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">Access on mobile and desktop</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">Certificate of completion</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">Downloadable resources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
              <div className="mb-4 flex items-center text-gray-600 text-sm">
                <span>{Object.keys(sections).length} sections</span>
                <span className="mx-2">•</span>
                <span>{lessons.length} lectures</span>
                <span className="mx-2">•</span>
                <span>{course.totalDuration} total length</span>
              </div>
              
              <div className="border rounded-lg divide-y">
                {Object.entries(sections).map(([sectionName, sectionLessons]) => (
                  <div key={sectionName} className="overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
                      onClick={() => toggleSection(sectionName)}
                    >
                      <span>{sectionName} ({sectionLessons.length} lectures)</span>
                      {expandedSection === sectionName ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSection === sectionName && (
                      <div className="bg-gray-50 divide-y">
                        {sectionLessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 flex items-start">
                            {course.enrolled ? (
                              <Link 
                                to={`/lesson/${lesson.id}`}
                                className="flex items-start text-sm hover:text-blue-600 transition-colors duration-300 w-full"
                              >
                                <Play className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="font-medium">{lesson.title}</div>
                                  <p className="text-gray-500 text-xs mt-1">{lesson.duration}</p>
                                </div>
                                {lesson.completed && (
                                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                )}
                              </Link>
                            ) : (
                              <div className="flex items-start text-sm w-full">
                                <Lock className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="font-medium text-gray-600">{lesson.title}</div>
                                  <p className="text-gray-500 text-xs mt-1">{lesson.duration}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Instructor</h2>
              <div className="flex items-start mb-6">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="h-20 w-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                  <p className="text-gray-600 text-sm">{course.instructor.bio}</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3">
                    <p className="text-2xl font-bold text-gray-900">10+</p>
                    <p className="text-sm text-gray-600">Courses</p>
                  </div>
                  <div className="p-3">
                    <p className="text-2xl font-bold text-gray-900">15,000+</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div className="p-3">
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Courses</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-20 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      <img 
                        src={`https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-sm line-clamp-2">Advanced Techniques for Data Scientists</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">4.9</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">$79.99</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  to="/courses"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all courses <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;