
interface ChatResponse {
  text: string;
  delay?: number;
}

const supportResponses = {
  navigation: [
    "I'll help you navigate to your destination. Can you tell me your current location and where you need to go?",
    "Let me assist you with campus navigation. What building or area are you trying to reach?",
    "I'm here to help with directions. Are you looking for accessible routes, or do you need general navigation assistance?",
    "I can provide detailed navigation instructions. Would you like turn-by-turn directions or general guidance?",
    "Happy to help with navigation! Are there any specific accessibility features you need me to consider for your route?"
  ],
  tech: [
    "I'm ready to help with your technology needs. What device or software are you having trouble with?",
    "Let me assist you with technical support. Can you describe the issue you're experiencing?",
    "I specialize in assistive technology support. What specific problem can I help you solve today?",
    "I'm here to troubleshoot with you. What error messages or symptoms are you seeing?",
    "Technical support is my specialty! Let's work through this step by step. What's not working properly?"
  ],
  emergency: [
    "I'm here to provide immediate assistance. What's your current situation and how can I help?",
    "This is urgent support. Please tell me what's happening and your location if it's safe to share.",
    "I'm prioritizing your emergency request. What immediate help do you need right now?",
    "Emergency support activated. Can you briefly describe what's wrong and if you're in a safe location?",
    "I'm here for urgent assistance. What's the most important thing I can help you with right now?"
  ],
  general: [
    "I'm here to help! Can you tell me more details about what you need assistance with?",
    "Thanks for reaching out. What specific support can I provide for you today?",
    "I'm ready to assist you. Could you share more information about your request?",
    "I'm listening and here to help. What would you like me to focus on first?",
    "Great to connect with you! What's the main challenge I can help you overcome today?",
    "I'm here to support you. Can you walk me through what you're trying to accomplish?",
    "Ready to help! What questions or concerns can I address for you right now?"
  ]
};

const followUpResponses = [
  "Is there anything else about this I can clarify for you?",
  "Does this help address your concern? Let me know if you need more details.",
  "I hope that's helpful! What other questions do you have?",
  "Please let me know if you need me to explain anything further.",
  "Is there another way I can assist you with this?",
  "Do you have any other questions about this topic?",
  "I'm here if you need any additional support with this."
];

export const generateSupportResponse = (
  supportType: string, 
  messageCount: number = 1,
  userMessage?: string
): ChatResponse[] => {
  const responses: ChatResponse[] = [];
  
  // First response based on support type
  let initialResponses = supportResponses.general;
  
  if (supportType === 'navigation') {
    initialResponses = supportResponses.navigation;
  } else if (supportType === 'tech') {
    initialResponses = supportResponses.tech;
  } else if (supportType === 'emergency') {
    initialResponses = supportResponses.emergency;
  }
  
  // Select a random initial response
  const randomIndex = Math.floor(Math.random() * initialResponses.length);
  responses.push({
    text: initialResponses[randomIndex],
    delay: 1000
  });
  
  // Add a follow-up response for longer conversations
  if (messageCount > 2) {
    const followUpIndex = Math.floor(Math.random() * followUpResponses.length);
    responses.push({
      text: followUpResponses[followUpIndex],
      delay: 2500
    });
  }
  
  return responses;
};

export const generateContextualResponse = (userMessage: string): ChatResponse => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('help') || message.includes('assistance')) {
    return {
      text: "I'm here to help! Let me know exactly what you need assistance with and I'll guide you through it step by step.",
      delay: 1000
    };
  }
  
  if (message.includes('location') || message.includes('where') || message.includes('find')) {
    return {
      text: "I can help you with location and navigation. Can you share your current location and where you're trying to go?",
      delay: 1000
    };
  }
  
  if (message.includes('problem') || message.includes('issue') || message.includes('error')) {
    return {
      text: "I understand you're experiencing an issue. Can you describe what's happening in more detail so I can provide the best solution?",
      delay: 1000
    };
  }
  
  if (message.includes('thank')) {
    return {
      text: "You're very welcome! I'm glad I could help. Is there anything else you need assistance with today?",
      delay: 800
    };
  }
  
  // Default contextual response
  const defaultResponses = [
    "I see what you're saying. Let me think about the best way to help you with this.",
    "That's a great question. Let me provide you with some guidance on this.",
    "I understand your situation. Here's how I can assist you with that.",
    "Thanks for sharing that information. Let me help you work through this.",
    "I hear you. Let me offer some support and solutions for your situation."
  ];
  
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return {
    text: defaultResponses[randomIndex],
    delay: 1000
  };
};
