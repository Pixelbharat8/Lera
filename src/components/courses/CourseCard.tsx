import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { useLanguage } from '../../hooks/useLanguage';
import { showToast } from '../ui/Toast';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Clock, Users, Star, Award, CheckCircle, Play, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  showProgress = false, 
  variant = 'default' 
}) => {
  const { enrollInCourse } = useCourses();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const handleEnrollClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/auth';
      await enrollInCourse(course.id);
      showToast.success(`Successfully enrolled in ${course.title}!`);
    } catch (error) {
      console.error('Enrollment failed:', error);
      showToast.error('Failed to enroll in course. Please try again.');
    }
  };
  
  const renderLevelBadge = () => {
    let colorClass = '';
    
    switch (course.level) {
      case 'beginner':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'intermediate':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'advanced':
        colorClass = 'bg-purple-100 text-purple-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}>
        {t(`course.level.${course.level}`)}
      </span>
    );
  };

  return (
    <Link to={`/courses/${course.id}`} className="group block transform transition-all duration-300 hover:scale-105">
      <div className="card-3d bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50 h-full flex flex-col glow-effect">
        <div className="relative overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {renderLevelBadge()}
            {course.certificate && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {t('course.certificate')}
              </span>
            )}
          </div>
          
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {course.price === 0 ? (
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-2 rounded-xl shadow-lg">
                {t('course.free')}
              </span>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-3 py-2 rounded-xl shadow-lg">
                <div className="text-center">
                  <div>{(course.price / 1000).toFixed(0)}k VND</div>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="text-xs line-through opacity-75">{(course.originalPrice / 1000).toFixed(0)}k</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="h-8 w-8 text-blue-600 ml-1" />
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 flex-1">
            {course.title}
          </h3>
            <div className="ml-2 flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-gray-700 ml-1">{course.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-white shadow-md"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">{course.instructor.name}</div>
              <div className="text-xs text-gray-500">{course.instructor.specializations[0]}</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
            {course.shortDescription || course.description}
          </p>
          
          {/* Course features */}
          {variant === 'detailed' && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {course.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
                {course.features.length > 3 && (
                  <span className="text-xs text-gray-500">+{course.features.length - 3} more</span>
                )}
              </div>
            </div>
          )}
          
          {showProgress && course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-gray-800">{course.progress}%</span>
              </div>
              <div className="w-full h-3 progress-3d">
                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200/50 pt-4 mt-auto">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-medium">{course.totalDuration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-indigo-500" />
                <span className="font-medium">{course.totalLessons} {t('course.lessons')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                <span className="font-medium">
                  <AnimatedCounter end={course.enrollmentCount} />
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Award className="h-4 w-4 mr-2 text-purple-500" />
                <span className="font-medium">{course.difficulty}/5</span>
              </div>
            </div>
            
            {/* Enrollment status */}
            {course.enrolled ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{t('course.enrolled')}</span>
                </div>
                <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium hover:bg-green-200 transition-all duration-300 hover:scale-105">
                  {t('course.continueLearning')}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <AnimatedCounter end={course.completionRate} suffix="%" /> {t('course.completionRate')}
                </div>
                <button 
                  onClick={handleEnrollClick}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg btn-interactive"
                >
                  Enroll Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;