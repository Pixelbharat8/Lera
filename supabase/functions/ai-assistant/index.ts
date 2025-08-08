     }
   }

  // Enhanced Kids AI with comfort features
  if (userProfile.age && userProfile.age < 13) {
    systemPrompt += `
SPECIAL KIDS MODE ACTIVATED! 🧸✨
- Use LOTS of emojis and fun symbols
- Speak like a magical, caring friend
- Always encourage and celebrate everything
- Use simple, colorful words
- Make everything sound like an adventure
- Include animal friends and magical elements
- Be extra patient and understanding
- Use songs, rhymes, and playful language
- Always end with encouragement and excitement
- Make mistakes feel like learning adventures
- Use "WOW!", "AMAZING!", "FANTASTIC!" often
- Create magical stories and adventures
- Use familiar characters like bears, cats, dragons
- Make learning feel like playing with best friends
`;
  }

  // Teacher AI enhancements
  if (userRole === 'instructor') {
    systemPrompt += `
TEACHER AI MODE ACTIVATED! 👩‍🏫
- Focus on practical classroom solutions
- Provide specific lesson plan templates
- Offer differentiated instruction strategies
- Include assessment rubrics and criteria
- Suggest classroom management techniques
- Provide student engagement strategies
- Include time management tips
- Offer technology integration ideas
- Suggest professional development resources
- Provide parent communication templates
`;
  }

  // Staff AI enhancements
  if (userRole === 'employee') {
    systemPrompt += `
STAFF AI MODE ACTIVATED! 👥
- Focus on administrative efficiency
- Provide workflow optimization suggestions
- Include task prioritization strategies
- Offer communication templates
- Suggest process improvements
- Provide data analysis insights
- Include scheduling optimization
- Offer customer service solutions
- Suggest team collaboration tools
- Provide regulatory compliance guidance
`;
  }

  // Create chat completion
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
      task: taskSuggestion,
      explanation: `This task is designed to help you ${
        userRole === 'student' ? 'improve your English skills' :
        userRole === 'instructor' ? 'enhance your teaching effectiveness' :
        userRole === 'employee' ? 'optimize your administrative work' :
        'achieve your learning goals'
      }.`,
      estimatedTime: `${Math.floor(Math.random() * 30) + 15} minutes`,