// Types for REST Countries API v3.1
export interface CountryFlag {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, {
    official: string;
    common: string;
  }>;
}

export interface Country {
  cca3: string; // 3-letter country code (unique identifier)
  name: CountryName;
  flags: CountryFlag;
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
}

// Simplified country for UI components
export interface CountryCard {
  id: string; // cca3
  name: string; // name.common
  flag: string; // flags.png
  capital: string; // capital[0] or "—"
  population: number;
  region: string;
}

// API Response types
export interface CountriesApiResponse extends Array<Country> {}

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

// Search and pagination
export interface CountriesQuery {
  search?: string;
  page: number;
  pageSize: number;
}

export interface CountriesResult {
  countries: CountryCard[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  error?: ApiError;
}
