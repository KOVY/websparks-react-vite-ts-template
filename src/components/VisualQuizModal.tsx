import React, { useState } from 'react';

interface VisualQuizModalProps {
  isOpen: boolean;
  onComplete: (answers: string[]) => void;
  language: 'cs' | 'en';
}

const VisualQuizModal: React.FC<VisualQuizModalProps> = ({ isOpen, onComplete, language }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const visualQuestions = [
    {
      id: 1,
      question: {
        cs: 'Jaký je váš ideální večer?',
        en: 'What is your ideal evening?'
      },
      options: [
        { icon: '🍷', label: { cs: 'Sklenka vína', en: 'Glass of wine' }, value: 'wine' },
        { icon: '🎬', label: { cs: 'Film', en: 'Movie' }, value: 'movie' },
        { icon: '✈️', label: { cs: 'Cestování', en: 'Travel' }, value: 'travel' },
        { icon: '⛰️', label: { cs: 'Hory', en: 'Mountains' }, value: 'mountains' }
      ]
    },
    {
      id: 2,
      question: {
        cs: 'Co vás nejvíce přitahuje?',
        en: 'What attracts you most?'
      },
      options: [
        { icon: '😄', label: { cs: 'Humor', en: 'Humor' }, value: 'humor' },
        { icon: '🧠', label: { cs: 'Inteligence', en: 'Intelligence' }, value: 'intelligence' },
        { icon: '💪', label: { cs: 'Fyzička', en: 'Fitness' }, value: 'fitness' },
        { icon: '🎨', label: { cs: 'Kreativita', en: 'Creativity' }, value: 'creativity' }
      ]
    },
    {
      id: 3,
      question: {
        cs: 'Váš životní styl?',
        en: 'Your lifestyle?'
      },
      options: [
        { icon: '🏃‍♀️', label: { cs: 'Aktivní', en: 'Active' }, value: 'active' },
        { icon: '📚', label: { cs: 'Klidný', en: 'Calm' }, value: 'calm' },
        { icon: '🎉', label: { cs: 'Společenský', en: 'Social' }, value: 'social' },
        { icon: '🧘‍♀️', label: { cs: 'Vyrovnaný', en: 'Balanced' }, value: 'balanced' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < visualQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = visualQuestions[currentQuestion];

  const texts = {
    cs: {
      title: 'Najdeme vám dokonalý protějšek!',
      subtitle: 'Odpovězte na 3 rychlé otázky',
      skip: 'Přeskočit'
    },
    en: {
      title: 'Find your perfect match!',
      subtitle: 'Answer 3 quick questions',
      skip: 'Skip'
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-romantic-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-heart-fill text-white text-2xl animate-bounce-gentle" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
            {texts[language].title}
          </h2>
          <p className="text-secondary-600">{texts[language].subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-secondary-600 mb-3">
            <span>{currentQuestion + 1}/{visualQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / visualQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-romantic-500 h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((currentQuestion + 1) / visualQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-secondary-900 mb-6 font-display">
            {question.question[language]}
          </h3>
        </div>

        {/* Visual Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="p-6 bg-gradient-to-br from-secondary-50 to-primary-50 hover:from-primary-100 hover:to-romantic-100 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-transparent hover:border-primary-300 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle">{option.icon}</div>
                <div className="text-sm font-semibold text-secondary-800">
                  {option.label[language]}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={() => onComplete([])}
            className="text-secondary-500 hover:text-secondary-700 text-sm font-medium transition-colors"
          >
            {texts[language].skip}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualQuizModal;
