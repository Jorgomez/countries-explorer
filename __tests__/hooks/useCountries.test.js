// Test para useCountries hook usando Jest y Testing Library (cumple requisitos)
import { renderHook, waitFor } from '@testing-library/react-native';
import { useCountries } from '../../src/hooks/useCountries';


jest.mock('../../src/services/api/countries', () => ({
  countriesApi: {
    getAllCountries: jest.fn(),
    searchCountriesByName: jest.fn(),
  },
}));

describe('useCountries Hook', () => {
  const mockCountries = [
    {
      id: 'ESP',
      name: 'Spain',
      flag: 'https://flagcdn.com/w320/es.png',
      capital: 'Madrid',
      population: 47351567,
      region: 'Europe',
    },
    {
      id: 'FRA',
      name: 'France',
      flag: 'https://flagcdn.com/w320/fr.png',
      capital: 'Paris',
      population: 67391582,
      region: 'Europe',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { countriesApi } = require('../../src/services/api/countries');
    countriesApi.getAllCountries.mockResolvedValue(mockCountries);
    
    const { result } = renderHook(() => useCountries());

    expect(result.current.allCountries).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.currentPage).toBe(1);
  });

  it('should fetch countries successfully', async () => {
    const { countriesApi } = require('../../src/services/api/countries');
    countriesApi.getAllCountries.mockResolvedValue(mockCountries);
    
    const { result } = renderHook(() => useCountries());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.allCountries).toEqual(mockCountries);
    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.error).toBe(null);
  });
});
