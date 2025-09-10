import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';
import { LanguageType } from './LanguageProvider';

interface QuizModalProps {
  isOpen: boolean;
  onComplete: (answers: string[]) => void;
  language: LanguageType;
  t: (key: string) => string;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onComplete, language, t }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-slide-up shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-secondary-600 mb-2">
              <span>{t('question')} {currentQuestion + 1}/{quizQuestions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-romantic-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-secondary-900 mb-2 font-display">
            {question.question[language]}
          </h3>
          <p className="text-secondary-600 text-sm">
              {t('chooseAnswerThatBestDescribesYou')}
            </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option[language])}
              className="w-full p-4 text-left bg-secondary-50 hover:bg-primary-50 hover:border-primary-300 border border-secondary-200 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="text-secondary-800 font-medium">{option[language]}</span>
            </button>
          ))}
        </div>

        {/* Skip Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => onComplete([])}
            className="text-secondary-500 hover:text-secondary-700 text-sm font-medium transition-colors"
          >
            {t('skipQuiz')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
