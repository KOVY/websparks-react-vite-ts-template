import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserPreferences } from '../types';

export type CurrencyType = UserPreferences['currency'];

export interface CurrencyFormatOptions {
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatCurrency: (amount: number, options?: CurrencyFormatOptions) => string;
  convertCurrency: (amount: number, fromCurrency: CurrencyType, toCurrency: CurrencyType) => Promise<number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: CurrencyType;
}

const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ 
  children, 
  defaultCurrency = 'CZK' 
}) => {
  // State for current currency
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  
  // Mock exchange rates (in a real app, these would come from an API)
  const exchangeRates: Record<CurrencyType, Record<CurrencyType, number>> = {
    'CZK': {
      'CZK': 1,
      'EUR': 0.041,
      'USD': 0.045,
      'GBP': 0.035,
      'JPY': 6.43,
      'AUD': 0.068,
      'CAD': 0.061
    },
    'EUR': {
      'CZK': 24.39,
      'EUR': 1,
      'USD': 1.10,
      'GBP': 0.86,
      'JPY': 156.83,
      'AUD': 1.66,
      'CAD': 1.49
    },
    'USD': {
      'CZK': 22.12,
      'EUR': 0.91,
      'USD': 1,
      'GBP': 0.78,
      'JPY': 142.42,
      'AUD': 1.51,
      'CAD': 1.36
    },
    'GBP': {
      'CZK': 28.34,
      'EUR': 1.16,
      'USD': 1.28,
      'GBP': 1,
      'JPY': 182.24,
      'AUD': 1.93,
      'CAD': 1.73
    },
    'JPY': {
      'CZK': 0.156,
      'EUR': 0.0064,
      'USD': 0.0070,
      'GBP': 0.0055,
      'JPY': 1,
      'AUD': 0.0106,
      'CAD': 0.0095
    },
    'AUD': {
      'CZK': 14.73,
      'EUR': 0.60,
      'USD': 0.66,
      'GBP': 0.52,
      'JPY': 94.41,
      'AUD': 1,
      'CAD': 0.90
    },
    'CAD': {
      'CZK': 16.30,
      'EUR': 0.67,
      'USD': 0.74,
      'GBP': 0.58,
      'JPY': 105.81,
      'AUD': 1.11,
      'CAD': 1
    }
  };

  // Auto-detect user's region for default currency
  useEffect(() => {
    const detectRegionCurrency = (): CurrencyType => {
      try {
        // In a real app, you would use more sophisticated region detection
        // This is a simplified version
        const userLocale = navigator.language || 'cs-CZ';
        const [lang, country] = userLocale.split('-');
        
        // Map countries to default currencies
        if (country) {
          if (country === 'US') return 'USD';
          if (country === 'GB') return 'GBP';
          if (country === 'JP') return 'JPY';
          if (country === 'AU') return 'AUD';
          if (country === 'CA') return 'CAD';
          if (country === 'CZ') return 'CZK';
          if (['AT', 'BE', 'DE', 'ES', 'FR', 'IT', 'NL', 'PT'].includes(country)) return 'EUR';
        }
      } catch (error) {
        console.error('Error detecting region for currency:', error);
      }
      
      // Default currency if detection fails
      return defaultCurrency;
    };

    // Load saved currency from localStorage or detect based on region
    const savedCurrency = localStorage.getItem('appCurrency') as CurrencyType;
    if (savedCurrency) {
      setCurrency(savedCurrency);
    } else {
      const detectedCurrency = detectRegionCurrency();
      setCurrency(detectedCurrency);
    }
  }, [defaultCurrency]);

  // Save selected currency to localStorage and update current currency
  const handleSetCurrency = (newCurrency: CurrencyType) => {
    setCurrency(newCurrency);
    localStorage.setItem('appCurrency', newCurrency);
  };

  // Function to format numbers as currency
  const formatCurrency = (amount: number, options?: CurrencyFormatOptions): string => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: options?.style || 'currency',
        currency: currency,
        currencyDisplay: options?.currencyDisplay || 'symbol',
        minimumFractionDigits: options?.minimumFractionDigits || 2,
        maximumFractionDigits: options?.maximumFractionDigits || 2
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${amount} ${currency}`;
    }
  };

  // Function to convert currency (mock implementation)
  const convertCurrency = async (amount: number, fromCurrency: CurrencyType, toCurrency: CurrencyType): Promise<number> => {
    try {
      // In a real app, this would call an API like exchangeratesapi.io
      // For now, we'll use our mock exchange rates
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (fromCurrency === toCurrency) {
        return amount;
      }
      
      const rate = exchangeRates[fromCurrency][toCurrency];
      return Math.round(amount * rate * 100) / 100;
    } catch (error) {
      console.error('Error converting currency:', error);
      throw new Error('Currency conversion failed');
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatCurrency, convertCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook for using currency context in components
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyProvider;