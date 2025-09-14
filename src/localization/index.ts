import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../utils/constants';
import type { SupportedLanguage } from '../utils/constants';

// Import translations
import en from './en.json';
import es from './es.json';

// Initialize i18n
const i18n = new I18n({
  en,
  es,
});

// Configure i18n
i18n.enableFallback = true;
i18n.defaultLocale = DEFAULT_LANGUAGE;

class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: SupportedLanguage = DEFAULT_LANGUAGE;
  private listeners: Set<(language: SupportedLanguage) => void> = new Set();

  static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  async initialize(): Promise<SupportedLanguage> {
    try {
      // Try to get saved language from storage
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      
      if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as SupportedLanguage)) {
        this.currentLanguage = savedLanguage as SupportedLanguage;
      } else {
        // Detect device language
        const deviceLanguage = Localization.locale.split('-')[0];
        this.currentLanguage = SUPPORTED_LANGUAGES.includes(deviceLanguage as SupportedLanguage) 
          ? (deviceLanguage as SupportedLanguage) 
          : DEFAULT_LANGUAGE;
        
        // Save detected language
        await this.setLanguage(this.currentLanguage);
      }
      
      i18n.locale = this.currentLanguage;
      return this.currentLanguage;
    } catch (error) {
      console.warn('Failed to initialize language:', error);
      i18n.locale = DEFAULT_LANGUAGE;
      return DEFAULT_LANGUAGE;
    }
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    try {
      this.currentLanguage = language;
      i18n.locale = language;
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
      
      // Notify listeners
      this.listeners.forEach(listener => listener(language));
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  }

  getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  translate(key: string, options?: object): string {
    return i18n.t(key, options);
  }

  addLanguageChangeListener(listener: (language: SupportedLanguage) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const languageManager = LanguageManager.getInstance();
export const t = (key: string, options?: object) => languageManager.translate(key, options);
export default i18n;
