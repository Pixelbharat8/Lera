import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useLanguage } from '../hooks/useLanguage';
import CourseCard from '../components/courses/CourseCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import InViewAnimation from '../components/ui/InViewAnimation';
import { 
  academyStatistics, 
  studentSuccessStories,
  comprehensiveInstructors 
} from '../data/comprehensiveData';
import { Rocket, Trophy, Clock, Users, ArrowRight, BookOpen, GraduationCap, Star, Globe, Play, CheckCircle, Award } from 'lucide-react';

const HomePage = () => {
  const { getFeaturedCourses, getPopularCourses, categories } = useCourses();
  const { t } = useLanguage();
  
  const featuredCourses = getFeaturedCourses(8);
  const popularCourses = getPopularCourses(6);

  const platformStats = [
    { icon: GraduationCap, label: t('home.stats.expertTeachers'), value: 15, suffix: '+', color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: t('home.stats.activeStudents'), value: academyStatistics.totalStudents, suffix: '+', color: 'from-indigo-500 to-purple-600' },
    { icon: Trophy, label: t('home.stats.successRate'), value: 95, suffix: '%', color: 'from-purple-500 to-pink-600' },
    { icon: BookOpen, label: t('home.stats.courseCategories'), value: categories.length, suffix: '+', color: 'from-pink-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-morph text-white relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl float-animation"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/20 rounded-lg rotate-45 float-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-40 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl float-animation" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-400/20 rounded-lg rotate-12 float-animation" style={{animationDelay: '6s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <InViewAnimation animation="fade-in-left" delay={200}>
              <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight holographic">
                {t('home.hero.title')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                  {t('home.hero.subtitle')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                {t('home.hero.description')}
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>AI-Powered Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Live Expert Classes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Personalized Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>95% Success Rate</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/courses"
                  className="btn-3d inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-2xl text-blue-700 bg-white/95 backdrop-blur-sm border border-white/30"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  {t('home.hero.startLearning')}
                </Link>
                <Link
                  to="/teacher-registration"
                  className="btn-3d inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-2xl text-white border-2 border-white/40 glass-effect"
                >
                  <Trophy className="mr-3 h-6 w-6" />
                  Join Our Team
                </Link>
              </div>
              </div>
            </InViewAnimation>
            <InViewAnimation animation="fade-in-right" delay={400} className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-3xl transform rotate-6"></div>
                <img 
                  src="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Students learning English" 
                  className="relative rounded-3xl shadow-2xl transform -rotate-3 transition-all duration-700 hover:rotate-0 hover:scale-105 border-4 border-white/30 tilt-effect"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/80 rounded-full flex items-center justify-center pulse-glow">
                  <Star className="h-12 w-12 text-white" />
                </div>
              </div>
            </InViewAnimation>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <InViewAnimation animation="fade-in-left">
              <div className="relative">
                <img
                src="/ceo.jpg"
                alt="Ms. Ledia Balliu"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">7+</div>
                    <div className="text-sm">Years Excellence</div>
                  </div>
                </div>
              </div>
            </InViewAnimation>
            <InViewAnimation animation="fade-in-right" delay={300}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">Ms. Ledia Balliu</h3>
                  <p className="text-lg text-gray-600">CEO & Lead IELTS Master Trainer</p>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  World-Class English Education in 
                  <span className="text-blue-600"> Northern Vietnam</span>
                </h2>
                
              <p className="text-lg text-gray-600 mb-6">
                  With over 7 years of pioneering experience in English education in Hai Phong, Ms. Ledia Balliu has transformed LERA Academy into Vietnam's premier English learning destination. Using revolutionary international methodologies, we combine world-class standards with innovative AI technology to deliver exceptional results.
              </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-semibold text-gray-900">95% Success Rate</span>
                    </div>
                    <p className="text-sm text-gray-600">Proven results with international methodology</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">Global Standards</span>
                    </div>
                    <p className="text-sm text-gray-600">Cambridge & Oxford partnerships</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-gray-900">Blended Learning</span>
                    </div>
                    <p className="text-sm text-gray-600">Live classes + AI-powered modules</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="font-semibold text-gray-900">Expert Trainers</span>
                    </div>
                    <p className="text-sm text-gray-600">International certified instructors</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">{t('home.popular.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.popular.description')}
            </p>
          </InViewAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map(course => (
              <InViewAnimation key={course.id} animation="fade-in-up" delay={100} className="card-3d">
                <CourseCard course={course} />
              </InViewAnimation>
            ))}
          </div>
          
          <InViewAnimation animation="fade-in-up" delay={500} className="mt-12 text-center">
            <Link
              to="/courses"
              className="btn-primary inline-flex items-center text-lg px-8 py-4"
            >
              {t('home.popular.viewAll')} <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </InViewAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LERA Academy?</h2>
            <p className="text-xl text-gray-600">Leading English education in Northern Vietnam</p>
          </InViewAnimation>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <InViewAnimation key={index} animation="fade-in-up" delay={index * 100} className="card-3d p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 glow-effect text-center hover-lift">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                </div>
              </InViewAnimation>
            ))}
          </div>
          
          {/* Additional Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <InViewAnimation animation="fade-in-up" delay={200} className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={academyStatistics.yearsOfExcellence} suffix="+" />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Years in Hai Phong</div>
              <div className="text-sm text-gray-600">Pioneering modern English education in Northern Vietnam</div>
            </InViewAnimation>
            
            <InViewAnimation animation="fade-in-up" delay={400} className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Learning Support</div>
              <div className="text-sm text-gray-600">AI-powered assistance and expert guidance anytime</div>
            </InViewAnimation>
            
            <InViewAnimation animation="fade-in-up" delay={600} className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl hover-lift">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter end={academyStatistics.successRate} suffix="%" />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Satisfaction</div>
              <div className="text-sm text-gray-600">Money-back guarantee with our proven methodology</div>
            </InViewAnimation>
          </div>
        </div>
      </section>

      {/* Learning Experience Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 neon-glow">Revolutionary Learning Experience</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover how our innovative approach transforms English learning
            </p>
          </InViewAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InViewAnimation animation="fade-in-up" delay={200} className="glass-effect p-8 rounded-2xl text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Interactive Learning</h3>
              <p className="text-white/80">
                Engage with AI-powered interactive content, real-time feedback, and immersive learning experiences.
              </p>
            </InViewAnimation>
            
            <InViewAnimation animation="fade-in-up" delay={400} className="glass-effect p-8 rounded-2xl text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Expert Classes</h3>
              <p className="text-white/80">
                Learn directly from certified international instructors in small, focused live classes.
              </p>
            </InViewAnimation>
            
            <InViewAnimation animation="fade-in-up" delay={600} className="glass-effect p-8 rounded-2xl text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Guaranteed Results</h3>
              <p className="text-white/80">
                Achieve your English goals with our proven methodology and 95% success rate guarantee.
              </p>
            </InViewAnimation>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">{t('home.featured.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.featured.description')}
            </p>
          </InViewAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredCourses.map(course => (
              <InViewAnimation key={course.id} animation="fade-in-up" delay={100} className="card-3d">
                <CourseCard course={course} />
              </InViewAnimation>
            ))}
          </div>
          
          <InViewAnimation animation="fade-in-up" delay={800} className="mt-16 text-center">
            <Link
              to="/courses"
              className="btn-primary inline-flex items-center text-lg px-8 py-4"
            >
              {t('home.featured.exploreAll')} <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </InViewAnimation>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Course Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our specialized course categories designed for your learning goals
            </p>
          </InViewAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                to={`/courses?category=${encodeURIComponent(category.name)}`} 
                key={category.id} 
                className="group"
              >
                <InViewAnimation animation="fade-in-up" delay={index * 100}>
                  <div className="card-3d bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 glow-effect group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 hover-lift">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.courseCount} courses</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className="font-medium text-gray-700">{category.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{category.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-gray-700">{category.averageRating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-1">
                      {category.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {category.features.length > 2 && (
                        <span className="text-xs text-gray-500">+{category.features.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>
                </InViewAnimation>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InViewAnimation animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our successful students</p>
          </InViewAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentSuccessStories.slice(0, 3).map((testimonial, index) => (
              <InViewAnimation key={index} animation="fade-in-up" delay={index * 200} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover-lift">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.studentName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.studentName}</h4>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.achievement}</p>
                    <p className="text-xs text-gray-500">{testimonial.course}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.story}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </InViewAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-morph text-white relative overflow-hidden">
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <InViewAnimation animation="fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 neon-glow">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-12">
              {t('home.cta.description')}
            </p>
          </InViewAnimation>
          
          <InViewAnimation animation="fade-in-up" delay={400} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/courses"
              className="btn-3d inline-flex items-center px-12 py-6 text-xl font-bold rounded-2xl text-blue-700 bg-white/95 backdrop-blur-sm border border-white/30"
            >
              <Rocket className="mr-4 h-8 w-8" />
              Explore Courses
            </Link>
            
            <Link
              to="/contact"
              className="btn-3d inline-flex items-center px-12 py-6 text-xl font-bold rounded-2xl text-white border-2 border-white/40 glass-effect"
            >
              <Users className="mr-4 h-8 w-8" />
              {t('home.cta.bookConsultation')}
            </Link>
          </InViewAnimation>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <InViewAnimation animation="fade-in-up" delay={600} className="glass-effect p-6 rounded-xl hover-glow">
              <div className="text-2xl font-bold mb-2">{t('home.cta.freePlacementTest')}</div>
              <div className="text-white/80">AI-powered assessment</div>
            </InViewAnimation>
            <InViewAnimation animation="fade-in-up" delay={800} className="glass-effect p-6 rounded-xl hover-glow">
              <div className="text-2xl font-bold mb-2">{t('home.cta.guarantee')}</div>
              <div className="text-white/80">Money-back promise</div>
            </InViewAnimation>
            <InViewAnimation animation="fade-in-up" delay={1000} className="glass-effect p-6 rounded-xl hover-glow">
              <div className="text-2xl font-bold mb-2">{t('home.cta.support')}</div>
              <div className="text-white/80">Always here to help</div>
            </InViewAnimation>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;