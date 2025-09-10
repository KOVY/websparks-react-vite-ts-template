import { User, Gift } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    location: 'Prague, Czech Republic',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face'],
    bio: 'Love traveling and trying new cuisines. Looking for someone to explore the world with! 🌍✈️',
    interests: ['Travel', 'Food', 'Photography', 'Yoga'],
    verified: true,
    distance: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Sofia',
    age: 28,
    location: 'Barcelona, Spain',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face'],
    bio: 'Artist and coffee enthusiast. Passionate about life and looking for genuine connections 🎨☕',
    interests: ['Art', 'Coffee', 'Music', 'Dancing'],
    verified: true,
    distance: 1200,
    isOnline: false
  },
  {
    id: '3',
    name: 'Isabella',
    age: 26,
    location: 'Milan, Italy',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face'],
    bio: 'Fashion designer who loves weekend adventures. Seeking someone with a great sense of humor! 👗🌟',
    interests: ['Fashion', 'Design', 'Hiking', 'Wine'],
    verified: true,
    distance: 800,
    isOnline: true
  },
  {
    id: '4',
    name: 'Amélie',
    age: 24,
    location: 'Paris, France',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face'],
    bio: 'Book lover and aspiring writer. Enjoy quiet cafés and deep conversations 📚💭',
    interests: ['Reading', 'Writing', 'Literature', 'Philosophy'],
    verified: true,
    distance: 900,
    isOnline: true
  },
  {
    id: '5',
    name: 'Zara',
    age: 27,
    location: 'London, UK',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face'],
    bio: 'Marketing professional who loves fitness and healthy living. Always up for new challenges! 💪🌱',
    interests: ['Fitness', 'Health', 'Marketing', 'Running'],
    verified: true,
    distance: 1100,
    isOnline: false
  },
  {
    id: '6',
    name: 'Anastasia',
    age: 23,
    location: 'Moscow, Russia',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'],
    bio: 'Dancer and music lover. Life is too short not to dance! Looking for my dance partner 💃🎵',
    interests: ['Dancing', 'Music', 'Performance', 'Theater'],
    verified: true,
    distance: 1500,
    isOnline: true
  },
  {
    id: '7',
    name: 'Yuki',
    age: 25,
    location: 'Tokyo, Japan',
    photos: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face'],
    bio: 'Tech enthusiast and anime fan. Love exploring new technologies and cultures 🤖🌸',
    interests: ['Technology', 'Anime', 'Gaming', 'Culture'],
    verified: true,
    distance: 8500,
    isOnline: true
  },
  {
    id: '8',
    name: 'Priya',
    age: 26,
    location: 'Mumbai, India',
    photos: ['https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=600&fit=crop&crop=face'],
    bio: 'Yoga instructor and spiritual seeker. Believe in the power of positive energy ✨🧘‍♀️',
    interests: ['Yoga', 'Meditation', 'Spirituality', 'Nature'],
    verified: true,
    distance: 6200,
    isOnline: false
  },
  {
    id: '9',
    name: 'Lucia',
    age: 29,
    location: 'São Paulo, Brazil',
    photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face'],
    bio: 'Photographer capturing life\'s beautiful moments. Adventure seeker and beach lover 📸🏖️',
    interests: ['Photography', 'Beach', 'Adventure', 'Nature'],
    verified: true,
    distance: 9800,
    isOnline: true
  },
  {
    id: '10',
    name: 'Chloe',
    age: 24,
    location: 'Sydney, Australia',
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face'],
    bio: 'Marine biologist who loves the ocean. Passionate about conservation and making a difference 🌊🐠',
    interests: ['Marine Biology', 'Conservation', 'Diving', 'Science'],
    verified: true,
    distance: 15000,
    isOnline: true
  }
];

export const gifts: Gift[] = [
  {
    id: 'kiss',
    name: 'Kiss',
    icon: '💋',
    price: 10,
    currency: 'CZK',
    category: 'basic'
  },
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    price: 15,
    currency: 'CZK',
    category: 'premium'
  },
  {
    id: 'clover',
    name: 'Lucky Clover',
    icon: '🍀',
    price: 12,
    currency: 'CZK',
    category: 'basic'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: '💎',
    price: 25,
    currency: 'CZK',
    category: 'vip'
  },
  {
    id: 'bouquet',
    name: 'Bouquet',
    icon: '💐',
    price: 20,
    currency: 'CZK',
    category: 'premium'
  },
  {
    id: 'champagne',
    name: 'Champagne',
    icon: '🍾',
    price: 30,
    currency: 'CZK',
    category: 'vip'
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: {
      cs: 'Jaký je váš ideální první rande?',
      en: 'What is your ideal first date?'
    },
    options: [
      { cs: 'Romantická večeře', en: 'Romantic dinner' },
      { cs: 'Procházka v parku', en: 'Walk in the park' },
      { cs: 'Kino nebo divadlo', en: 'Cinema or theater' },
      { cs: 'Sportovní aktivita', en: 'Sports activity' }
    ]
  },
  {
    id: 2,
    question: {
      cs: 'Co vás nejvíce přitahuje na partnerovi?',
      en: 'What attracts you most in a partner?'
    },
    options: [
      { cs: 'Smysl pro humor', en: 'Sense of humor' },
      { cs: 'Inteligence', en: 'Intelligence' },
      { cs: 'Fyzická přitažlivost', en: 'Physical attraction' },
      { cs: 'Společné zájmy', en: 'Common interests' }
    ]
  },
  {
    id: 3,
    question: {
      cs: 'Jak trávíte volný čas?',
      en: 'How do you spend your free time?'
    },
    options: [
      { cs: 'Čtení a vzdělávání', en: 'Reading and learning' },
      { cs: 'Sport a fitness', en: 'Sports and fitness' },
      { cs: 'Cestování', en: 'Traveling' },
      { cs: 'Umění a kultura', en: 'Arts and culture' }
    ]
  }
];
