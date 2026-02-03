// Temporary mock data for recruiter chats
export const mockInboxData = [
  {
    chatId: "1",
    participants: [
      { _id: "RECRUITER_ID_1", name: "Sarah Kim", role: "recruiter" },
      { _id: "STUDENT_123", name: "Alex Johnson", role: "student" }
    ],
    lastMessage: { 
      text: "Perfect! I’ll send over the JD in a moment…", 
      senderId: "RECRUITER_ID_1", 
      createdAt: new Date().toISOString() 
    },
    updatedAt: new Date().toISOString()
  },
  {
    chatId: "2",
    participants: [
      { _id: "RECRUITER_ID_1", name: "Sarah Kim", role: "recruiter" },
      { _id: "STUDENT_456", name: "Maria Garcia", role: "student" }
    ],
    lastMessage: { 
      text: "Thanks for your portfolio!", 
      senderId: "STUDENT_456", 
      createdAt: new Date().toISOString() 
    },
    updatedAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  }
];
