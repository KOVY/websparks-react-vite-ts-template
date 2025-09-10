export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  photos: string[];
  bio: string;
  interests: string[];
  verified: boolean;
  distance: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'gift';
  giftType?: string;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  currency: string;
  category: 'basic' | 'premium';
}

export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface UserPreferences {
  ageRange: [number, number];
  maxDistance: number;
  interests: string[];
  language: 'cs' | 'en' | 'es' | 'de' | 'fr';
  currency: 'CZK' | 'EUR' | 'USD' | 'GBP' | 'JPY' | 'AUD' | 'CAD';
}
