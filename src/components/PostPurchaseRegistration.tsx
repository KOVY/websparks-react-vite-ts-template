import React, { useState } from 'react';

interface PostPurchaseRegistrationProps {
  isOpen: boolean;
  onComplete: (phoneNumber: string) => void;
  language: 'cs' | 'en';
  giftPurchased?: string;
}

const PostPurchaseRegistration: React.FC<PostPurchaseRegistrationProps> = ({ 
  isOpen, 
  onComplete, 
  language,
  giftPurchased 
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const texts = {
    cs: {
      title: 'Skvělé! Uložte si svůj postup',
      subtitle: 'Dokončete rychlou registraci, abyste nepřišli o své konverzace a dárky. Zabere to 10 sekund.',
      phoneLabel: 'Telefonní číslo',
      phonePlaceholder: '+420 123 456 789',
      sendCode: 'Odeslat ověřovací kód',
      otpTitle: 'Ověřte své číslo',
      otpSubtitle: 'Zadejte 6místný kód',
      otpPlaceholder: '123456',
      verify: 'Dokončit registraci',
      sending: 'Odesílám...',
      verifying: 'Dokončujem...',
      giftSent: 'Dárek odeslán!',
      protection: '🔒 Ochrana vašich konverzací a dárků'
    },
    en: {
      title: 'Great! Save your progress',
      subtitle: 'Complete quick registration so you don\'t lose your conversations and gifts. Takes 10 seconds.',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+1 234 567 8900',
      sendCode: 'Send verification code',
      otpTitle: 'Verify your number',
      otpSubtitle: 'Enter the 6-digit code',
      otpPlaceholder: '123456',
      verify: 'Complete registration',
      sending: 'Sending...',
      verifying: 'Completing...',
      giftSent: 'Gift sent!',
      protection: '🔒 Protect your conversations and gifts'
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) return;
    
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-slide-up shadow-2xl">
        {step === 'phone' ? (
          <>
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <i className="bi bi-check-lg text-white text-3xl" />
              </div>
              {giftPurchased && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                  {texts[language].giftSent}
                </div>
              )}
              <h3 className="text-2xl font-bold text-secondary-900 mb-3 font-display">
                {texts[language].title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {texts[language].subtitle}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-3">
                  {texts[language].phoneLabel}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={texts[language].phonePlaceholder}
                  className="w-full px-4 py-4 border-2 border-secondary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
              >
                {isLoading ? texts[language].sending : texts[language].sendCode}
              </button>

              <div className="text-center text-xs text-secondary-500 flex items-center justify-center">
                {texts[language].protection}
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
                {texts[language].otpTitle}
              </h3>
              <p className="text-secondary-600 mb-2">
                {texts[language].otpSubtitle}
              </p>
              <p className="text-primary-600 font-semibold">{phoneNumber}</p>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={texts[language].otpPlaceholder}
                  className="w-full px-4 py-4 border-2 border-secondary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-3xl font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otpCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-romantic-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
              >
                {isLoading ? texts[language].verifying : texts[language].verify}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPurchaseRegistration;
