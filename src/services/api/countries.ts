import axios from 'axios';
import type { Country, CountryCard, CountryDetail } from '../../types/country';
import { API_ENDPOINTS, API_FIELDS } from '../../utils/constants';

// Transform Country to CountryCard for UI
const transformCountry = (country: Country): CountryCard => ({
  id: country.cca3,
  name: country.name.common,
  flag: country.flags.png,
  capital: country.capital?.[0] || '—',
  population: country.population,
  region: country.region,
});

// Transform Country to CountryDetail for detail screen
const transformCountryDetail = (country: Country): CountryDetail => {
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

export const countriesApi = {
  async getAllCountries(fields?: string): Promise<CountryCard[]> {
    try {
      const fieldsParam = fields || API_FIELDS.BASIC;
      const response = await axios.get<Country[]>(
        `${API_ENDPOINTS.ALL}?fields=${fieldsParam}`
      );
      
      return response.data.map(transformCountry);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error fetching countries: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  },

  async searchCountriesByName(query: string, fields?: string): Promise<CountryCard[]> {
    try {
      const fieldsParam = fields || API_FIELDS.BASIC;
      const response = await axios.get<Country[]>(
        `${API_ENDPOINTS.BY_NAME(query)}?fields=${fieldsParam}`
      );
      
      return response.data.map(transformCountry);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return []; // No results found
        }
        throw new Error(`Error searching countries: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  },

  async getCountryDetailByCode(code: string): Promise<CountryDetail> {
    try {
      const url = `${API_ENDPOINTS.BY_CODE(code)}?fields=${API_FIELDS.DETAILED}`;
      
      const response = await axios.get<Country[] | Country>(url);
      
      if (!response.data) {
        throw new Error(`Country with code ${code} not found`);
      }
      
      // Handle both array and single object responses
      const countryData = Array.isArray(response.data) ? response.data[0] : response.data;
      
      if (!countryData) {
        throw new Error(`No country data found for code ${code}`);
      }
      
      const result = transformCountryDetail(countryData);
      return result;
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        
        if (error.response?.status === 404) {
          throw new Error(`Country with code ${code} not found`);
        }
        throw new Error(`Error fetching country details: ${error.message}`);
      }
      
      throw new Error(`Error processing country data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
