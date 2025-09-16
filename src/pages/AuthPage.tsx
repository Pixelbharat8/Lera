import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../components/ui/Toast';
import { BookOpen, User, Mail, Phone, GraduationCap, MapPin, Save, Users } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specializations: '',
    qualifications: '',
    experience: '',
    location: '',
    availability: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get existing teachers from localStorage
      const existingTeachers = JSON.parse(localStorage.getItem('offline_teachers') || '[]');
      
      // Check if teacher already exists
      const existingTeacher = existingTeachers.find((t: any) => t.email === formData.email);
      if (existingTeacher) {
        showToast.error('A teacher with this email already exists');
        setIsSubmitting(false);
        return;
      }
      
      // Create new teacher record
      const newTeacher = {
        id: Date.now().toString(),
        ...formData,
        specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
        qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(q => q),
        registeredAt: new Date().toISOString(),
        status: 'pending_review'
      };
      
      // Save to localStorage
      const updatedTeachers = [...existingTeachers, newTeacher];
      localStorage.setItem('offline_teachers', JSON.stringify(updatedTeachers));
      
      showToast.success('Teacher registration submitted successfully! Your application is under review.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        specializations: '',
        qualifications: '',
        experience: '',
        location: '',
        availability: '',
        notes: ''
      });
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      showToast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <span className="ml-3 text-3xl font-bold text-gray-900">LERA Academy</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Teacher Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our team of expert English instructors
          </p>
        </div>
        
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+84 123 456 789"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Hai Phong, Vietnam"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Professional Information
              </h3>
              
              <div>
                <label htmlFor="specializations" className="block text-sm font-medium text-gray-700">
                  Specializations (comma separated)
                </label>
                <input
                  id="specializations"
                  name="specializations"
                  type="text"
                  value={formData.specializations}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="IELTS, Business English, Grammar, Speaking"
                />
              </div>
              
              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
                  Qualifications & Certifications (comma separated)
                </label>
                <input
                  id="qualifications"
                  name="qualifications"
                  type="text"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CELTA, TESOL, MA Applied Linguistics"
                />
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Teaching Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="5+ years teaching English"
                />
              </div>
              
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <input
                  id="availability"
                  name="availability"
                  type="text"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Monday-Friday 9AM-5PM, Weekends available"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tell us about your teaching philosophy, special skills, or any other relevant information..."
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Submit Teacher Application
                  </div>
                )}
              </button>
            </div>
          </form>
          
          {/* Information Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-blue-900">Application Process</div>
                <div className="text-blue-700 mt-1">
                  Your application will be reviewed by our academic team. We'll contact you within 2-3 business days to discuss next steps and schedule an interview.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Questions about teaching at LERA Academy?{' '}
            <a href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;