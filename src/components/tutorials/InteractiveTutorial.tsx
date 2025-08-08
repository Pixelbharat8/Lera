import React, { useState } from 'react';
import { Play, BookOpen, Headphones, MessageSquare, Award, ArrowRight, CheckCircle } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'interactive' | 'quiz' | 'practice';
  duration: string;
  completed?: boolean;
}

interface InteractiveTutorialProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    type: string;
  };
  onComplete?: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ lesson, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const tutorialSteps: TutorialStep[] = [
    {
      id: '1',
      title: 'Introduction to English Greetings',
      content: 'Learn basic greeting phrases used in everyday conversations.',
      type: 'video',
      duration: '3:00'
    },
    {
      id: '2',
      title: 'Practice Common Greetings',
      content: 'Try saying these greetings and get feedback on your pronunciation.',
      type: 'interactive',
      duration: '5:00'
    },
    {
      id: '3',
      title: 'Greeting Quiz Challenge',
      content: 'Test your knowledge with this fun interactive quiz!',
      type: 'quiz',
      duration: '2:00'
    },
    {
      id: '4',
      title: 'Real Conversation Practice',
      content: 'Practice greetings in simulated real-world scenarios.',
      type: 'practice',
      duration: '8:00'
    }
  ];

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-5 w-5" />;
      case 'interactive': return <MessageSquare className="h-5 w-5" />;
      case 'quiz': return <Award className="h-5 w-5" />;
      case 'practice': return <Headphones className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'video': return 'from-blue-500 to-blue-600';
      case 'interactive': return 'from-green-500 to-green-600';
      case 'quiz': return 'from-purple-500 to-purple-600';
      case 'practice': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const completeStep = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < tutorialSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      onComplete?.();
    }
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <div className="text-right">
            <div className="text-lg font-bold">{currentStep + 1}/{tutorialSteps.length}</div>
            <div className="text-sm text-white/80">Step Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex">
        {/* Steps Sidebar */}
        <div className="w-1/3 bg-gray-50 p-6 border-r">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tutorial Steps</h3>
          <div className="space-y-3">
            {tutorialSteps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  index === currentStep
                    ? 'border-blue-500 bg-blue-50'
                    : completedSteps.has(index)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getStepColor(step.type)} text-white mr-3`}>
                      {getStepIcon(step.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{step.title}</div>
                      <div className="text-xs text-gray-600">{step.duration}</div>
                    </div>
                  </div>
                  {completedSteps.has(index) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getStepColor(currentStepData.type)} text-white mr-4`}>
                {getStepIcon(currentStepData.type)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h3>
                <p className="text-gray-600">{currentStepData.content}</p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gray-50 rounded-xl p-8 mb-6 min-h-64">
            {currentStepData.type === 'video' && (
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Video Lesson</h4>
                <p className="text-gray-600 mb-6">Watch and learn basic greeting phrases with native pronunciation.</p>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">🎥 "Hello! How are you today?"</p>
                  <p className="text-blue-600 text-sm mt-2">Listen carefully and repeat after the speaker</p>
                </div>
              </div>
            )}

            {currentStepData.type === 'interactive' && (
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Interactive Practice</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { phrase: "Hello!", response: "Hello! Nice to meet you!" },
                    { phrase: "Good morning!", response: "Good morning! How are you?" },
                    { phrase: "How are you?", response: "I'm fine, thank you!" },
                    { phrase: "Nice to meet you!", response: "Nice to meet you too!" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="text-lg font-medium text-gray-900 mb-2">{item.phrase}</div>
                      <div className="text-gray-600 text-sm mb-3">Response: {item.response}</div>
                      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                        🎤 Practice Speaking
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepData.type === 'quiz' && (
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Quick Quiz</h4>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h5 className="text-lg font-medium mb-4">Which greeting is most appropriate in the morning?</h5>
                  <div className="space-y-3">
                    {['Good evening!', 'Good morning!', 'Good night!', 'Goodbye!'].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => index === 1 && completeStep(currentStep)}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-all hover:scale-105 ${
                          index === 1 
                            ? 'border-green-500 bg-green-50 hover:bg-green-100' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStepData.type === 'practice' && (
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Real Conversation Practice</h4>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-12 w-12 text-white" />
                    </div>
                    <h5 className="text-lg font-medium mb-2">Scenario: Meeting a new classmate</h5>
                    <p className="text-gray-600">Practice introducing yourself to a new friend at school!</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-medium text-blue-900">New Friend says:</div>
                      <div className="text-blue-800">"Hi! I'm Sarah. What's your name?"</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-medium text-green-900">You say:</div>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors mt-2">
                        🎤 Record Your Response
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            
            <div className="text-center">
              <button
                onClick={() => completeStep(currentStep)}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 font-bold"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Complete Tutorial' : 'Mark Complete'}
              </button>
            </div>
            
            <button
              onClick={() => setCurrentStep(Math.min(tutorialSteps.length - 1, currentStep + 1))}
              disabled={currentStep === tutorialSteps.length - 1}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTutorial;