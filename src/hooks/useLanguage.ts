import { useEffect } from 'react';
import { useLanguageStore } from '../stores/languageStore';

export const useLanguage = () => {
  const { 
    currentLanguage, 
    isInitialized, 
    initializeLanguage, 
    setLanguage, 
    translate 
  } = useLanguageStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeLanguage();
    }
  }, [isInitialized, initializeLanguage]);

  return {
    currentLanguage,
    isInitialized,
    setLanguage,
    translate,
    t: translate, 
  };
};
