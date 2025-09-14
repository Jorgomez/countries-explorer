// API Configuration
export const API_BASE_URL = 'https://restcountries.com/v3.1';

export const API_ENDPOINTS = {
  ALL: `${API_BASE_URL}/all`,
  BY_NAME: (name: string) => `${API_BASE_URL}/name/${encodeURIComponent(name)}`,
  BY_CODE: (code: string) => `${API_BASE_URL}/alpha/${code}`,
} as const;

// API fields to reduce payload size
export const API_FIELDS = 'name,flags,capital,population,region,cca3';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

// Debounce timing
export const SEARCH_DEBOUNCE_MS = 500;

// Cache configuration
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const CACHE_KEYS = {
  ALL_COUNTRIES: 'all_countries',
  SEARCH: (query: string) => `search_${query.toLowerCase()}`,
  COUNTRY: (code: string) => `country_${code}`,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
  LAST_SEARCH: 'last_search_query',
} as const;

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Default values
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
