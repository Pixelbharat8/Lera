import React, { useState } from 'react';
import { Palette, Save, RefreshCw, Eye, Monitor, Smartphone, Tablet } from 'lucide-react';

const SuperAdminDesignSettings = () => {
  const [designSettings, setDesignSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#8B5CF6',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    fontSize: 'medium',
    borderRadius: 'medium',
    theme: 'light',
    logoUrl: '/logo.png',
    heroImage: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg',
    companyName: 'LERA Academy',
    tagline: 'Where Excellence is the Standard'
  });

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Teal', value: '#14B8A6' }
  ];

  const handleSaveSettings = () => {
    // Apply design changes to CSS variables
    document.documentElement.style.setProperty('--primary-color', designSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', designSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', designSettings.accentColor);
    
    alert('Design settings saved successfully!');
  };

  const handleResetToDefault = () => {
    setDesignSettings({
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      accentColor: '#8B5CF6',
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      fontSize: 'medium',
      borderRadius: 'medium',
      theme: 'light',
      logoUrl: '/logo.png',
      heroImage: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg',
      companyName: 'LERA Academy',
      tagline: 'Where Excellence is the Standard'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Design System Settings</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleResetToDefault}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Reset to Default
          </button>
          <button
            onClick={handleSaveSettings}
            className="btn-primary flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Design Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Settings */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={designSettings.companyName}
                  onChange={(e) => setDesignSettings({...designSettings, companyName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <input
                  type="text"
                  value={designSettings.tagline}
                  onChange={(e) => setDesignSettings({...designSettings, tagline: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
                <input
                  type="url"
                  value={designSettings.heroImage}
                  onChange={(e) => setDesignSettings({...designSettings, heroImage: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setDesignSettings({...designSettings, primaryColor: color.value})}
                      className={`w-12 h-12 rounded-lg border-4 transition-all hover:scale-110 ${
                        designSettings.primaryColor === color.value ? 'border-gray-800 shadow-lg' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setDesignSettings({...designSettings, secondaryColor: color.value})}
                      className={`w-12 h-12 rounded-lg border-4 transition-all hover:scale-110 ${
                        designSettings.secondaryColor === color.value ? 'border-gray-800 shadow-lg' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                <div className="flex space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setDesignSettings({...designSettings, accentColor: color.value})}
                      className={`w-12 h-12 rounded-lg border-4 transition-all hover:scale-110 ${
                        designSettings.accentColor === color.value ? 'border-gray-800 shadow-lg' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Layout */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography & Layout</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <select
                  value={designSettings.fontSize}
                  onChange={(e) => setDesignSettings({...designSettings, fontSize: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Border Radius</label>
                <select
                  value={designSettings.borderRadius}
                  onChange={(e) => setDesignSettings({...designSettings, borderRadius: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className={`bg-gray-100 rounded-lg overflow-hidden ${
              previewDevice === 'desktop' ? 'aspect-video' :
              previewDevice === 'tablet' ? 'aspect-[4/5]' : 'aspect-[9/16]'
            }`}>
              <div 
                className="h-full p-4 text-white text-center flex flex-col justify-center"
                style={{ 
                  backgroundColor: designSettings.primaryColor,
                  background: `linear-gradient(135deg, ${designSettings.primaryColor}, ${designSettings.accentColor})`
                }}
              >
                <div className="text-lg font-bold mb-2">{designSettings.companyName}</div>
                <div className="text-sm opacity-90">{designSettings.tagline}</div>
                <div className="mt-4">
                  <div 
                    className="inline-block px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: designSettings.secondaryColor }}
                  >
                    Sample Button
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Preview updates in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDesignSettings;