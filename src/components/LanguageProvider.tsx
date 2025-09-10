import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import translations, { TranslationTexts } from '../locales/translations';

export type LanguageType = 'cs' | 'en' | 'es' | 'de' | 'fr';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: keyof TranslationTexts) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: LanguageType;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'cs' 
}) => {
  // Stav pro aktuální jazyk
  const [language, setLanguage] = useState<LanguageType>(defaultLanguage);

  // Automatické rozpoznání jazyka z prohlížeče
  useEffect(() => {
    const detectBrowserLanguage = (): LanguageType => {
      try {
        // Získání jazyků z prohlížeče
        const browserLanguages = navigator.languages || [navigator.language];
        
        // Kontrola, zda některý z jazyků prohlížeče odpovídá našim podporovaným jazykům
        for (const lang of browserLanguages) {
          const langCode = lang.split('-')[0]; // Získání primárního kódu jazyka (např. 'en' z 'en-US')
          
          if (langCode === 'cs') return 'cs';
          if (langCode === 'en') return 'en';
          if (langCode === 'es') return 'es';
          if (langCode === 'de') return 'de';
          if (langCode === 'fr') return 'fr';
        }
      } catch (error) {
        console.error('Error detecting browser language:', error);
      }
      
      // Výchozí jazyk, pokud rozpoznání selže
      return defaultLanguage;
    };

    // Pokud není uložený jazyk v localStorage, použijeme automaticky rozpoznaný jazyk
    const savedLanguage = localStorage.getItem('appLanguage') as LanguageType;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const detectedLanguage = detectBrowserLanguage();
      setLanguage(detectedLanguage);
    }
  }, [defaultLanguage]);

  // Uložení vybraného jazyka do localStorage a změna aktuálního jazyka
  const handleSetLanguage = (lang: LanguageType) => {
    if (Object.keys(translations).includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('appLanguage', lang);
    }
  };

  // Funkce pro získání překladu podle klíče
  const t = (key: keyof TranslationTexts): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pro použití jazykového kontextu v komponentách
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider;