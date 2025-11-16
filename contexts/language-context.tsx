'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    'hero.title': 'RaagaRangam',
    'hero.subtitle': 'Master Carnatic Music Through Gesture Recognition',
    'hero.description': 'Experience the beauty of Indian classical music with innovative hand gesture controls and immersive gamification.',
    'hero.cta.primary': 'Start Learning',
    'hero.cta.secondary': 'Watch Demo',
    
    // Features
    'features.traditional.title': 'Traditional Mode',
    'features.traditional.description': 'Customizable finger mappings for authentic playing',
    'features.onehand.title': 'One-Hand Virtuoso',
    'features.onehand.description': 'Master all swaras with single-hand gestures',
    'features.gamaka.title': 'Gamaka Master',
    'features.gamaka.description': 'Advanced ornamentations and expressions',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.play': 'Play',
    'nav.leaderboards': 'Leaderboards',
    'nav.challenges': 'Challenges',
    'nav.profile': 'Profile',
  },
  te: {
    // Landing Page
    'hero.title': 'రాగరంగం',
    'hero.subtitle': 'హస్త సంజ్ఞల ద్వారా కర్ణాటక సంగీతాన్ని నేర్చుకోండి',
    'hero.description': 'నవీన హస్త సంజ్ఞలు మరియు ఆట రూపంలో భారతీయ శాస్త్రీయ సంగీత అందాలను అనుభవించండి.',
    'hero.cta.primary': 'నేర్చుకోవడం ప్రారంభించండి',
    'hero.cta.secondary': 'ప్రదర్శన చూడండి',

    // Features
    'features.traditional.title': 'సాంప్రదాయిక మోడ్',
    'features.traditional.description': 'వాస్తవిక వాయించడం కోసం అనుకూలీకరించదగిన వేలు మ్యాపింగ్‌లు',
    'features.onehand.title': 'ఒక చేతి నిపుణుడు',
    'features.onehand.description': 'ఒకే చేతి సంజ్ఞలతో అన్ని స్వరాలను నేర్చుకోండి',
    'features.gamaka.title': 'గమక మాస్టర్',
    'features.gamaka.description': 'అధునాతన అలంకారాలు మరియు వ్యక్తీకరణలు',

    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.play': 'ప్లే',
    'nav.leaderboards': 'లీడర్‌బోర్డ్‌లు',
    'nav.challenges': 'సవాళ్లు',
    'nav.profile': 'ప్రొఫైల్',
  },
  hi: {
    // Landing Page
    'hero.title': 'रागरंगम',
    'hero.subtitle': 'हाथ के इशारों से कर्नाटक संगीत सीखें',
    'hero.description': 'नवाचार हाथ के इशारे नियंत्रण और गेमिफिकेशन के साथ भारतीय शास्त्रीय संगीत की सुंदरता का अनुभव करें।',
    'hero.cta.primary': 'सीखना शुरू करें',
    'hero.cta.secondary': 'डेमो देखें',

    // Features
    'features.traditional.title': 'पारंपरिक मोड',
    'features.traditional.description': 'प्रामाणिक बजाने के लिए अनुकूलन योग्य उंगली मैपिंग',
    'features.onehand.title': 'एक हाथ विशारद',
    'features.onehand.description': 'एक हाथ के इशारों से सभी स्वर सीखें',
    'features.gamaka.title': 'गमक मास्टर',
    'features.gamaka.description': 'उन्नत अलंकरण और अभिव्यक्तियाँ',

    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.play': 'खेलें',
    'nav.leaderboards': 'लीडरबोर्ड',
    'nav.challenges': 'चुनौतियाँ',
    'nav.profile': 'प्रोफ़ाइल',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}