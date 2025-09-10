import React, { useState } from 'react';
import { LanguageType } from '../LanguageProvider';

interface VisualQuizModalProps {
  isOpen: boolean;
  onComplete: (answers: string[]) => void;
  language: LanguageType;
  t: (key: string) => string;
}

const VisualQuizModal: React.FC<VisualQuizModalProps> = ({ isOpen, onComplete, language, t }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const visualQuestions = [
    {
      id: 1,
      questionKey: 'idealEvening',
      options: [
        { icon: '🍷', labelKey: 'glassOfWine', value: 'wine' },
        { icon: '🎬', labelKey: 'movie', value: 'movie' },
        { icon: '✈️', labelKey: 'travel', value: 'travel' },
        { icon: '⛰️', labelKey: 'mountains', value: 'mountains' }
      ]
    },
    {
      id: 2,
      questionKey: 'whatAttractsYou',
      options: [
        { icon: '😄', labelKey: 'humor', value: 'humor' },
        { icon: '🧠', labelKey: 'intelligence', value: 'intelligence' },
        { icon: '💪', labelKey: 'fitness', value: 'fitness' },
        { icon: '🎨', labelKey: 'creativity', value: 'creativity' }
      ]
    },
    {
      id: 3,
      questionKey: 'yourLifestyle',
      options: [
        { icon: '🏃‍♀️', labelKey: 'active', value: 'active' },
        { icon: '📚', labelKey: 'calm', value: 'calm' },
        { icon: '🎉', labelKey: 'social', value: 'social' },
        { icon: '🧘‍♀️', labelKey: 'balanced', value: 'balanced' }
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-slide-up shadow-2xl border border-primary-100">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-romantic-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="bi bi-heart-fill text-white text-2xl animate-bounce-gentle" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
            {t('findPerfectMatch')}
          </h2>
          <p className="text-secondary-600">{t('answerQuickQuestions')}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-secondary-600 mb-2">
            <span>{currentQuestion + 1}/{visualQuestions.length}</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-primary-500 to-romantic-500 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((currentQuestion + 1) / visualQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 font-display">
            {t(question.questionKey)}
          </h3>
        </div>

        {/* Visual Options - Enhanced Animation */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="p-5 bg-gradient-to-br from-secondary-50 to-primary-50 hover:from-primary-100 hover:to-romantic-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-transparent hover:border-primary-300 group"
            >
              <div className="text-center">
                <div className="text-5xl mb-3 group-hover:animate-bounce-gentle">{option.icon}</div>
                <div className="text-sm font-semibold text-secondary-800">
                  {t(option.labelKey)}
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
            {t('skip')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualQuizModal;
