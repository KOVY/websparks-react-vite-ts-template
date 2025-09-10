// Hlavní soubor pro správu překladů v aplikaci

export interface TranslationTexts {
  welcome: string;
  getStarted: string;
  swipe: string;
  swipeRightToLike: string;
  matches: string;
  profile: string;
  typing: string;
  send: string;
  impressTitle: string;
  impressSubtitle: string;
  recommended: string;
  justPrice: string;
  mostPopular: string;
  securePayment: string;
  unlimitedChat: string;
  verifyPhone: string;
  enterPhone: string;
  sendCode: string;
  verifyCode: string;
  completeRegistration: string;
  quizQuestion1: string;
  quizQuestion2: string;
  quizQuestion3: string;
  yes: string;
  no: string;
  maybe: string;
  continue: string;
  skip: string;
  close: string;
  online: string;
  onlineNow: string;
  verified: string;
  distance: string;
  km: string;
  years: string;
  interests: string;
  chooseInterests: string;
  save: string;
  settings: string;
  language: string;
  currency: string;
  english: string;
  czech: string;
  spanish: string;
  german: string;
  french: string;
  czk: string;
  eur: string;
  usd: string;
  gbp: string;
  jpy: string;
  changeLanguage: string;
  isTyping: string;
  paymentTitle: string;
  paymentDesc: string;
  purchase: string;
  cancel: string;
  freeMessagesLeft: string;
  giftsAreOneTime: string;
  forUser: string;
  away: string;
  // Visual Quiz Modal
  findPerfectMatch: string;
  answerQuickQuestions: string;
  idealEvening: string;
  whatAttractsYou: string;
  yourLifestyle: string;
  glassOfWine: string;
  movie: string;
  travel: string;
  mountains: string;
  humor: string;
  intelligence: string;
  fitness: string;
  creativity: string;
  active: string;
  calm: string;
  social: string;
  balanced: string;
  // Post Purchase Registration
  greatSaveProgress: string;
  completeQuickRegistration: string;
  phoneNumber: string;
  phonePlaceholder: string;
  sendVerificationCode: string;
  verifyYourNumber: string;
  enter6DigitCode: string;
  otpPlaceholder: string;
  sending: string;
  completing: string;
  giftSent: string;
  infoSecurelyStored: string;
  validPhoneError: string;
  whyRegister: string;
  keepConversations: string;
  retainGifts: string;
  accessFromAnywhere: string;
  // Registration Modal
  registerToContinue: string;
  sendCode: string;
  enterCodeSent: string;
  verify: string;
  resend: string;
  verifying: string;
  
  // Quiz Modal
  question: string;
  chooseAnswerThatBestDescribesYou: string;
  skipQuiz: string;
}

