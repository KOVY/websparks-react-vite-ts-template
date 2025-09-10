import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { LanguageType } from './LanguageProvider';

interface WelcomeScreenProps {
  user: User;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  language: LanguageType;
  t: (key: string) => string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ user, onSwipeRight, onSwipeLeft, language, t }) => {
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000); // Dlouší zobrazení nápovědy pro swipování
    return () => window.clearTimeout(timer);
  }, []);

  const getCountryFlag = (location: string) => {
    const countryFlags: { [key: string]: string } = {
      'Spain': '🇪🇸',
      'Italy': '🇮🇹', 
      'France': '🇫🇷',
      'UK': '🇬🇧',
      'Russia': '🇷🇺',
      'Japan': '🇯🇵',
      'India': '🇮🇳',
      'Brazil': '🇧🇷',
      'Australia': '🇦🇺',
      'Czech Republic': '🇨🇿'
    };
    
    for (const [country, flag] of Object.entries(countryFlags)) {
      if (location.includes(country)) return flag;
    }
    return '🌍';
  };

  // Translation keys are handled by the t() function provided via props

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Main Photo */}
      <div className="absolute inset-0">
        <img
          src={user.photos[0]}
          alt={user.name}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Swipe Hint Animation */}
      {showSwipeHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium animate-fade-in">
            {t('swipeRightToLike')}
          </div>
          <div className="flex justify-center mt-4 space-x-8">
            <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center animate-bounce-gentle">
              <i className="bi bi-arrow-left text-white text-xl" />
            </div>
            <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
              <i className="bi bi-arrow-right text-white text-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Minimalní indikátory */}
      {user.isOnline && (
        <div className="absolute top-6 right-6 flex items-center space-x-1 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium z-20">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-soft" />
          <span>{t('online')}</span>
        </div>
      )}

      {user.verified && (
        <div className="absolute top-6 left-6 bg-primary-500/90 backdrop-blur-sm text-white p-1.5 rounded-full z-20">
          <i className="bi bi-patch-check-fill text-sm" />
        </div>
      )}

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold font-display">{user.name}</h1>
            <span className="text-2xl font-medium opacity-90">{user.age}</span>
            <span className="text-3xl">{getCountryFlag(user.location)}</span>
          </div>
          
          <p className="text-lg leading-relaxed opacity-95 mb-6 max-w-md line-clamp-3">
            {user.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-10 mb-6">
          <button
            onClick={onSwipeLeft}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30"
          >
            <i className="bi bi-arrow-left text-white text-xl" />
          </button>
          
          <button
            onClick={onSwipeRight}
            className="w-20 h-20 bg-gradient-to-r from-primary-500 to-romantic-500 hover:from-primary-600 hover:to-romantic-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <i className="bi bi-heart-fill text-white text-2xl animate-bounce-gentle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
