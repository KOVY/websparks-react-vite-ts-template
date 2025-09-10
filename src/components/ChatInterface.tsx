import React, { useState, useRef, useEffect } from 'react';
import { Message, Gift, User } from '../types';
import { gifts } from '../data/mockData';

interface ChatInterfaceProps {
  user: User;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'gift', giftType?: string) => void;
  onBack: () => void;
  messageCount: number;
  language: 'cs' | 'en';
  currency: 'CZK' | 'EUR';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  user,
  messages,
  onSendMessage,
  onBack,
  messageCount,
  language,
  currency
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show typing indicator when payment gate is active
  useEffect(() => {
    if (messageCount >= 3) {
      const timer = window.setTimeout(() => {
        setShowTypingIndicator(true);
      }, 2000);
      return () => window.clearTimeout(timer);
    }
  }, [messageCount]);

  const handleSendMessage = () => {
    if (newMessage.trim() && messageCount < 3) {
      onSendMessage(newMessage, 'text');
      setNewMessage('');
    }
  };

  const handleSelectGift = (gift: Gift) => {
    setSelectedGift(gift);
    setShowPaymentModal(true);
  };

  const handlePurchaseGift = () => {
    if (selectedGift) {
      onSendMessage(`Sent ${selectedGift.name} ${selectedGift.icon}`, 'gift', selectedGift.id);
      setShowPaymentModal(false);
      setSelectedGift(null);
      setShowTypingIndicator(false);
    }
  };

  const convertPrice = (price: number) => {
    if (currency === 'EUR') {
      return Math.round(price * 0.04);
    }
    return price;
  };

  const getCurrencySymbol = () => {
    return currency === 'EUR' ? '€' : 'Kč';
  };

  const texts = {
    cs: {
      typing: 'Napište zprávu...',
      send: 'Odeslat',
      isTyping: 'píše...',
      impressTitle: 'Udělejte na ni dojem!',
      impressSubtitle: 'Pošlete jí malý dárek, abyste odemkli neomezený chat a ukázali svůj zájem.',
      justPrice: 'Jen',
      mostPopular: 'Nejpopulárnější volba',
      recommended: 'Doporučeno',
      securePayment: '🔒 Jednorázová bezpečná platba přes Apple Pay / Google Pay / Kartu',
      unlimitedChat: '🎁 Odemkne neomezené psaní navždy',
      paymentTitle: 'Dokončit nákup',
      paymentDesc: 'Potvrďte nákup dárku',
      purchase: 'Koupit za',
      cancel: 'Zrušit'
    },
    en: {
      typing: 'Type a message...',
      send: 'Send',
      isTyping: 'is typing...',
      impressTitle: 'Make an impression on her!',
      impressSubtitle: 'Send her a small gift to unlock unlimited chat and show your interest.',
      justPrice: 'Just',
      mostPopular: 'Most popular choice',
      recommended: 'Recommended',
      securePayment: '🔒 One-time secure payment via Apple Pay / Google Pay / Card',
      unlimitedChat: '🎁 Unlocks unlimited messaging forever',
      paymentTitle: 'Complete Purchase',
      paymentDesc: 'Confirm your gift purchase',
      purchase: 'Buy for',
      cancel: 'Cancel'
    }
  };

  const featuredGifts = gifts.slice(0, 4);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary-50 to-romantic-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-primary-100 p-4 flex items-center space-x-4 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 hover:bg-primary-100 rounded-full transition-colors"
        >
          <i className="bi bi-arrow-left text-primary-600 text-xl" />
        </button>
        
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative">
            <img
              src={user.photos[0]}
              alt={user.name}
              crossOrigin="anonymous"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse-soft" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-secondary-900 text-lg">{user.name}</h3>
            <div className="flex items-center space-x-1">
              {user.isOnline && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                  <p className="text-xs text-green-600 font-medium">
                    {language === 'cs' ? 'Právě online' : 'Online now'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${messageCount >= 3 ? 'opacity-75' : ''}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.senderId === 'me'
                  ? 'bg-gradient-to-r from-primary-500 to-romantic-500 text-white'
                  : 'bg-white text-secondary-800 shadow-sm border border-secondary-100'
              } ${message.type === 'gift' ? 'text-center' : ''}`}
            >
              {message.type === 'gift' ? (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{message.content.split(' ')[2]}</span>
                  <span className="font-medium">{message.content.split(' ')[1]}</span>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <p className={`text-xs mt-1 ${message.senderId === 'me' ? 'text-white/70' : 'text-secondary-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {showTypingIndicator && messageCount >= 3 && (
          <div className="flex justify-start">
            <div className="bg-white text-secondary-800 shadow-sm border border-secondary-100 px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{user.name} {texts[language].isTyping}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area or Payment Gate */}
      {messageCount < 3 ? (
        <div className="bg-white/90 backdrop-blur-md border-t border-primary-100 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={texts[language].typing}
                className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-primary-500 to-romantic-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="bi bi-send-fill" />
            </button>
          </div>

          {/* Free Messages Counter */}
          <div className="text-center mt-3">
            <div className="inline-flex items-center bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-medium">
              <i className="bi bi-chat-text-fill mr-1" />
              {3 - messageCount} {language === 'cs' ? 'zprávy zdarma zbývají' : 'free messages left'}
            </div>
          </div>
        </div>
      ) : (
        /* Payment Gate */
        <div className="bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-md border-t border-primary-200 p-6">
          {/* Main Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
              {texts[language].impressTitle}
            </h2>
            <p className="text-secondary-600 text-sm leading-relaxed px-4">
              {texts[language].impressSubtitle}
            </p>
          </div>

          {/* Gift Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {featuredGifts.map((gift, index) => (
              <button
                key={gift.id}
                onClick={() => handleSelectGift(gift)}
                className={`relative p-4 bg-gradient-to-br from-white to-primary-50 hover:from-primary-50 hover:to-romantic-50 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 ${
                  index === 1 ? 'border-primary-300 shadow-lg' : 'border-primary-200'
                } group`}
              >
                {/* Recommended Badge */}
                {index === 1 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {texts[language].recommended}
                  </div>
                )}

                <div className="text-center">
                  <div className="text-4xl mb-2 group-hover:animate-bounce-gentle">{gift.icon}</div>
                  <div className="text-sm font-semibold text-secondary-800 mb-1">{gift.name}</div>
                  <div className="text-primary-600 font-bold">
                    <span className="text-xs font-medium">{texts[language].justPrice}</span>
                    <span className="text-lg ml-1">{convertPrice(gift.price)} {getCurrencySymbol()}</span>
                  </div>
                  
                  {/* Most Popular Badge */}
                  {index === 0 && (
                    <div className="text-xs text-accent-600 font-medium mt-1">
                      {texts[language].mostPopular}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Security & Benefits */}
          <div className="space-y-2 text-center">
            <p className="text-xs text-secondary-600 flex items-center justify-center">
              {texts[language].securePayment}
            </p>
            <p className="text-xs text-secondary-600 flex items-center justify-center">
              {texts[language].unlimitedChat}
            </p>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentModal && selectedGift && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full animate-slide-up shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-romantic-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{selectedGift.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2 font-display">
                {texts[language].paymentTitle}
              </h3>
              <p className="text-secondary-600 text-sm">
                {texts[language].paymentDesc}
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-romantic-50 rounded-2xl p-4 mb-6 border border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedGift.icon}</span>
                  <div>
                    <div className="font-semibold text-secondary-800">{selectedGift.name}</div>
                    <div className="text-xs text-secondary-600">
                      {language === 'cs' ? 'Pro' : 'For'} {user.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600">
                    {convertPrice(selectedGift.price)} {getCurrencySymbol()}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePurchaseGift}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg"
              >
                {texts[language].purchase} {convertPrice(selectedGift.price)} {getCurrencySymbol()}
              </button>
              
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3 text-secondary-600 hover:text-secondary-800 transition-colors font-medium"
              >
                {texts[language].cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
