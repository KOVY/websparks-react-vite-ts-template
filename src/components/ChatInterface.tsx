import React, { useState, useRef, useEffect } from 'react';
import { Message, Gift, User } from '../types';
import { LanguageType } from './LanguageProvider';
import { useCurrency } from './CurrencyProvider';
import { useRegionalContent } from './RegionalContentProvider';

interface ChatInterfaceProps {
  user: User;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'gift', giftType?: string) => void;
  onBack: () => void;
  messageCount: number;
  language: LanguageType;
  t: (key: string) => string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  user,
  messages,
  onSendMessage,
  onBack,
  messageCount,
  language,
  t
}) => {
  const { formatCurrency } = useCurrency();
  const { getRegionalGifts } = useRegionalContent();
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

  // Currency conversion is now handled by the CurrencyProvider's formatCurrency function
  // We'll use it directly when displaying prices

  // All texts are now handled by the translation function t

  // Get regional gifts
  const gifts = getRegionalGifts();
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
                    {t('onlineNow')}
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
                <span className="text-sm font-medium">{user.name} {t('isTyping')}</span>
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
          {/* Free Messages Counter - Enhanced Visibility */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center bg-accent-100 text-accent-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
              <i className="bi bi-chat-text-fill mr-1.5" />
              {3 - messageCount} {t('freeMessagesLeft')}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('typing')}
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
        </div>
      ) : (
        /* Payment Gate - Enhanced Visual Design */
        <div className="bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-md border-t border-primary-200 p-6">
          {/* Main Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
                {t('impressTitle')}
              </h2>
              <p className="text-secondary-600 text-sm leading-relaxed px-4">
                {t('impressSubtitle')}
              </p>
          </div>

          {/* Gift Selection - Enhanced with Visual Appeal */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {featuredGifts.map((gift, index) => (
              <button
                key={gift.id}
                onClick={() => handleSelectGift(gift)}
                className={`relative p-5 bg-gradient-to-br from-white to-primary-50 hover:from-primary-100 hover:to-romantic-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 ${
                  index === 1 ? 'border-primary-300 shadow-lg' : 'border-primary-200'
                } group`}
              >
                {/* Recommended Badge */}
                {index === 1 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {t('recommended')}
                  </div>
                )}

                <div className="text-center">
                  <div className="text-5xl mb-2 group-hover:animate-bounce-gentle">{gift.icon}</div>
                  <div className="text-sm font-semibold text-secondary-800 mb-1">{gift.name}</div>
                  <div className="text-primary-600 font-bold">
                    <span className="text-xs font-medium">{t('justPrice')}</span>
                    <span className="text-lg ml-1">{formatCurrency(gift.price)}</span>
                  </div>
                  
                  {/* Most Popular Badge */}
                  {index === 0 && (
                    <div className="text-xs text-accent-600 font-medium mt-1">
                      {t('mostPopular')}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Security & Benefits */}
          <div className="space-y-3 text-center">
            <p className="text-xs text-secondary-600 flex items-center justify-center">
              {t('securePayment')}
            </p>
            <p className="text-xs text-secondary-600 flex items-center justify-center">
              {t('unlimitedChat')}
            </p>
            
            {/* Added Value Proposition */}
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 mt-4">
              <div className="flex items-center justify-center space-x-2">
                <i className="bi bi-check-circle text-primary-500" />
                <p className="text-xs text-primary-700 font-medium">
                  {t('giftsAreOneTime')}
                </p>
              </div>
            </div>
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
                {t('paymentTitle')}
              </h3>
              <p className="text-secondary-600 text-sm">
                {t('paymentDesc')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-romantic-50 rounded-2xl p-4 mb-6 border border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedGift.icon}</span>
                  <div>
                    <div className="font-semibold text-secondary-800">{selectedGift.name}</div>
                    <div className="text-xs text-secondary-600">
                      {t('forUser')} {user.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600">
                    {formatCurrency(selectedGift.price)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePurchaseGift}
              className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg"
            >
              {t('purchase')} {formatCurrency(selectedGift.price)}
            </button>
              
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3 text-secondary-600 hover:text-secondary-800 transition-colors font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
