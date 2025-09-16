import axios from 'axios';
import type { Country, CountryCard, CountryDetail } from '../../types/country';
import { API_ENDPOINTS, API_FIELDS } from '../../utils/constants';
import { transformToCountryCard, transformToCountryDetail } from '../../utils/transformers';

export const countriesApi = {
  async getAllCountries(fields?: string): Promise<CountryCard[]> {
    try {
      const fieldsParam = fields || API_FIELDS.BASIC;
      const response = await axios.get<Country[]>(
        `${API_ENDPOINTS.ALL}?fields=${fieldsParam}`
      );
      
      return response.data.map(transformToCountryCard);
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
      
      return response.data.map(transformToCountryCard);
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
      
      const result = transformToCountryDetail(countryData);
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
