import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
  academyStatistics, 
  comprehensiveInstructors,
  studentSuccessStories 
} from '../data/comprehensiveData';
import { GraduationCap, Users, Globe, Award, BookOpen, Star } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.mission.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Certified international and Vietnamese master trainers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Blended learning with live classes and digital practice modules</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="ml-3 text-gray-600">7+ years pioneering modern English education in Northern Vietnam</p>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Students learning"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <img
                  src="/ceo.jpg"
                  alt="Ledia Balliu"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  CEO
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Ms. Ledia Balliu</h3>
              <p className="text-gray-600 mb-2">CEO & Lead IELTS Instructor</p>
              <p className="text-sm text-gray-500">With over 7 years of experience teaching English in Hai Phong, Ms. Ledia has helped hundreds of students achieve their IELTS goals. Her innovative teaching methods and dedication to student success have made ERA Academy a leading English education center.</p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Mo Tran"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  COO
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Mr. Mo Tran</h3>
              <p className="text-gray-600 mb-2">Operations Manager</p>
              <p className="text-sm text-gray-500">As Operations Manager, Mr. Mo ensures smooth day-to-day operations and maintains ERA Academy's high standards of education. His background in business English and management brings valuable expertise to our team.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our International Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Sarah Thompson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold mb-1">Ms. Sarah Thompson</h3>
              <p className="text-gray-600 mb-2">IELTS Speaking Specialist</p>
              <p className="text-sm text-gray-500">Native speaker from the UK with CELTA certification and 5 years of IELTS teaching experience.</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Michael Anderson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold mb-1">Mr. Michael Anderson</h3>
              <p className="text-gray-600 mb-2">Business English Expert</p>
              <p className="text-sm text-gray-500">American teacher with MBA and extensive experience in corporate English training.</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Emma Wilson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold mb-1">Ms. Emma Wilson</h3>
              <p className="text-gray-600 mb-2">Academic Writing Instructor</p>
              <p className="text-sm text-gray-500">Australian educator specializing in IELTS and academic writing instruction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{academyStatistics.yearsOfExcellence}+</div>
              <div className="text-gray-600">{t('about.stats.yearsInHaiPhong')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{(academyStatistics.totalStudents / 1000).toFixed(1)}k+</div>
              <div className="text-gray-600">{t('about.stats.studentsTaught')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{academyStatistics.successRate}%</div>
              <div className="text-gray-600">{t('about.stats.successRate')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{comprehensiveInstructors.length}+</div>
              <div className="text-gray-600">{t('about.stats.expertTeachers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('about.cta.title')}</h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('about.cta.description')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors duration-300">
            {t('about.cta.bookConsultation')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;