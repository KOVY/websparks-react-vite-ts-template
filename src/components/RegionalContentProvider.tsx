import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageType } from './LanguageProvider';
import { Gift } from '../types';

// Define region types
export type RegionType = 
  | 'global'
  | 'northAmerica'
  | 'latinAmerica'
  | 'europe'
  | 'asia'
  | 'oceania'
  | 'middleEast'
  | 'africa';

// Define regional content context interface
interface RegionalContentContextType {
  region: RegionType;
  setRegion: (region: RegionType) => void;
  getRegionalGifts: () => Gift[];
  getRegionalEmoticons: () => { [key: string]: string };
  detectRegionByLanguage: (language: LanguageType) => RegionType;
}

// Create context
const RegionalContentContext = createContext<RegionalContentContextType | undefined>(undefined);

// Sample global gifts
const globalGifts: Gift[] = [
  { id: 'rose', price: 50, name: 'rose', icon: '🌹', labelKey: 'rose' },
  { id: 'coffee', price: 30, name: 'coffee', icon: '☕', labelKey: 'coffee' },
  { id: 'giftbox', price: 100, name: 'giftbox', icon: '🎁', labelKey: 'giftBox' },
  { id: 'heart', price: 80, name: 'heart', icon: '💖', labelKey: 'heart' },
];

// Region-specific gifts
const regionSpecificGifts: { [key in RegionType]: Gift[] } = {
  global: globalGifts,
  northAmerica: [
    ...globalGifts,
    { id: 'baseball', price: 75, name: 'baseball', icon: '⚾', labelKey: 'baseball' },
    { id: 'hamburger', price: 45, name: 'hamburger', icon: '🍔', labelKey: 'hamburger' },
  ],
  latinAmerica: [
    ...globalGifts,
    { id: 'taco', price: 40, name: 'taco', icon: '🌮', labelKey: 'taco' },
    { id: 'mexicanHat', price: 65, name: 'mexicanHat', icon: '🎩', labelKey: 'mexicanHat' },
  ],
  europe: [
    ...globalGifts,
    { id: 'wine', price: 90, name: 'wine', icon: '🍷', labelKey: 'wine' },
    { id: 'baguette', price: 35, name: 'baguette', icon: '🥖', labelKey: 'baguette' },
  ],
  asia: [
    ...globalGifts,
    { id: 'sushi', price: 85, name: 'sushi', icon: '🍣', labelKey: 'sushi' },
    { id: 'dragon', price: 120, name: 'dragon', icon: '🐉', labelKey: 'dragon' },
  ],
  oceania: [
    ...globalGifts,
    { id: 'surfboard', price: 110, name: 'surfboard', icon: '🏄‍♂️', labelKey: 'surfboard' },
    { id: 'palmTree', price: 55, name: 'palmTree', icon: '🌴', labelKey: 'palmTree' },
  ],
  middleEast: [
    ...globalGifts,
    { id: 'camel', price: 105, name: 'camel', icon: '🐪', labelKey: 'camel' },
    { id: 'dates', price: 45, name: 'dates', icon: '🌴', labelKey: 'dates' },
  ],
  africa: [
    ...globalGifts,
    { id: 'lion', price: 130, name: 'lion', icon: '🦁', labelKey: 'lion' },
    { id: 'elephant', price: 125, name: 'elephant', icon: '🐘', labelKey: 'elephant' },
  ],
};