export const translations: Record<string, TranslationTexts> = {
  cs: {
    welcome: 'Vítejte',
    getStarted: 'Začít',
    swipe: 'Prokliknout',
    swipeRightToLike: 'Swipněte doprava pro lajk, doleva pro přeskočení',
    matches: 'Shody',
    profile: 'Profil',
    typing: 'Napište zprávu...',
    send: 'Odeslat',
    impressTitle: 'Zanechte dojem!',
    impressSubtitle: 'Pošlete dárky, aby se vaše konverzace vydržely déle a získali jste neomezený chat.',
    recommended: 'Doporučujeme',
    justPrice: 'jen',
    mostPopular: 'Nejpopulárnější',
    securePayment: '🔒 Bezpečná platba',
    unlimitedChat: '💬 Neomezený chat',
    verifyPhone: 'Ověřte své telefonní číslo',
    enterPhone: 'Zadejte telefonní číslo',
    sendCode: 'Odeslat kód',
    verifyCode: 'Ověřit kód',
    completeRegistration: 'Dokončit registraci',
    quizQuestion1: 'Máte zájem o dlouhodobou relaci?',
    quizQuestion2: 'Důležité jsou vám společné zájmy?',
    quizQuestion3: 'Je pro vás důležitá fyzická přítomnost?',
    yes: 'Ano',
    no: 'Ne',
    maybe: 'Možná',
    continue: 'Pokračovat',
    skip: 'Přeskočit',
    close: 'Zavřít',
    online: 'Online',
    onlineNow: 'Právě online',
    verified: 'Verifikován',
    distance: 'Vzdálenost',
    km: 'km',
    years: 'let',
    interests: 'Zájmy',
    chooseInterests: 'Vyberte své zájmy',
    save: 'Uložit',
    settings: 'Nastavení',
    language: 'Jazyk',
    currency: 'Měna',
    english: 'Angličtina',
    czech: 'Čeština',
    spanish: 'Španělština',
    german: 'Němčina',
    french: 'Francouzština',
    czk: 'Kč',
    eur: '€',
    usd: '$',
    gbp: '£',
    jpy: '¥',
    changeLanguage: 'Změnit jazyk',
    isTyping: 'píše...',
    paymentTitle: 'Dokončit nákup',
    paymentDesc: 'Potvrďte nákup dárku',
    purchase: 'Koupit za',
    cancel: 'Zrušit',
    freeMessagesLeft: 'zprávy zdarma zbývají',
    giftsAreOneTime: 'Dárky jsou jednorázové, chat zůstává navždy!',
    forUser: 'Pro',
    away: 'odtud',
    findPerfectMatch: 'Najdeme vám dokonalý protějšek!',
    answerQuickQuestions: 'Odpovězte na 3 rychlé otázky',
    idealEvening: 'Jaký je váš ideální večer?',
    whatAttractsYou: 'Co vás nejvíce přitahuje?',
    yourLifestyle: 'Váš životní styl?',
    glassOfWine: 'Sklenka vína',
    movie: 'Film',
    travel: 'Cestování',
    mountains: 'Hory',
    humor: 'Humor',
    intelligence: 'Inteligence',
    fitness: 'Fyzička',
    creativity: 'Kreativita',
    active: 'Aktivní',
    calm: 'Klidný',
    social: 'Společenský',
    balanced: 'Vyrovnaný',
    // Post Purchase Registration
    greatSaveProgress: 'Skvělé! Uložte svůj postup.',
    completeQuickRegistration: 'Dokončete rychlou registraci, abyste si uložili své konverzace a dárky. Trvá 10 sekund.',
    phoneNumber: 'Telefonní číslo',
    phonePlaceholder: '+420 123 456 789',
    sendVerificationCode: 'Odeslat ověřovací kód (OTP)',
    verifyYourNumber: 'Ověřte si telefon',
    enter6DigitCode: 'Zadejte 6místný kód',
    otpPlaceholder: '123456',
    completeRegistration: 'Dokončit registraci',
    sending: 'Odesílání...',
    completing: 'Dokončování...',
    giftSent: 'Dárek odeslán!',
    infoSecurelyStored: 'Vaše informace jsou bezpečně uloženy a chráněny',
    validPhoneError: 'Zadejte prosím platné telefonní číslo',
    whyRegister: 'Proč se registrovat?',
    keepConversations: 'Udržujte všechny své konverzace',
    retainGifts: 'Udržujte dárky, které jste poslali',
    accessFromAnywhere: 'Přístup k profilu odkudkoli',
    // Registration Modal
  registerToContinue: 'Pro pokračování v konverzaci se prosím zaregistrujte',
  sendCode: 'Odeslat kód',
  enterCodeSent: 'Zadejte 6místný kód, který jsme vám poslali na',
  verify: 'Ověřit',
  resend: 'Poslat znovu',
  verifying: 'Ověřujem...',
  
  // Quiz Modal
  question: 'Otázka',
  chooseAnswerThatBestDescribesYou: 'Vyberte odpověď, která vás nejlépe vystihuje',
  skipQuiz: 'Přeskočit kvíz'
  },
  en: {
    welcome: 'Welcome',
    getStarted: 'Get Started',
    swipe: 'Swipe',
    swipeRightToLike: 'Swipe right to like, left to pass',
    matches: 'Matches',
    profile: 'Profile',
    typing: 'Type a message...',
    send: 'Send',
    impressTitle: 'Make an impression!',
    impressSubtitle: 'Send gifts to make your conversations last longer and get unlimited chat.',
    recommended: 'Recommended',
    justPrice: 'just',
    mostPopular: 'Most Popular',
    securePayment: '🔒 Secure payment',
    unlimitedChat: '💬 Unlimited chat',
    verifyPhone: 'Verify your phone number',
    enterPhone: 'Enter phone number',
    sendCode: 'Send code',
    verifyCode: 'Verify code',
    completeRegistration: 'Complete registration',
    quizQuestion1: 'Are you interested in a long-term relationship?',
    quizQuestion2: 'Are shared interests important to you?',
    quizQuestion3: 'Is physical presence important to you?',
    yes: 'Yes',
    no: 'No',
    maybe: 'Maybe',
    continue: 'Continue',
    skip: 'Skip',
    close: 'Close',
    online: 'Online',
    onlineNow: 'Online now',
    verified: 'Verified',
    distance: 'Distance',
    km: 'km',
    years: 'years',
    interests: 'Interests',
    chooseInterests: 'Choose your interests',
    save: 'Save',
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    english: 'English',
    czech: 'Czech',
    spanish: 'Spanish',
    german: 'German',
    french: 'French',
    czk: 'Kč',
    eur: '€',
    usd: '$',
    gbp: '£',
    jpy: '¥',
    changeLanguage: 'Change language',
    isTyping: 'is typing...',
    paymentTitle: 'Complete Purchase',
    paymentDesc: 'Confirm your gift purchase',
    purchase: 'Buy for',
    cancel: 'Cancel',
    freeMessagesLeft: 'free messages left',
    giftsAreOneTime: 'Gifts are one-time, chat remains forever!',
    forUser: 'For',
    away: 'away',
    findPerfectMatch: 'Find your perfect match!',
    answerQuickQuestions: 'Answer 3 quick questions',
    idealEvening: 'What is your ideal evening?',
    whatAttractsYou: 'What attracts you most?',
    yourLifestyle: 'Your lifestyle?',
    glassOfWine: 'Glass of wine',
    movie: 'Movie',
    travel: 'Travel',
    mountains: 'Mountains',
    humor: 'Humor',
    intelligence: 'Intelligence',
    fitness: 'Fitness',
    creativity: 'Creativity',
    active: 'Active',
    calm: 'Calm',
    social: 'Social',
    balanced: 'Balanced',
    // Post Purchase Registration
    greatSaveProgress: 'Great! Save your progress.',
    completeQuickRegistration: 'Complete quick registration to save your conversations and gifts. It takes 10 seconds.',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '+1 123 456 7890',
    sendVerificationCode: 'Send verification code (OTP)',
    verifyYourNumber: 'Verify your number',
    enter6DigitCode: 'Enter 6-digit code',
    otpPlaceholder: '123456',
    completeRegistration: 'Complete registration',
    sending: 'Sending...',
    completing: 'Completing...',
    giftSent: 'Gift sent!',
    infoSecurelyStored: 'Your information is securely stored and protected',
    validPhoneError: 'Please enter a valid phone number',
    whyRegister: 'Why register?',
    keepConversations: 'Keep all your conversations',
    retainGifts: 'Retain the gifts you sent',
    accessFromAnywhere: 'Access your profile from anywhere',
    // Registration Modal
  registerToContinue: 'Please register to continue the conversation',
  sendCode: 'Send Code',
  enterCodeSent: 'Enter the 6-digit code we sent to',
  verify: 'Verify',
  resend: 'Resend',
  verifying: 'Verifying...',
  
  // Quiz Modal
  question: 'Question',
  chooseAnswerThatBestDescribesYou: 'Choose the answer that best describes you',
  skipQuiz: 'Skip quiz'
  },
  es: {
    welcome: 'Bienvenido',
    getStarted: 'Comenzar',
    swipe: 'Deslizar',
    swipeRightToLike: 'Desliza a la derecha para gustar, a la izquierda para pasar',
    matches: 'Coincidencias',
    profile: 'Perfil',
    typing: 'Escribe un mensaje...',
    send: 'Enviar',
    impressTitle: '¡Haz una impresión!',
    impressSubtitle: 'Envía regalos para que tus conversaciones duren más y obtén chat ilimitado.',
    recommended: 'Recomendado',
    justPrice: 'solo',
    mostPopular: 'Más Popular',
    securePayment: '🔒 Pago seguro',
    unlimitedChat: '💬 Chat ilimitado',
    verifyPhone: 'Verifica tu número de teléfono',
    enterPhone: 'Introduce número de teléfono',
    sendCode: 'Enviar código',
    verifyCode: 'Verificar código',
    completeRegistration: 'Completar registro',
    quizQuestion1: '¿Estás interesado en una relación a largo plazo?',
    quizQuestion2: '¿Los intereses compartidos son importantes para ti?',
    quizQuestion3: '¿Es importante para ti la presencia física?',
    yes: 'Sí',
    no: 'No',
    maybe: 'Quizás',
    continue: 'Continuar',
    skip: 'Saltar',
    close: 'Cerrar',
    online: 'En línea',
    onlineNow: 'En línea ahora',
    verified: 'Verificado',
    distance: 'Distancia',
    km: 'km',
    years: 'años',
    interests: 'Intereses',
    chooseInterests: 'Elige tus intereses',
    save: 'Guardar',
    settings: 'Configuración',
    language: 'Idioma',
    currency: 'Moneda',
    english: 'Inglés',
    czech: 'Checo',
    spanish: 'Español',
    german: 'Alemán',
    french: 'Francés',
    czk: 'Kč',
    eur: '€',
    usd: '$',
    gbp: '£',
    jpy: '¥',
    changeLanguage: 'Cambiar idioma',
    isTyping: 'está escribiendo...',
    paymentTitle: 'Completar compra',
    paymentDesc: 'Confirma tu compra de regalo',
    purchase: 'Comprar por',
    cancel: 'Cancelar',
    freeMessagesLeft: 'mensajes gratuitos restantes',
    giftsAreOneTime: '¡Los regalos son de una vez, el chat permanece para siempre!',
    forUser: 'Para',
    away: 'de distancia',
    findPerfectMatch: '¡Encuentra tu pareja perfecta!',
    answerQuickQuestions: 'Responde 3 preguntas rápidas',
    idealEvening: '¿Cuál es tu noche ideal?',
    whatAttractsYou: '¿Qué te atrae más?',
    yourLifestyle: '¿Tu estilo de vida?',
    glassOfWine: 'Copa de vino',
    movie: 'Película',
    travel: 'Viajar',
    mountains: 'Montañas',
    humor: 'Humor',
    intelligence: 'Inteligencia',
    fitness: 'Fitness',
    creativity: 'Creatividad',
    active: 'Activo',
    calm: 'Tranquilo',
    social: 'Social',
    balanced: 'Equilibrado',
    // Post Purchase Registration
    greatSaveProgress: '¡Genial! Guarda tu progreso.',
    completeQuickRegistration: 'Completa el registro rápido para guardar tus conversaciones y regalos. Tarda 10 segundos.',
    phoneNumber: 'Número de teléfono',
    phonePlaceholder: '+34 123 456 789',
    sendVerificationCode: 'Enviar código de verificación (OTP)',
    verifyYourNumber: 'Verifica tu número',
    enter6DigitCode: 'Introduce el código de 6 dígitos',
    otpPlaceholder: '123456',
    completeRegistration: 'Completar registro',
    sending: 'Enviando...',
    completing: 'Completando...',
    giftSent: '¡Regalo enviado!',
    infoSecurelyStored: 'Tu información está almacenada y protegida de forma segura',
    validPhoneError: 'Por favor, introduce un número de teléfono válido',
    whyRegister: '¿Por qué registrarse?',
    keepConversations: 'Mantén todas tus conversaciones',
    retainGifts: 'Conserva los regalos que enviaste',
    accessFromAnywhere: 'Accede a tu perfil desde cualquier lugar',
    // Registration Modal
  registerToContinue: 'Por favor, regístrate para continuar la conversación',
  sendCode: 'Enviar código',
  enterCodeSent: 'Introduce el código de 6 dígitos que te enviamos a',
  verify: 'Verificar',
  resend: 'Reenviar',
  verifying: 'Verificando...',
  
  // Quiz Modal
  question: 'Pregunta',
  chooseAnswerThatBestDescribesYou: 'Elige la respuesta que mejor te describe',
  skipQuiz: 'Saltar cuestionario'
  },
  de: {
    welcome: 'Willkommen',
    getStarted: 'Loslegen',
    swipe: 'Wischen',
    swipeRightToLike: 'Nach rechts wischen zu liken, nach links zu überspringen',
    matches: 'Treffen',
    profile: 'Profil',
    typing: 'Schreiben Sie eine Nachricht...',
    send: 'Senden',
    impressTitle: 'Machen Sie einen Eindruck!',
    impressSubtitle: 'Senden Sie Geschenke, damit Ihre Unterhaltungen länger halten und erhalten Sie unbegrenzten Chat.',
    recommended: 'Empfohlen',
    justPrice: 'nur',
    mostPopular: 'Am Beliebtesten',
    securePayment: '🔒 Sichere Zahlung',
    unlimitedChat: '💬 Unbegrenzter Chat',
    verifyPhone: 'Verifizieren Sie Ihre Telefonnummer',
    enterPhone: 'Telefonnummer eingeben',
    sendCode: 'Code senden',
    verifyCode: 'Code verifizieren',
    completeRegistration: 'Registrierung abschließen',
    quizQuestion1: 'Interessieren Sie sich für eine langfristige Beziehung?',
    quizQuestion2: 'Sind gemeinsame Interessen für Sie wichtig?',
    quizQuestion3: 'Ist physische Anwesenheit für Sie wichtig?',
    yes: 'Ja',
    no: 'Nein',
    maybe: 'Vielleicht',
    continue: 'Weiter',
    skip: 'Überspringen',
    close: 'Schließen',
    online: 'Online',
    onlineNow: 'Gerade online',
    verified: 'Verifiziert',
    distance: 'Entfernung',
    km: 'km',
    years: 'Jahre',
    interests: 'Interessen',
    chooseInterests: 'Wählen Sie Ihre Interessen',
    save: 'Speichern',
    settings: 'Einstellungen',
    language: 'Sprache',
    currency: 'Währung',
    english: 'Englisch',
    czech: 'Tschechisch',
    spanish: 'Spanisch',
    german: 'Deutsch',
    french: 'Französisch',
    czk: 'Kč',
    eur: '€',
    usd: '$',
    gbp: '£',
    jpy: '¥',
    changeLanguage: 'Sprache ändern',
    isTyping: 'schreibt...',
    paymentTitle: 'Kauf abschließen',
    paymentDesc: 'Bestätige deinen Geschenkkauf',
    purchase: 'Kaufen für',
    cancel: 'Abbrechen',
    freeMessagesLeft: 'freie Nachrichten übrig',
    giftsAreOneTime: 'Geschenke sind einmalig, Chat bleibt für immer!',
    forUser: 'Für',
    away: 'entfernt',
    findPerfectMatch: 'Finde deinen perfekten Partner!',
    answerQuickQuestions: 'Beantworte 3 kurze Fragen',
    idealEvening: 'Was ist dein idealer Abend?',
    whatAttractsYou: 'Was zieht dich am meisten an?',
    yourLifestyle: 'Dein Lebensstil?',
    glassOfWine: 'Weinglas',
    movie: 'Film',
    travel: 'Reisen',
    mountains: 'Berge',
    humor: 'Humor',
    intelligence: 'Intelligenz',
    fitness: 'Fitness',
    creativity: 'Kreativität',
    active: 'Aktiv',
    calm: 'Ruhig',
    social: 'Sozial',
    balanced: 'Gleichgewichtet',
    // Post Purchase Registration
    greatSaveProgress: 'Großartig! Speichern Sie Ihren Fortschritt.',
    completeQuickRegistration: 'Vervollständigen Sie die schnelle Registrierung, um Ihre Unterhaltungen und Geschenke zu speichern. Es dauert 10 Sekunden.',
    phoneNumber: 'Telefonnummer',
    phonePlaceholder: '+49 123 456 7890',
    sendVerificationCode: 'Verifizierungscode senden (OTP)',
    verifyYourNumber: 'Verifizieren Sie Ihre Nummer',
    enter6DigitCode: 'Geben Sie den 6-stelligen Code ein',
    otpPlaceholder: '123456',
    completeRegistration: 'Registrierung abschließen',
    sending: 'Senden...',
    completing: 'Vervollständigend...',
    giftSent: 'Geschenk gesendet!',
    infoSecurelyStored: 'Ihre Informationen sind sicher gespeichert und geschützt',
    validPhoneError: 'Bitte geben Sie eine gültige Telefonnummer ein',
    whyRegister: 'Warum registrieren?',
    keepConversations: 'Behalten Sie alle Ihre Unterhaltungen',
    retainGifts: 'Behalten Sie die Geschenke, die Sie gesendet haben',
    accessFromAnywhere: 'Greifen Sie von überall aus auf Ihr Profil zu',
    // Registration Modal
  registerToContinue: 'Bitte registrieren Sie sich, um die Unterhaltung fortzusetzen',
  sendCode: 'Code senden',
  enterCodeSent: 'Geben Sie den 6-stelligen Code ein, den wir an gesendet haben',
  verify: 'Verifizieren',
  resend: 'Erneut senden',
  verifying: 'Verifizieren...',
  
  // Quiz Modal
  question: 'Frage',
  chooseAnswerThatBestDescribesYou: 'Wählen Sie die Antwort, die Sie am besten beschreibt',
  skipQuiz: 'Quiz überspringen'
  },
  fr: {
    welcome: 'Bienvenue',
    getStarted: 'Commencer',
    swipe: 'Balayer',
    swipeRightToLike: 'Glissez vers la droite pour aimer, vers la gauche pour passer',
    matches: 'Correspondances',
    profile: 'Profil',
    typing: 'Tapez un message...',
    send: 'Envoyer',
    impressTitle: 'Faites bonne impression !',
    impressSubtitle: 'Envoyez des cadeaux pour que vos conversations durent plus longtemps et obtenez un chat illimité.',
    recommended: 'Recommandé',
    justPrice: 'seulement',
    mostPopular: 'Le plus populaire',
    securePayment: '🔒 Paiement sécurisé',
    unlimitedChat: '💬 Chat illimité',
    verifyPhone: 'Vérifiez votre numéro de téléphone',
    enterPhone: 'Entrez le numéro de téléphone',
    sendCode: 'Envoyer code',
    verifyCode: 'Vérifier code',
    completeRegistration: 'Terminer l\'inscription',
    quizQuestion1: 'Êtes-vous intéressé par une relation à long terme ?',
    quizQuestion2: 'Les intérêts partagés sont-ils importants pour vous ?',
    quizQuestion3: 'La présence physique est-elle importante pour vous ?',
    yes: 'Oui',
    no: 'Non',
    maybe: 'Peut-être',
    continue: 'Continuer',
    skip: 'Passer',
    close: 'Fermer',
    online: 'En ligne',
    onlineNow: 'En ligne maintenant',
    verified: 'Vérifié',
    distance: 'Distance',
    km: 'km',
    years: 'ans',
    interests: 'Intérêts',
    chooseInterests: 'Choisissez vos intérêts',
    save: 'Sauvegarder',
    settings: 'Paramètres',
    language: 'Langue',
    currency: 'Devise',
    english: 'Anglais',
    czech: 'Tchèque',
    spanish: 'Espagnol',
    german: 'Allemand',
    french: 'Français',
    czk: 'Kč',
    eur: '€',
    usd: '$',
    gbp: '£',
    jpy: '¥',
    changeLanguage: 'Changer de langue',
    isTyping: 'est en train d\'écrire...',
    paymentTitle: 'Terminer l\'achat',
    paymentDesc: 'Confirmez votre achat de cadeau',
    purchase: 'Acheter pour',
    cancel: 'Annuler',
    freeMessagesLeft: 'messages gratuits restants',
    giftsAreOneTime: 'Les cadeaux sont uniques, le chat reste à vie !',
    forUser: 'Pour',
    away: 'loin',
    findPerfectMatch: 'Trouvez votre âme sœur !',
    answerQuickQuestions: 'Répondez à 3 questions rapides',
    idealEvening: 'Quelle est votre soirée idéale ?',
    whatAttractsYou: 'Qu\'est-ce qui vous attire le plus ?',
    yourLifestyle: 'Votre mode de vie ?',
    glassOfWine: 'Verre de vin',
    movie: 'Film',
    travel: 'Voyager',
    mountains: 'Montagnes',
    humor: 'Humour',
    intelligence: 'Intelligence',
    fitness: 'Fitness',
    creativity: 'Créativité',
    active: 'Actif',
    calm: 'Calme',
    social: 'Social',
    balanced: 'Equilibré',
    // Post Purchase Registration
    greatSaveProgress: 'Génial ! Sauvegardez votre progression.',
    completeQuickRegistration: 'Complétez l\'inscription rapide pour sauvegarder vos conversations et cadeaux. Cela prend 10 secondes.',
    phoneNumber: 'Numéro de téléphone',
    phonePlaceholder: '+33 12 34 56 78 90',
    sendVerificationCode: 'Envoyer code de vérification (OTP)',
    verifyYourNumber: 'Vérifiez votre numéro',
    enter6DigitCode: 'Entrez le code à 6 chiffres',
    otpPlaceholder: '123456',
    completeRegistration: 'Terminer l\'inscription',
    sending: 'Envoi en cours...',
    completing: 'Finalisation en cours...',
    giftSent: 'Cadeau envoyé !',
    infoSecurelyStored: 'Vos informations sont stockées et protégées en toute sécurité',
    validPhoneError: 'Veuillez entrer un numéro de téléphone valide',
    whyRegister: 'Pourquoi s\'inscrire ?',
    keepConversations: 'Conservez toutes vos conversations',
    retainGifts: 'Conservez les cadeaux que vous avez envoyés',
    accessFromAnywhere: 'Accédez à votre profil de n\'importe où',
    // Registration Modal
  registerToContinue: 'Veuillez vous inscrire pour continuer la conversation',
  sendCode: 'Envoyer le code',
  enterCodeSent: 'Entrez le code à 6 chiffres que nous avons envoyé à',
  verify: 'Vérifier',
  resend: 'Renvoyer',
  verifying: 'Vérification en cours...',
  
  // Quiz Modal
  question: 'Question',
  chooseAnswerThatBestDescribesYou: 'Choisissez la réponse qui vous décrit le mieux',
  skipQuiz: 'Passer le quiz'
  }
};

export default translations;