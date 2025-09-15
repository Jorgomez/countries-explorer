
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
  cca3: string; 
  name: CountryName;
  flags: CountryFlag;
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, {
    name: string;
    symbol: string;
  }>;
  timezones?: string[];
  borders?: string[];
  tld?: string[];
  continents?: string[];
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

// Detailed country for detail screen
export interface CountryDetail {
  id: string; // cca3
  name: string; // name.common
  officialName: string; // name.official
  flag: string; // flags.png
  flagSvg: string; // flags.svg
  capital: string; // capital[0] or "—"
  population: number;
  region: string;
  subregion: string;
  area: number;
  languages: string[]; // Object.values(languages)
  currencies: string[]; // Object.values(currencies).map(c => `${c.name} (${c.symbol})`)
  timezones: string[];
  borders: string[];
  topLevelDomains: string[];
  continents: string[];
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
