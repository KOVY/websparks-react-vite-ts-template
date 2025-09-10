import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import VisualQuizModal from './components/VisualQuizModal';
import ChatInterface from './components/ChatInterface';
import PostPurchaseRegistration from './components/PostPurchaseRegistration';
import { mockUsers } from './data/mockData';
import { User, Message, UserPreferences } from './types';

type AppState = 'welcome' | 'quiz' | 'chat' | 'registration';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentChatUser, setCurrentChatUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [language, setLanguage] = useState<'cs' | 'en'>('en');
  const [currency, setCurrency] = useState<'CZK' | 'EUR'>('EUR');
  const [lastPurchasedGift, setLastPurchasedGift] = useState<string>('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    ageRange: [18, 35],
    maxDistance: 50,
    interests: [],
    language: 'en',
    currency: 'EUR'
  });

  const currentUser = mockUsers[currentUserIndex];

  // Auto-advance to next user after some time on welcome screen
  useEffect(() => {
    if (currentState === 'welcome') {
      const timer = window.setTimeout(() => {
        if (currentUserIndex < mockUsers.length - 1) {
          setCurrentUserIndex(currentUserIndex + 1);
        } else {
          setCurrentUserIndex(0);
        }
      }, 10000); // Auto-advance after 10 seconds
      return () => window.clearTimeout(timer);
    }
  }, [currentState, currentUserIndex]);

  const handleSwipeRight = () => {
    // First interaction triggers quiz
    if (currentUserIndex === 0 && !preferences.interests.length) {
      setCurrentState('quiz');
    } else {
      startChat();
    }
  };

  const handleSwipeLeft = () => {
    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
  };

  const handleQuizComplete = (answers: string[]) => {
    setPreferences(prev => ({
      ...prev,
      interests: answers
    }));
    setCurrentState('welcome');
    startChat();
  };

  const startChat = () => {
    setCurrentChatUser(currentUser);
    setCurrentState('chat');
    setMessageCount(0);
    
    // Initial message from matched user
    const welcomeMessages = {
      cs: [
        'Ahoj! Jak se máš? 😊',
        'Hej! Líbí se mi tvůj profil!',
        'Ahoj! Co děláš dnes večer?',
        'Hej! Máš krásný úsměv! 😍'
      ],
      en: [
        'Hi! How are you doing? 😊',
        'Hey! I love your profile!',
        'Hi! What are you up to tonight?',
        'Hey! You have a beautiful smile! 😍'
      ]
    };

    const randomMessage = welcomeMessages[language][Math.floor(Math.random() * welcomeMessages[language].length)];
    
    setMessages([
      {
        id: '1',
        senderId: currentUser.id,
        receiverId: 'me',
        content: randomMessage,
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  const handleSendMessage = (content: string, type: 'text' | 'gift', giftType?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      receiverId: currentChatUser?.id || '',
      content,
      timestamp: new Date(),
      type,
      giftType
    };

    setMessages(prev => [...prev, newMessage]);
    
    if (type === 'text') {
      setMessageCount(prev => prev + 1);
      
      // Auto-reply from the other user (only for first 2 messages)
      if (messageCount + 1 < 3) {
        window.setTimeout(() => {
          const replies = {
            cs: [
              'To zní skvěle! 😄',
              'Zajímavé, řekni mi víc!',
              'Souhlasím s tebou!',
              'Haha, to je vtipné! 😂',
              'Díky za zprávu! ❤️',
              'Wow, to je úžasné!',
              'Máme hodně společného!'
            ],
            en: [
              'That sounds great! 😄',
              'Interesting, tell me more!',
              'I agree with you!',
              'Haha, that\'s funny! 😂',
              'Thanks for the message! ❤️',
              'Wow, that\'s amazing!',
              'We have so much in common!'
            ]
          };
          
          const autoReply: Message = {
            id: (Date.now() + 1).toString(),
            senderId: currentChatUser?.id || '',
            receiverId: 'me',
            content: replies[language][Math.floor(Math.random() * replies[language].length)],
            timestamp: new Date(),
            type: 'text'
          };
          
          setMessages(prev => [...prev, autoReply]);
        }, 1500);
      }
    } else {
      // Gift sent - trigger post-purchase registration if not registered
      setLastPurchasedGift(giftType || '');
      setMessageCount(0); // Reset message count
      
      if (!isRegistered) {
        window.setTimeout(() => {
          setCurrentState('registration');
        }, 1000);
      }
    }
  };

  const handleRegistrationComplete = (phoneNumber: string) => {
    setIsRegistered(true);
    setCurrentState('chat');
    setLastPurchasedGift('');
    
    // Send confirmation message
    const confirmationMessage: Message = {
      id: (Date.now() + 2).toString(),
      senderId: currentChatUser?.id || '',
      receiverId: 'me',
      content: language === 'cs' ? 'Děkuji za krásný dárek! 😍💕' : 'Thank you for the beautiful gift! 😍💕',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleBackToProfiles = () => {
    setCurrentState('welcome');
    setCurrentChatUser(null);
    setMessages([]);
    setMessageCount(0);
    handleSwipeLeft();
  };

  const toggleLanguage = () => {
    const newLang = language === 'cs' ? 'en' : 'cs';
    setLanguage(newLang);
    setCurrency(newLang === 'cs' ? 'CZK' : 'EUR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-romantic-50 to-accent-50">
      {currentState === 'welcome' && (
        <>
          {/* Language Toggle - Only on Welcome Screen */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              {language === 'cs' ? '🇨🇿 CZ' : '🇬🇧 EN'}
            </button>
            
            <div className="px-3 py-2 bg-accent-500/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30">
              {currency}
            </div>
          </div>

          <WelcomeScreen
            user={currentUser}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            language={language}
          />
        </>
      )}

      {currentState === 'chat' && (
        <ChatInterface
          user={currentChatUser!}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={handleBackToProfiles}
          messageCount={messageCount}
          language={language}
          currency={currency}
        />
      )}

      {/* Modals */}
      <VisualQuizModal
        isOpen={currentState === 'quiz'}
        onComplete={handleQuizComplete}
        language={language}
      />

      <PostPurchaseRegistration
        isOpen={currentState === 'registration'}
        onComplete={handleRegistrationComplete}
        language={language}
        giftPurchased={lastPurchasedGift}
      />
    </div>
  );
}

export default App;
