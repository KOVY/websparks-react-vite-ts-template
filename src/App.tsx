import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import VisualQuizModal from './components/VisualQuizModal';
import ChatInterface from './components/ChatInterface';
import PostPurchaseRegistration from './components/PostPurchaseRegistration';
import LanguageProvider, { useLanguage } from './components/LanguageProvider';
import { RegionalContentProvider } from './components/RegionalContentProvider';
import CurrencyProvider, { useCurrency } from './components/CurrencyProvider';
import { mockUsers } from './data/mockData';
import { User, Message, UserPreferences } from './types';

type AppState = 'welcome' | 'quiz' | 'chat' | 'registration';

// Hlavní komponenta aplikace
const AppContent: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentChatUser, setCurrentChatUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [lastPurchasedGift, setLastPurchasedGift] = useState<string>('');
  // Použití jazykového kontextu
  const { language, setLanguage, t } = useLanguage();
  // Použití měnové kontextu
  const { currency, setCurrency } = useCurrency();
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    ageRange: [18, 35],
    maxDistance: 50,
    interests: [],
    language,
    currency
  });
  
  // Synchronizace preferencí s jazykem a měnou
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      language
    }));
  }, [language]);
  
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      currency
    }));
  }, [currency]);

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
      ],
      es: [
        '¡Hola! ¿Cómo estás? 😊',
        '¡Hey! Me encanta tu perfil!',
        '¡Hola! ¿Qué haces esta noche?',
        '¡Hey! Tienes una hermosa sonrisa! 😍'
      ],
      de: [
        'Hallo! Wie geht es dir? 😊',
        'Hey! Ich liebe dein Profil!',
        'Hallo! Was machst du heute Abend?',
        'Hey! Du hast ein wunderschönes Lächeln! 😍'
      ],
      fr: [
        'Salut! Comment ça va? 😊',
        'Hey! J\'adore ton profil!',
        'Salut! Qu\'est-ce que tu fais ce soir?',
        'Hey! Tu as un beau sourire! 😍'
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
            ],
            es: [
              '¡Eso suena genial! 😄',
              'Interesante, cuéntame más!',
              '¡Estoy de acuerdo contigo!',
              '¡Jaja, eso es gracioso! 😂',
              '¡Gracias por el mensaje! ❤️',
              '¡Wow, eso es increíble!',
              '¡Tenemos mucho en común!'
            ],
            de: [
              'Das klingt toll! 😄',
              'Interessant, erzähl mir mehr!',
              'Ich stimme dir zu!',
              'Haha, das ist lustig! 😂',
              'Danke für die Nachricht! ❤️',
              'Wow, das ist erstaunlich!',
              'Wir haben so viel gemeinsam!'
            ],
            fr: [
              'Cela a l\'air génial ! 😄',
              'Intéressant, en parle plus !',
              'Je suis d\'accord avec toi !',
              'Haha, c\'est drôle ! 😂',
              'Merci pour le message ! ❤️',
              'Wow, c\'est incroyable !',
              'Nous avons tellement de choses en commun !'
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
      content: {
        cs: 'Děkuji za krásný dárek! 😍💕',
        en: 'Thank you for the beautiful gift! 😍💕',
        es: '¡Gracias por el hermoso regalo! 😍💕',
        de: 'Danke für das schöne Geschenk! 😍💕',
        fr: 'Merci pour le beau cadeau ! 😍💕'
      }[language],
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

  // Přepnutí mezi podporovanými jazyky
  const nextLanguage = () => {
    const languages = ['cs', 'en', 'es', 'de', 'fr'] as const;
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
    // Nastavení měny podle jazyka
    if (languages[nextIndex] === 'cs') {
      setCurrency('CZK');
    } else if (languages[nextIndex] === 'en') {
      setCurrency('USD');
    } else if (languages[nextIndex] === 'de' || languages[nextIndex] === 'fr') {
      setCurrency('EUR');
    } else if (languages[nextIndex] === 'es') {
      setCurrency('EUR'); // Using EUR for Spanish as well
    }
  };

  // Currency selector function
  const nextCurrency = () => {
    const currencies = ['CZK', 'EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD'] as const;
    const currentIndex = currencies.indexOf(currency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    setCurrency(currencies[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-romantic-50 to-accent-50">
      {currentState === 'welcome' && (
        <>
          {/* Language and Currency Selectors - Only on Welcome Screen */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-3">
            <button
              onClick={nextLanguage}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
              title={t('changeLanguage')}
            >
              {language === 'cs' ? '🇨🇿 CZ' : 
               language === 'en' ? '🇬🇧 EN' :
               language === 'es' ? '🇪🇸 ES' :
               language === 'de' ? '🇩🇪 DE' : '🇫🇷 FR'}
            </button>
            
            <button
              onClick={nextCurrency}
              className="px-3 py-2 bg-accent-500/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30 hover:bg-accent-500/30 transition-all duration-300"
              title="Change currency"
            >
              {currency}
            </button>
          </div>

          <WelcomeScreen
            user={currentUser}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            language={language}
            t={t}
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
        t={t}
      />
      )}

      {/* Modals */}
      <VisualQuizModal
        isOpen={currentState === 'quiz'}
        onComplete={handleQuizComplete}
        language={language}
        t={t}
      />

      <PostPurchaseRegistration
        isOpen={currentState === 'registration'}
        onComplete={handleRegistrationComplete}
        language={language}
        giftPurchased={lastPurchasedGift}
        t={t}
      />
    </div>
  );
}

// Hlavní komponenta s LanguageProviderem a CurrencyProviderem
function App() {
  return (
    <LanguageProvider>
      <RegionalContentProvider>
        <CurrencyProvider>
          <AppContent />
        </CurrencyProvider>
      </RegionalContentProvider>
    </LanguageProvider>
  );
}

export default App;
