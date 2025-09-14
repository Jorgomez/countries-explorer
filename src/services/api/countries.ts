import axios from 'axios';
import type { Country, CountryCard } from '../../types/country';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Transform Country to CountryCard for UI
const transformCountry = (country: Country): CountryCard => ({
  id: country.cca3,
  name: country.name.common,
  flag: country.flags.png,
  capital: country.capital?.[0] || '—',
  population: country.population,
  region: country.region,
});

export const countriesApi = {
  async getAllCountries(fields?: string): Promise<CountryCard[]> {
    try {
      const fieldsParam = fields || 'name,flags,capital,population,region,cca3';
      const response = await axios.get<Country[]>(
        `${API_BASE_URL}/all?fields=${fieldsParam}`
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
      const fieldsParam = fields || 'name,flags,capital,population,region,cca3';
      const response = await axios.get<Country[]>(
        `${API_BASE_URL}/name/${encodeURIComponent(query)}?fields=${fieldsParam}`
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

  async getCountryByCode(code: string, fields?: string): Promise<CountryCard> {
    try {
      const fieldsParam = fields || 'name,flags,capital,population,region,cca3';
      const response = await axios.get<Country[]>(
        `${API_BASE_URL}/alpha/${code}?fields=${fieldsParam}`
      );
      
      if (!response.data || response.data.length === 0) {
        throw new Error(`Country with code ${code} not found`);
      }
      
      return transformCountry(response.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Country with code ${code} not found`);
        }
        throw new Error(`Error fetching country: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  },
};
