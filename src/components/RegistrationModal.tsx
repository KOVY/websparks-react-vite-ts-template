import React, { useState } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onComplete: (phoneNumber: string) => void;
  language: 'cs' | 'en';
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onComplete, language }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const texts = {
    cs: {
      title: 'Dokončete registraci',
      subtitle: 'Pro pokračování v konverzaci se prosím zaregistrujte',
      phoneLabel: 'Telefonní číslo',
      phonePlaceholder: '+420 123 456 789',
      sendCode: 'Odeslat kód',
      otpTitle: 'Ověřte své číslo',
      otpSubtitle: 'Zadejte 6místný kód, který jsme vám poslali na',
      otpPlaceholder: '123456',
      verify: 'Ověřit',
      resend: 'Poslat znovu',
      sending: 'Odesílám...',
      verifying: 'Ověřujem...'
    },
    en: {
      title: 'Complete Registration',
      subtitle: 'Please register to continue the conversation',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+1 234 567 8900',
      sendCode: 'Send Code',
      otpTitle: 'Verify Your Number',
      otpSubtitle: 'Enter the 6-digit code we sent to',
      otpPlaceholder: '123456',
      verify: 'Verify',
      resend: 'Resend',
      sending: 'Sending...',
      verifying: 'Verifying...'
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
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
    onComplete(phoneNumber);
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
                {texts[language].title}
              </h3>
              <p className="text-secondary-600">{texts[language].subtitle}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {texts[language].phoneLabel}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={texts[language].phonePlaceholder}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? texts[language].sending : texts[language].sendCode}
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
                {texts[language].otpTitle}
              </h3>
              <p className="text-secondary-600">
                {texts[language].otpSubtitle}
              </p>
              <p className="text-primary-600 font-medium mt-1">{phoneNumber}</p>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={texts[language].otpPlaceholder}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otpCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? texts[language].verifying : texts[language].verify}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep('phone')}
                  className="text-secondary-500 hover:text-secondary-700 text-sm font-medium transition-colors"
                >
                  {texts[language].resend}
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
