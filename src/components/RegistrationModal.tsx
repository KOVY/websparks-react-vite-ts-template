import React, { useState } from 'react';
import { LanguageType } from '../LanguageProvider';


interface RegistrationModalProps {
  isOpen: boolean;
  onComplete: (phoneNumber: string) => void;
  language: LanguageType;
  t: (key: string) => string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onComplete, language, t }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+420'); // Default to Czech Republic
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Common country codes for quick selection
  const commonCountries = [
    { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  ];
  
  // Format phone number by removing non-digit characters except '+'
  const formatPhoneNumber = (value: string): string => {
    return value.replace(/[^+\d]/g, '');
  };
  
  // Get full phone number with country code
  const getFullPhoneNumber = (): string => {
    return `${countryCode}${phoneNumber.replace(/^[+]/, '')}`;
  };

  if (!isOpen) return null;


  const handleSendOTP = async () => {
    if (!phoneNumber.trim() || phoneNumber.length < 8) return;
    
    setIsLoading(true);
    // Simulate API call with full phone number
    const fullPhoneNumber = getFullPhoneNumber();
    console.log('Sending OTP to:', fullPhoneNumber);
    
    await new Promise(resolve => window.setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => window.setTimeout(resolve, 1500));
    setIsLoading(false);
    onComplete(getFullPhoneNumber());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-slide-up shadow-2xl">
        {step === 'phone' ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-romantic-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-phone-fill text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
                {t('completeRegistration')}
              </h3>
              <p className="text-secondary-600">{t('registerToContinue')}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('phoneNumber')}
                </label>
                <div className="flex space-x-3">
                  <div className="relative flex-1 min-w-[100px]">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-8 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      {commonCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code} ({country.name})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-secondary-500">
                      <i className="bi bi-chevron-down" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      placeholder={t('phonePlaceholder')}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? t('sending') : t('sendCode')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-shield-check-fill text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2 font-display">
                {t('verifyYourNumber')}
              </h3>
              <p className="text-secondary-600">
                {t('enterCodeSent')}
              </p>
              <p className="text-primary-600 font-medium mt-1">{getFullPhoneNumber()}</p>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t('otpPlaceholder')}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otpCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? t('verifying') : t('verify')}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep('phone')}
                  className="text-secondary-500 hover:text-secondary-700 text-sm font-medium transition-colors"
                >
                  {t('resend')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
