import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import VideoPlayer from '../components/video/VideoPlayer';
import InteractiveGame from '../components/games/InteractiveGame';
import InteractiveTutorial from '../components/tutorials/InteractiveTutorial';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, ThumbsUp, Download, Menu, X, PlayCircle, PauseCircle } from 'lucide-react';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLesson, getLessonsByCourse, getCourse, markLessonComplete } = useCourses();
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<{ id: number; text: string; timestamp: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'video' | 'tutorial' | 'game' | 'notes'>('video');
  
  const lesson = getLesson(lessonId || '');
  
  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">Lesson not found</h2>
          <p className="mt-2 text-gray-300">The lesson you're looking for doesn't exist or has been removed.</p>
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
  
  const course = getCourse(lesson.courseId);
  const courseLessons = getLessonsByCourse(lesson.courseId);
  
  const currentIndex = courseLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = courseLessons[currentIndex + 1];
  const prevLesson = courseLessons[currentIndex - 1];
  
  const handleComplete = () => {
    markLessonComplete(lesson.id);
  };
  
  const handleNext = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      navigate(`/courses/${lesson.courseId}`);
    }
  };
  
  const handleAddNote = () => {
    if (noteText.trim()) {
      const now = new Date();
      const timestamp = `${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setNotes([...notes, { id: Date.now(), text: noteText, timestamp }]);
      setNoteText('');
    }
  };
  
  const handleVideoProgress = (progress: number) => {
    // Track video progress
    console.log('Video progress:', progress);
  };

  const handleVideoComplete = () => {
    // Mark lesson as complete when video finishes
    handleComplete();
  };

  const handleGameComplete = (score: number) => {
    console.log('Game completed with score:', score);
    // Award points or badges based on score
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      {/* Top navigation */}
      <div className="bg-gray-800 text-white py-4 px-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/courses/${lesson.courseId}`} className="mr-4 flex items-center text-gray-300 hover:text-white">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to course</span>
            </Link>
            <h1 className="hidden sm:block text-lg font-medium truncate max-w-md">{lesson.title}</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className={`flex items-center px-3 py-1 rounded text-sm ${lesson.completed ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={handleComplete}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">
                {lesson.completed ? 'Completed' : 'Mark Complete'}
              </span>
            </button>
            <button
              className="flex items-center px-3 py-1 bg-gray-700 rounded text-sm text-gray-300 hover:bg-gray-600"
              onClick={() => setShowNotes(!showNotes)}
            >
              <MessageSquare className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Notes</span>
            </button>
            <button
              className="md:hidden flex items-center px-3 py-1 bg-gray-700 rounded text-sm text-gray-300 hover:bg-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar (Course content) */}
        <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-80 bg-gray-800 text-white overflow-y-auto absolute md:relative z-20 h-full`}>
          <div className="p-4 border-b border-gray-700">
            <Link to={`/courses/${lesson.courseId}`} className="flex items-center">
              <BookOpen className="h-5 w-5 text-blue-400 mr-2" />
              <h2 className="text-lg font-medium truncate">{course?.title}</h2>
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              {currentIndex + 1} of {courseLessons.length} lessons
            </p>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium mb-2">Course Content</h3>
            <div className="space-y-1">
              {courseLessons.map((courseLesson) => (
                <Link
                  key={courseLesson.id}
                  to={`/lesson/${courseLesson.id}`}
                  className={`flex items-start p-2 rounded-md text-sm ${courseLesson.id === lesson.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  {courseLesson.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  ) : (
                    <PlayCircle className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`font-medium ${courseLesson.id === lesson.id ? 'text-blue-400' : ''}`}>
                      {courseLesson.title}
                    </div>
                    <p className="text-gray-400 text-xs">{courseLesson.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 bg-gray-900">
            {/* Tab Navigation */}
            <div className="bg-gray-800 px-6 py-4">
              <div className="flex space-x-6">
                {[
                  { key: 'video', label: 'Video Lesson', icon: PlayCircle },
                  { key: 'tutorial', label: 'Interactive Tutorial', icon: BookOpen },
                  { key: 'game', label: 'Practice Game', icon: MessageSquare },
                  { key: 'notes', label: 'My Notes', icon: MessageSquare }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'video' && (
                <div className="aspect-video">
                  <VideoPlayer
                    title={lesson.title}
                    duration={lesson.duration}
                    onProgress={handleVideoProgress}
                    onComplete={handleVideoComplete}
                  />
                </div>
              )}

              {activeTab === 'tutorial' && (
                <InteractiveTutorial
                  lesson={lesson}
                  onComplete={handleComplete}
                />
              )}

              {activeTab === 'game' && (
                <InteractiveGame
                  type="vocabulary"
                  level="beginner"
                  onComplete={handleGameComplete}
                />
              )}

              {activeTab === 'notes' && (
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lesson Notes</h3>
                  
                  <div className="mb-6">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add your notes about this lesson..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                    />
                    <button
                      onClick={handleAddNote}
                      className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                  
                  {notes.length > 0 ? (
                    <div className="space-y-4">
                      {notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 p-4 rounded-lg border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-gray-500">Note at {note.timestamp}</span>
                            <button className="text-gray-400 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-gray-900">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No notes yet. Add your first note above!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Lesson content and notes */}
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex-1 overflow-y-auto bg-gray-900 p-6 ${showNotes ? 'hidden md:block' : 'block'}`}>
              <h2 className="text-xl font-bold text-white mb-4">{lesson.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{lesson.description}</p>
                <p className="text-gray-300 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula. Donec rutrum enim, pellentesque imperdiet tortor feugiat. Fusce vel fringilla est, a tincidunt eros. Proin ultrices felis a dolor posuere, non pulvinar odio ultricies. 
                </p>
                <p className="text-gray-300 mt-4">
                  Nullam lacinia justo vitae ex rhoncus, et placerat augue feugiat. Donec placerat ligula vitae risus egestas hendrerit. Praesent consectetur felis eget finibus blandit. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                </p>
                <h3 className="text-white text-lg font-semibold mt-6 mb-3">Key Takeaways</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Nulla facilisi. Cras fermentum volutpat est, vel vestibulum eros bibendum non.</li>
                  <li>Suspendisse potenti. Nunc eleifend augue et sapien porttitor porttitor.</li>
                  <li>Vivamus eleifend, arcu sit amet tempor ultricies, lorem enim placerat libero.</li>
                  <li>Aenean convallis, enim eget facilisis sagittis, justo enim auctor elit.</li>
                </ul>
              </div>
              
              {/* Next/Prev navigation */}
              <div className="mt-8 flex justify-between">
                {prevLesson ? (
                  <Link
                    to={`/lesson/${prevLesson.id}`}
                    className="flex items-center px-4 py-2 bg-gray-800 rounded-md text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous Lesson
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextLesson ? (
                  <Link
                    to={`/lesson/${nextLesson.id}`}
                    className="flex items-center px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                  >
                    Next Lesson
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Link>
                ) : (
                  <button
                    onClick={handleComplete}
                    className="flex items-center px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                  >
                    Complete Course
                    <CheckCircle className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Notes panel */}
            {showNotes && (
              <div className="w-full md:w-80 bg-gray-800 overflow-y-auto border-l border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center justify-between">
                  <span>Lesson Notes</span>
                  <button
                    className="md:hidden text-gray-400 hover:text-white"
                    onClick={() => setShowNotes(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </h3>
                
                <div className="mb-4">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  ></textarea>
                  <button
                    onClick={handleAddNote}
                    className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Save Note
                  </button>
                </div>
                
                {notes.length > 0 ? (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-gray-700 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-gray-400">at {note.timestamp}</span>
                          <button className="text-gray-400 hover:text-white">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-gray-200 text-sm">{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">No notes yet. Add your first note above.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;