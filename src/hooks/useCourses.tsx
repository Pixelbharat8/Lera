/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { Course, Lesson, SearchFilters, CourseStats } from '../types/index';
import { supabase } from '../lib/supabase';
import { 
  mockCourses, 
  mockLessons, 
  courseCategories, 
  learningPaths,
  allInstructors,
  allCourses,
  allLessons,
  allCategories,
  allLearningPaths
} from '../data/mockData';
import { showToast } from '../components/ui/Toast';

interface CourseContextType {
  courses: Course[];
  lessons: Lesson[];
  categories: typeof courseCategories;
  learningPaths: typeof learningPaths;
  isLoading: boolean;
  error: string | null;
  getCourse: (id: string) => Course | undefined;
  getLessonsByCourse: (courseId: string) => Lesson[];
  getLesson: (id: string) => Lesson | undefined;
  enrollInCourse: (courseId: string) => Promise<void>;
  markLessonComplete: (lessonId: string) => Promise<void>;
  searchCourses: (filters: SearchFilters) => Course[];
  getPopularCourses: (limit?: number) => Course[];
  getFeaturedCourses: (limit?: number) => Course[];
  getCoursesByCategory: (category: string) => Course[];
  getCoursesByLevel: (level: string) => Course[];
  getCourseStats: (courseId: string) => CourseStats | null;
  getRecommendedCourses: (userId?: string) => Course[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load mock data immediately for demo
      console.log('Loading mock courses:', mockCourses.length);
      setCourses(mockCourses);
      setLessons(mockLessons);
      
      console.log('Courses loaded successfully:', mockCourses.length);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadC ourses]);
  const getCourse = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const getLessonsByCourse = (courseId: string) => {
    return lessons
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  };

  const getLesson = (id: string) => {
    return lessons.find(lesson => lesson.id === id);
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to enroll');
      }

      // For demo purposes, just update local state
      console.log('Enrolling user in course:', courseId);

      // Update local state
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === courseId
            ? { ...course, enrolled: true, progress: 0 }
            : course
        )
      );

      // Trigger workflow automation
      const course = courses.find(c => c.id === courseId);
      if (course) {
        showToast.success(`Welcome to ${course.title}! Check your notifications for next steps.`);
      }
    } catch (err) {
      console.error('Failed to enroll in course:', err);
      throw err;
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    try {
      if (!user) return;
      
      // For demo purposes, just update local state
      console.log('Marking lesson complete:', lessonId);

      // Update local state
      setLessons(prevLessons =>
        prevLessons.map(lesson =>
          lesson.id === lessonId
            ? { ...lesson, completed: true }
            : lesson
        )
      );

      // Update course progress
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        const courseLessons = lessons.filter(l => l.courseId === lesson.courseId);
        const completedLessons = courseLessons.filter(l => l.completed || l.id === lessonId).length;
        const progressPercentage = Math.round((completedLessons / courseLessons.length) * 100);

        // Update local course progress for demo
        console.log('Updating course progress:', progressPercentage);

        // Update local course progress
        setCourses(prevCourses =>
          prevCourses.map(course =>
            course.id === lesson.courseId
              ? { ...course, progress: progressPercentage }
              : course
          )
        );
        
        // Show progress notification
        if (progressPercentage === 100) {
          showToast.success('🎉 Congratulations! You completed the course!');
        } else {
          showToast.success('Lesson completed! Keep up the great work!');
        }
      }
    } catch (err) {
      console.error('Failed to mark lesson as complete:', err);
      throw new Error('Failed to mark lesson as complete');
    }
  };

  const searchCourses = (filters: SearchFilters) => {
    let filteredCourses = [...courses];

    // Apply search query
    if (filters.query && filters.query.trim()) {
      const query = filters.query.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredCourses = filteredCourses.filter(course => course.price >= min && course.price <= max);
    }

    // Apply rating filter
    if (filters.rating) {
      filteredCourses = filteredCourses.filter(course => course.rating >= filters.rating);
    }

    // Apply duration filter
    if (filters.duration) {
      filteredCourses = filteredCourses.filter(course => {
        const hours = parseInt(course.totalDuration);
        switch (filters.duration) {
          case 'short': return hours <= 20;
          case 'medium': return hours > 20 && hours <= 50;
          case 'long': return hours > 50;
          default: return true;
        }
      });
    }

    // Apply language filter
    if (filters.language) {
      filteredCourses = filteredCourses.filter(course => course.language === filters.language);
    }

    // Apply features filter
    if (filters.features && filters.features.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        filters.features!.some(feature => course.features.includes(feature))
      );
    }

    // Apply instructor filter
    if (filters.instructor) {
      filteredCourses = filteredCourses.filter(course => course.instructor.id === filters.instructor);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredCourses.sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case 'popularity':
            comparison = b.enrollmentCount - a.enrollmentCount;
            break;
          case 'rating':
            comparison = b.rating - a.rating;
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'newest':
            comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            break;
          case 'alphabetical':
            comparison = a.title.localeCompare(b.title);
            break;
          default:
            comparison = 0;
        }
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return filteredCourses;
  };

  const getPopularCourses = (limit = 6) => {
    return courses
      .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
      .slice(0, limit);
  };

  const getFeaturedCourses = (limit = 8) => {
    return courses
      .filter(course => course.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  const getCoursesByCategory = (category: string) => {
    return courses.filter(course => course.category === category);
  };

  const getCoursesByLevel = (level: string) => {
    return courses.filter(course => course.level === level);
  };

  const getCourseStats = (courseId: string): CourseStats | null => {
    const course = getCourse(courseId);
    if (!course) return null;

    return {
      totalEnrollments: course.enrollmentCount,
      averageRating: course.rating,
      completionRate: course.completionRate,
      averageTimeToComplete: course.estimatedHours,
      studentSatisfaction: course.rating * 20, // Convert to percentage
      certificatesIssued: Math.round(course.enrollmentCount * (course.completionRate / 100)),
      revenueGenerated: course.enrollmentCount * course.price,
      refundRate: 5 // Mock data
    };
  };

  const getRecommendedCourses = (userId?: string) => {
    // Simple recommendation based on popular and highly rated courses
    return courses
      .filter(course => course.rating >= 4.7)
      .sort((a, b) => (b.rating * b.enrollmentCount) - (a.rating * a.enrollmentCount))
      .slice(0, 6);
  };

  return (
    <CourseContext.Provider value={{
      courses,
      lessons,
      categories: allCategories,
      learningPaths: allLearningPaths,
      isLoading,
      error,
      getCourse,
      getLessonsByCourse,
      getLesson,
      enrollInCourse,
      markLessonComplete,
      searchCourses,
      getPopularCourses,
      getFeaturedCourses,
      getCoursesByCategory,
      getCoursesByLevel,
      getCourseStats,
      getRecommendedCourses
    }}>
      {children}
    </CourseContext.Provider>
  );
};