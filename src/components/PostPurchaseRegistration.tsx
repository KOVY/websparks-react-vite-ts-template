import React, { useState } from 'react';
import { LanguageType } from '../LanguageProvider';

interface PostPurchaseRegistrationProps {
  isOpen: boolean;
  onComplete: (phoneNumber: string) => void;
  language: LanguageType;
  giftPurchased?: string;
  t: (key: string) => string;
}

const PostPurchaseRegistration: React.FC<PostPurchaseRegistrationProps> = ({ 
  isOpen, 
  onComplete, 
  language,
  giftPurchased,
  t 
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;



  const validatePhoneNumber = (phone: string) => {
    // Simple validation - can be enhanced with more comprehensive regex
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSendOTP = async () => {
    setError('');
    
    if (!phoneNumber.trim()) {
      setError(t('validPhoneError'));
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError(t('validPhoneError'));
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => window.setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return;
    
    setIsLoading(true);
    await new Promise(resolve => window.setTimeout(resolve, 1500));
    setIsLoading(false);
    onComplete(phoneNumber);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gradient-to-b from-white to-primary-50 rounded-3xl p-6 max-w-md w-full shadow-2xl"
        style={{ animation: 'modalAppear 0.5s ease-out forwards' }}
      >
        {step === 'phone' ? (
          <>
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <i className="bi bi-check-lg text-white text-3xl" />
              </div>
              {giftPurchased && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                  {t('giftSent')}
                </div>
              )}
              <h3 className="text-2xl font-bold text-secondary-900 mb-3 font-display">
                {t('greatSaveProgress')}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {t('completeQuickRegistration')}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-3">
                  {t('phoneNumber')}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 ${error ? 'border-red-300 focus:ring-red-500' : 'border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent'} text-lg`}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400">
                    <i className="bi bi-telephone-fill" />
                  </div>
                </div>
                {error && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    <i className="bi bi-exclamation-circle mr-1" /> {t('validPhoneError')}
                  </p>
                )}
              </div>

              {/* Benefits Section */}
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-secondary-700 mb-3">
                  {t('whyRegister')}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-secondary-600">
                    <i className="bi bi-check-circle text-green-500 mr-2" />
                    {t('keepConversations')}
                  </div>
                  <div className="flex items-center text-xs text-secondary-600">
                    <i className="bi bi-check-circle text-green-500 mr-2" />
                    {t('retainGifts')}
                  </div>
                  <div className="flex items-center text-xs text-secondary-600">
                    <i className="bi bi-check-circle text-green-500 mr-2" />
                    {t('accessFromAnywhere')}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
                style={{
                  boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    {t('sending')}
                  </div>
                ) : (
                  t('sendVerificationCode')
                )}
              </button>

              <div className="text-center text-xs text-secondary-500 flex items-center justify-center">
                <i className="bi bi-shield-check mr-1" /> {t('infoSecurelyStored')}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-shield-check-fill text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3 font-display">
                {t('verifyYourNumber')}
              </h3>
              <p className="text-secondary-600 mb-2">
                {t('enter6DigitCode')}
              </p>
              <p className="text-primary-600 font-semibold">{phoneNumber}</p>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder={t('otpPlaceholder')}
                  className="w-full px-4 py-4 border-2 border-secondary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-3xl font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otpCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
                style={{
                  boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    {t('completing')}
                  </div>
                ) : (
                  t('completeRegistration')
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPurchaseRegistration;
