import type { Country, CountryCard, CountryDetail } from '../types/country';

/**
 * Transform Country API response to CountryCard for list views
 */
export const transformToCountryCard = (country: Country): CountryCard => ({
  id: country.cca3,
  name: country.name.common,
  flag: country.flags.png,
  capital: country.capital?.[0] || '—',
  population: country.population,
  region: country.region,
});

/**
 * Transform Country API response to CountryDetail for detail views
 */
export const transformToCountryDetail = (country: Country): CountryDetail => {
  try {
    if (!country) {
      throw new Error('Country data is null or undefined');
    }
    
    if (!country.cca3) {
      throw new Error('Country is missing cca3 code');
    }
    
    if (!country.name?.common) {
      throw new Error('Country is missing name');
    }
    
    const result: CountryDetail = {
      id: country.cca3,
      name: country.name.common,
      officialName: country.name.official || country.name.common,
      flag: country.flags?.png || country.flags?.svg || '',
      flagSvg: country.flags?.svg || '',
      capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || 'N/A',
      population: country.population || 0,
      region: country.region || 'Unknown',
      subregion: country.subregion || 'Unknown',
      area: country.area || 0,
      languages: country.languages ? Object.values(country.languages) : [],
      currencies: country.currencies ? Object.values(country.currencies).map(c => c.name) : [],
      timezones: country.timezones || [],
      borders: country.borders || [],
      topLevelDomains: country.tld || [],
      continents: country.continents || [],
    };
    
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Transform multiple countries to CountryCard array
 */
export const transformToCountryCards = (countries: Country[]): CountryCard[] => {
  return countries.map(transformToCountryCard);
};
