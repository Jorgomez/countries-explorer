import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { STORAGE_KEYS, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../utils/constants';
import type { SupportedLanguage } from '../utils/constants';

import en from '../localization/en.json';
import es from '../localization/es.json';

const i18n = new I18n({
  en,
  es,
});

i18n.enableFallback = true;
i18n.defaultLocale = DEFAULT_LANGUAGE;

interface LanguageState {
  currentLanguage: SupportedLanguage;
  isInitialized: boolean;
  initializeLanguage: () => Promise<void>;
  setLanguage: (language: SupportedLanguage) => void;
  translate: (key: string, options?: object) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: DEFAULT_LANGUAGE,
  isInitialized: false,

  initializeLanguage: async () => {
    try {
      let language: SupportedLanguage = DEFAULT_LANGUAGE;

      // Try to get saved language from storage
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      
      if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as SupportedLanguage)) {
        language = savedLanguage as SupportedLanguage;
      } else {
        // Detect device language
        const deviceLanguage = Localization.getLocales()[0]?.languageCode || DEFAULT_LANGUAGE;
        language = SUPPORTED_LANGUAGES.includes(deviceLanguage as SupportedLanguage) 
          ? (deviceLanguage as SupportedLanguage) 
          : DEFAULT_LANGUAGE;
        
        // Save detected language
        await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
      }
      
      // Update i18n and state
      i18n.locale = language;
      set({ 
        currentLanguage: language, 
        isInitialized: true 
      });

    } catch (error) {
      console.warn('Failed to initialize language:', error);
      i18n.locale = DEFAULT_LANGUAGE;
      set({ 
        currentLanguage: DEFAULT_LANGUAGE, 
        isInitialized: true 
      });
    }
  },

  setLanguage: (language: SupportedLanguage) => {
    // Update i18n immediately
    i18n.locale = language;
    
    // Update state immediately
    set({ currentLanguage: language });
    
    // Save to storage in background
    AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language).catch(error => {
      console.error('Failed to save language:', error);
    });
  },

  translate: (key: string, options?: object) => {
    return i18n.t(key, options);
  },
}));


export const t = (key: string, options?: object) => {
  return useLanguageStore.getState().translate(key, options);
};
