import React, { useState, useEffect } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useLanguage } from '../hooks/useLanguage';
import { SearchFilters } from '../types';
import CourseCard from '../components/courses/CourseCard';
import { Search, Filter, CheckCircle, SlidersHorizontal, Star, Clock, DollarSign, Users, BookOpen, ArrowRight } from 'lucide-react';
import LoadingCard from '../components/ui/LoadingCard';
import InViewAnimation from '../components/ui/InViewAnimation';

const CoursesPage = () => {
  const { searchCourses, categories, courses } = useCourses();
  const { t } = useLanguage();
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    level: '',
    priceRange: [0, 500],
    rating: 0,
    duration: '',
    sortBy: 'popularity',
    sortOrder: 'desc'
  });
  
  // Apply filters when courses load or filters change
  useEffect(() => {
    if (courses.length > 0) {
      console.log('Applying filters with courses:', courses.length);
      console.log('Current filters:', filters);
    }
    if (courses && courses.length > 0) {
      console.log('Applying filters to', courses.length, 'courses');
      console.log('Current filters:', filters);
      const result = searchCourses(filters);
      console.log('Filtered results:', result.length);
      setFilteredCourses(result);
    } else {
      console.log('No courses available to filter');
      setFilteredCourses([]);
    }

  // Initialize with all courses when component mounts
  // Clear filters when courses first load to show all courses
    if (courses.length > 0) {
    if (courses && courses.length > 0) {
      console.log('Courses loaded, initializing display with', courses.length, 'courses');
      // Immediately set filtered courses to show all
      setFilteredCourses(courses);
    }
    }
  }, [courses, filters, searchCourses]);
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    console.log('Updating filter:', key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleResetFilters = () => {
    console.log('Resetting filters');
    setFilters({
      query: '',
      category: '',
      level: '',
      priceRange: [0, 500],
      rating: 0,
      duration: '',
      sortBy: 'popularity',
      sortOrder: 'desc'
    });
  };

  const levels = ['beginner', 'intermediate', 'advanced'];
  const durations = [
    { value: 'short', label: 'Short (≤20 hours)' },
    { value: 'medium', label: 'Medium (21-50 hours)' },
    { value: 'long', label: 'Long (50+ hours)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <InViewAnimation animation="fade-in-up" className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-6">{t('courses.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('courses.description')}
          </p>
        </InViewAnimation>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <InViewAnimation animation="fade-in-up" delay={100} className="bg-white p-4 rounded-lg shadow-sm text-center hover-lift">
            <div className="text-2xl font-bold text-blue-600">{filteredCourses.length}</div>
            <div className="text-sm text-gray-600">{t('courses.stats.available')}</div>
          </InViewAnimation>
          <InViewAnimation animation="fade-in-up" delay={200} className="bg-white p-4 rounded-lg shadow-sm text-center hover-lift">
            <div className="text-2xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-gray-600">{t('courses.stats.categories')}</div>
          </InViewAnimation>
          <InViewAnimation animation="fade-in-up" delay={300} className="bg-white p-4 rounded-lg shadow-sm text-center hover-lift">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">{t('courses.stats.avgRating')}</div>
          </InViewAnimation>
          <InViewAnimation animation="fade-in-up" delay={400} className="bg-white p-4 rounded-lg shadow-sm text-center hover-lift">
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-gray-600">{t('courses.stats.successRate')}</div>
          </InViewAnimation>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile filter toggle */}
          <button
            className="md:hidden flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium mb-4"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="mr-2 h-5 w-5" />
            {filtersVisible ? t('common.close') : t('common.filter')}
          </button>
          
          {/* Enhanced Filters sidebar */}
          <div className={`${filtersVisible ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-4 border border-gray-200 transition-all duration-300`}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="mr-2 h-5 w-5 text-blue-600" />
                {t('courses.search.title')}
              </h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('courses.search.placeholder')}
                  value={filters.query || ''}
                  onChange={(e) => updateFilter('query', e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                {t('courses.filter.level')}
              </h3>
              <div className="space-y-3">
                {levels.map(level => (
                  <label key={level} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="level"
                      checked={filters.level === level}
                      onChange={() => updateFilter('level', filters.level === level ? '' : level)}
                      className="sr-only"
                    />
                    <button
                      onClick={() => updateFilter('level', filters.level === level ? '' : level)}
                      className={`flex items-center w-full p-3 rounded-lg border transition-all ${
                        filters.level === level 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      } duration-300 hover:scale-105`}
                    >
                      <CheckCircle className={`mr-3 h-5 w-5 ${filters.level === level ? 'text-blue-600' : 'text-gray-300'}`} />
                      {t(`course.level.${level}`)}
                    </button>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-green-600" />
                {t('courses.filter.category')}
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.name}
                      onChange={() => updateFilter('category', filters.category === category.name ? '' : category.name)}
                      className="sr-only"
                    />
                    <button
                      onClick={() => updateFilter('category', filters.category === category.name ? '' : category.name)}
                      className={`flex items-center w-full p-2 rounded-lg text-sm transition-all ${
                        filters.category === category.name 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50 text-gray-700'
                      } duration-300 hover:translate-x-2`}
                    >
                      <span className="text-lg mr-2">{category.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.courseCount} courses</div>
                      </div>
                      <CheckCircle className={`h-4 w-4 ${filters.category === category.name ? 'text-blue-600' : 'text-gray-300'}`} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-600" />
                {t('courses.filter.duration')}
              </h3>
              <div className="space-y-2">
                {durations.map(duration => (
                  <label key={duration.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      checked={filters.duration === duration.value}
                      onChange={() => updateFilter('duration', filters.duration === duration.value ? '' : duration.value)}
                      className="sr-only"
                    />
                    <button
                      onClick={() => updateFilter('duration', filters.duration === duration.value ? '' : duration.value)}
                      className={`flex items-center w-full p-2 rounded-lg text-sm transition-all ${
                        filters.duration === duration.value 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'hover:bg-gray-50 text-gray-700'
                      } duration-300 hover:translate-x-2`}
                    >
                      <CheckCircle className={`mr-3 h-4 w-4 ${filters.duration === duration.value ? 'text-purple-600' : 'text-gray-300'}`} />
                      {duration.label}
                    </button>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                {t('courses.filter.priceRange')}
              </h3>
              <div className="space-y-4">
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="12000000"
                    step="500000"
                    value={filters.priceRange?.[1] || 12000000}
                    onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-3 text-sm font-medium text-gray-700">
                    <span>0 VND</span>
                    <span>{((filters.priceRange?.[1] || 12000000) / 1000000).toFixed(1)}M VND</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                {t('courses.filter.rating')}
              </h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                      className="sr-only"
                    />
                    <button
                      onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                      className={`flex items-center w-full p-2 rounded-lg text-sm transition-all ${
                        filters.rating === rating 
                          ? 'bg-yellow-50 text-yellow-700' 
                          : 'hover:bg-gray-50 text-gray-700'
                      } duration-300 hover:translate-x-2`}
                    >
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span>{rating}+ stars</span>
                      <CheckCircle className={`ml-auto h-4 w-4 ${filters.rating === rating ? 'text-yellow-600' : 'text-gray-300'}`} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleResetFilters}
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 bg-white font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 btn-interactive hover:scale-105"
            >
              {t('courses.filter.reset')}
            </button>
          </div>
          
          {/* Enhanced Course grid */}
          <div className="flex-1">
            {/* Results header */}
            <InViewAnimation animation="fade-in-down" className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-4 sm:mb-0">
                <p className="text-lg font-semibold text-gray-900">
                  {filteredCourses.length} {t('courses.found')}
                </p>
                <p className="text-xs text-gray-500">
                  Debug: Total courses: {courses.length}, Filtered: {filteredCourses.length}
                </p>
                <p className="text-sm text-gray-600">
                  {filters.query && `Results for "${filters.query}"`}
                  {filters.category && ` in ${filters.category}`}
                  {filters.level && ` • ${filters.level} level`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 mr-2">{t('courses.sort.by')}</span>
                  <select 
                    value={filters.sortBy || 'popularity'}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="popularity">{t('courses.sort.popular')}</option>
                    <option value="rating">{t('courses.sort.rating')}</option>
                    <option value="newest">{t('courses.sort.newest')}</option>
                    <option value="price">{t('courses.sort.price')}</option>
                    <option value="alphabetical">{t('courses.sort.alphabetical')}</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <select 
                    value={filters.sortOrder || 'desc'}
                    onChange={(e) => updateFilter('sortOrder', e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="desc">{t('courses.sort.order.highToLow')}</option>
                    <option value="asc">{t('courses.sort.order.lowToHigh')}</option>
                  </select>
                </div>
              </div>
            </InViewAnimation>
            
            {/* Course grid */}
            {filteredCourses.length > 0 ? (
              <>
                {/* Loading skeleton for better UX */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <InViewAnimation key={course.id} animation="fade-in-up" delay={50} className="card-3d">
                    <CourseCard course={course} />
                  </InViewAnimation>
                ))}
              </div>
              </>
            ) : (
              <InViewAnimation animation="fade-in-up" className="text-center py-20 bg-white rounded-xl shadow-lg">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('courses.noResults.title')}</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {t('courses.noResults.description')}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary inline-flex items-center px-6 py-3 btn-interactive hover:scale-105"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  {t('courses.filter.reset')}
                </button>
              </InViewAnimation>
            )}
            
            {/* Load more button (for pagination) */}
            {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
              <InViewAnimation animation="fade-in-up" delay={200} className="text-center mt-12">
                <button className="btn-secondary inline-flex items-center px-8 py-3 btn-interactive hover:scale-105">
                  {t('courses.loadMore')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </InViewAnimation>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;