import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');

  const toggleLanguage = () => {
    const newLang = language === 'english' ? 'urdu' : 'english';
    console.log('Toggling language from', language, 'to', newLang);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    console.log('Language saved to localStorage:', newLang);
  };

  const t = (englishText, urduText) => {
    return language === 'urdu' ? urduText : englishText;
  };

  console.log('LanguageProvider current language:', language);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
