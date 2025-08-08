import { useState } from 'react';
import { useAuth } from './useAuth';
import { useLanguage } from './useLanguage';
import { showToast } from '../components/ui/Toast';

export const useAIAssistant = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [currentPersonality, setCurrentPersonality] = useState<'kiddy' | 'stella' | 'professor'>('kiddy');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [kidsMood, setKidsMood] = useState<'happy' | 'excited' | 'thinking' | 'sleepy'>('happy');
  const [teacherMode, setTeacherMode] = useState<'planning' | 'grading' | 'assessment' | 'general'>('general');
  const [staffMode, setStaffMode] = useState<'tasks' | 'scheduling' | 'communication' | 'reports'>('tasks');

  const personalities = {
    kiddy: {
      name: 'Kiddy Bear 🐻',
      avatar: '🧸',
      description: 'Your magical learning friend who loves to play and learn!',
      personality: 'playful, encouraging, uses simple words',
      ageGroup: '3-12 years',
      colors: ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFA07A', '#98FB98'],
      sounds: ['🎵', '🎶', '🎼', '🎺', '🎸']
    },
    stella: {
      name: 'Stella Star ⭐',
      avatar: '🌟',
      description: 'Your smart study companion who helps you achieve your dreams!',
      personality: 'supportive, motivational, teen-friendly',
      ageGroup: '13-18 years',
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
      sounds: ['💫', '✨', '🌟', '⭐']
    },
    professor: {
      name: 'Professor Alex 🎓',
      avatar: '👨‍🎓',
      description: 'Your professional learning mentor and career guide',
      personality: 'professional, detailed, goal-oriented',
      ageGroup: '18+ years',
      colors: ['#2C3E50', '#3498DB', '#E74C3C', '#F39C12'],
      sounds: ['📚', '🎯', '💼', '🏆']
    }
  };

  // Teacher AI Assistant
  const teacherPersonalities = {
    classroom: {
      name: 'Ms. TeachBot 👩‍🏫',
      avatar: '🍎',
      description: 'Your classroom management and lesson planning assistant',
      specialty: 'lesson planning, student engagement, classroom management'
    },
    grader: {
      name: 'Professor GradeWise 📝',
      avatar: '📊',
      description: 'Your intelligent grading and assessment helper',
      specialty: 'assessment creation, grading assistance, feedback generation'
    },
    mentor: {
      name: 'Coach Inspire 🌟',
      avatar: '💪',
      description: 'Your student mentoring and motivation specialist',
      specialty: 'student counseling, motivation strategies, career guidance'
    }
  };

  // Staff AI Assistant
  const staffPersonalities = {
    organizer: {
      name: 'Admin Alice 📋',
      avatar: '🗂️',
      description: 'Your administrative task manager and organizer',
      specialty: 'task management, scheduling, workflow optimization'
    },
    communicator: {
      name: 'Connect Carl 📞',
      avatar: '💬',
      description: 'Your communication and relationship specialist',
      specialty: 'parent communication, student outreach, team coordination'
    },
    analyst: {
      name: 'Data Diana 📈',
      avatar: '📊',
      description: 'Your data analysis and reporting expert',
      specialty: 'performance analytics, report generation, insights'
    }
  };

  const sendMessage = async (message: string, isVoice = false) => {
    setIsLoading(true);
    
    // Add user message to conversation
    const userMessage = { content: message, isUser: true, timestamp: new Date().toISOString() };
    setConversation(prev => [...prev, userMessage]);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let aiResponse = '';
      
      if (currentPersonality === 'kiddy') {
        aiResponse = generateKiddyResponse(message);
      } else if (currentPersonality === 'stella') {
        aiResponse = generateStellaResponse(message);
      } else {
        aiResponse = generateProfessorResponse(message);
      }

      const assistantMessage = { 
        content: aiResponse, 
        isUser: false, 
        timestamp: new Date().toISOString() 
      };
      setConversation(prev => [...prev, assistantMessage]);

      // Auto-speak for kids
      if (currentPersonality === 'kiddy') {
        speakMessage(aiResponse);
      }
      
    } catch (error) {
      console.error('AI Assistant error:', error);
      showToast.error('Sorry, I had trouble understanding that. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const generateKiddyResponse = (message: string) => {
    const responses = [
      `🌟 WOW! That's so interesting! I love talking with you! Tell me more! 🧸`,
      `🎉 AMAZING! You're so smart! Let's learn something super fun together! ✨`,
      `💫 That's a great question! You know what? I think you're fantastic! 🌈`,
      `🎵 Ooh ooh! I have an idea! Let's play a magical learning game! 🎮`,
      `🌟 You're doing GREAT! I'm so proud of you! Want to try something new? 🏆`,
      `💖 I love learning with you! You make everything more fun! Let's explore! 🦋`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateStellaResponse = (message: string) => {
    const responses = [
      `⭐ That's a really good point! Let's dive deeper into this topic.`,
      `🎯 Great thinking! Here's how we can approach this challenge...`,
      `💪 You're making excellent progress! Keep up the momentum!`,
      `✨ I can help you with that! Let's break it down step by step.`,
      `🌟 That's exactly the kind of question successful students ask!`,
      `🚀 You're on the right track! Let's take this to the next level!`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateProfessorResponse = (message: string) => {
    const responses = [
      `That's an excellent question. Let me provide you with a comprehensive analysis...`,
      `Based on educational research, I recommend the following approach...`,
      `Your inquiry demonstrates critical thinking. Here's what I suggest...`,
      `Let me offer some professional insights on this matter...`,
      `This is a common challenge. Here's how successful learners handle it...`,
      `From my experience, the most effective strategy would be...`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript, true);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        setIsListening(false);
        showToast.error('Voice recognition failed. Please try again.');
      };
     
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      showToast.error('Voice recognition not supported in this browser.');
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = currentPersonality === 'kiddy' ? 0.9 : 1.0;
      utterance.pitch = currentPersonality === 'kiddy' ? 1.2 : 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateKidsActivity = () => {
    const activities = [
      {
        type: 'word_hunt',
        title: 'Magic Word Hunt! 🔍',
        description: 'Find 5 animals that start with the letter "C"',
        difficulty: 'easy',
        points: 50,
        emoji: '🦁🐱🐄🐊🐪'
      },
      {
        type: 'color_adventure',
        title: 'Rainbow Adventure! 🌈',
        description: 'Name all the colors you can see around you!',
        difficulty: 'easy',
        points: 30,
        emoji: '🔴🟠🟡🟢🔵'
      },
      {
        type: 'story_builder',
        title: 'Story Magic Time! ✨',
        description: 'Help me create a story about a friendly dragon!',
        difficulty: 'medium',
        points: 100,
        emoji: '🐉📚✨🏰👑'
      }
    ];
    
    return activities[Math.floor(Math.random() * activities.length)];
  };

  const generateTeacherTask = (mode: string) => {
    const taskTemplates = {
      planning: [
        'Create a lesson plan for IELTS Writing Task 2 focusing on argumentative essays',
        'Design interactive speaking activities for Business English presentation skills',
        'Develop vocabulary exercises for Advanced Grammar students',
        'Plan assessment criteria for end-of-module evaluation'
      ],
      grading: [
        'Review and grade 15 IELTS writing submissions with detailed feedback',
        'Assess speaking recordings and provide pronunciation guidance',
        'Evaluate group project presentations with rubric scoring',
        'Grade grammar quizzes and identify common error patterns'
      ],
      assessment: [
        'Create placement test for new intermediate-level students',
        'Design mock IELTS speaking test with band score criteria',
        'Develop progress assessment for struggling students',
        'Build comprehensive final exam for Business English course'
      ],
      general: [
        'Prepare parent-teacher conference materials and student progress reports',
        'Update student attendance records and follow up on absences',
        'Plan professional development session on new teaching methodologies',
        'Organize study materials and resources for upcoming semester'
      ]
    };
    
    const tasks = taskTemplates[mode as keyof typeof taskTemplates] || taskTemplates.general;
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const generateStaffTask = (mode: string) => {
    const taskTemplates = {
      tasks: [
        'Update student enrollment database and verify payment status',
        'Prepare monthly financial report for academy board meeting',
        'Coordinate with marketing team on new course promotion campaign',
        'Organize staff schedule for next quarter and resolve conflicts'
      ],
      scheduling: [
        'Schedule parent-teacher conferences for end of semester',
        'Coordinate classroom bookings for live session schedule',
        'Plan staff training sessions on new education technology',
        'Arrange equipment maintenance and facility updates'
      ],
      communication: [
        'Send enrollment confirmation emails to new students',
        'Prepare newsletter content for parent community',
        'Coordinate with local schools for partnership programs',
        'Update academy website with latest course information'
      ],
      reports: [
        'Generate student progress analytics for management review',
        'Compile teacher performance metrics for evaluation period',
        'Create enrollment trends analysis for business planning',
        'Prepare compliance documentation for education ministry'
      ]
    };
    
    const tasks = taskTemplates[mode as keyof typeof taskTemplates] || taskTemplates.tasks;
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const clearConversation = () => {
    setConversation([]);
  };

  return {
    personalities,
    teacherPersonalities,
    staffPersonalities,
    currentPersonality,
    setCurrentPersonality,
    isListening,
    kidsMood,
    setKidsMood,
    teacherMode,
    setTeacherMode,
    staffMode,
    setStaffMode,
    conversation,
    isLoading,
    sendMessage,
    startVoiceRecognition,
    speakMessage,
    generateKidsActivity,
    generateTeacherTask,
    generateStaffTask,
    clearConversation
  };
};