// Regional emoticons
const regionalEmoticons: { [key in RegionType]: { [key: string]: string } } = {
  global: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
  },
  northAmerica: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    americanFlag: '🇺🇸',
    canadianFlag: '🇨🇦',
  },
  latinAmerica: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    mexicanFlag: '🇲🇽',
    brazilianFlag: '🇧🇷',
  },
  europe: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    frenchFlag: '🇫🇷',
    germanFlag: '🇩🇪',
    italianFlag: '🇮🇹',
    ukFlag: '🇬🇧',
    czechFlag: '🇨🇿',
  },
  asia: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    japaneseFlag: '🇯🇵',
    chineseFlag: '🇨🇳',
    koreanFlag: '🇰🇷',
  },
  oceania: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    australianFlag: '🇦🇺',
    newZealandFlag: '🇳🇿',
  },
  middleEast: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    saudiFlag: '🇸🇦',
    israeliFlag: '🇮🇱',
  },
  africa: {
    hello: '👋',
    thanks: '🙏',
    like: '❤️',
    happy: '😊',
    sad: '😢',
    southAfricanFlag: '🇿🇦',
    egyptianFlag: '🇪🇬',
  },
};

// Component for providing regional content
interface RegionalContentProviderProps {
  children: React.ReactNode;
}

export const RegionalContentProvider: React.FC<RegionalContentProviderProps> = ({ children }) => {
  // Initialize with default region
  const [region, setRegion] = useState<RegionType>('global');

  // Function to get gifts specific to the current region
  const getRegionalGifts = (): Gift[] => {
    return regionSpecificGifts[region];
  };

  // Function to get emoticons specific to the current region
  const getRegionalEmoticons = (): { [key: string]: string } => {
    return regionalEmoticons[region];
  };

  // Function to detect region based on language
  const detectRegionByLanguage = (language: LanguageType): RegionType => {
    const languageToRegion: { [key in LanguageType]?: RegionType } = {
      'cs': 'europe',
      'de': 'europe',
      'fr': 'europe',
      'es': 'latinAmerica', // Default to Latin America for Spanish
    };
    return languageToRegion[language] || 'global';
  };

  // Try to detect region from browser settings on mount
  useEffect(() => {
    try {
      // Get user's preferred languages from browser
      const userLanguages = navigator.languages || [navigator.language];
      
      // Map language codes to regions
      const languageCodeToRegion: { [key: string]: RegionType } = {
        'en-US': 'northAmerica',
        'en-GB': 'europe',
        'es-US': 'northAmerica',
        'es-MX': 'latinAmerica',
        'es-ES': 'europe',
        'fr-FR': 'europe',
        'fr-CA': 'northAmerica',
        'de-DE': 'europe',
        'zh-CN': 'asia',
        'ja-JP': 'asia',
        'ko-KR': 'asia',
        'pt-BR': 'latinAmerica',
        'pt-PT': 'europe',
        'ru-RU': 'europe',
        'ar-SA': 'middleEast',
        'hi-IN': 'asia',
        'en-AU': 'oceania',
        'en-NZ': 'oceania',
        'cs-CZ': 'europe',
      };

      // Check if any of the user's languages match our region mapping
      for (const lang of userLanguages) {
        if (languageCodeToRegion[lang]) {
          setRegion(languageCodeToRegion[lang]);
          break;
        }
        // Also check the primary language code (without country code)
        const primaryLang = lang.split('-')[0];
        if (primaryLang === 'es') setRegion('latinAmerica');
        else if (primaryLang === 'zh' || primaryLang === 'ja' || primaryLang === 'ko') setRegion('asia');
        else if (primaryLang === 'en') {
          // Default English to North America
          setRegion('northAmerica');
          break;
        }
      }
    } catch (error) {
      console.error('Error detecting region:', error);
      // Default to global if detection fails
      setRegion('global');
    }
  }, []);

  // Value to provide through context
  const contextValue: RegionalContentContextType = {
    region,
    setRegion,
    getRegionalGifts,
    getRegionalEmoticons,
    detectRegionByLanguage,
  };

  return (
    <RegionalContentContext.Provider value={contextValue}>
      {children}
    </RegionalContentContext.Provider>
  );
};

// Custom hook for using regional content context
export const useRegionalContent = (): RegionalContentContextType => {
  const context = useContext(RegionalContentContext);
  if (context === undefined) {
    throw new Error('useRegionalContent must be used within a RegionalContentProvider');
  }
  return context;
};