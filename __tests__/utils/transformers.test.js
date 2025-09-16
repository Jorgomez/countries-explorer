// Test for transformers using Jest and Testing Library 
import { transformToCountryCard, transformToCountryDetail } from '../../src/utils/transformers';

describe('Transformers', () => {
  const mockCountry = {
    cca3: 'ESP',
    name: {
      common: 'Spain',
      official: 'Kingdom of Spain',
    },
    flags: {
      png: 'https://flagcdn.com/w320/es.png',
      svg: 'https://flagcdn.com/es.svg',
    },
    capital: ['Madrid'],
    population: 47351567,
    region: 'Europe',
    subregion: 'Southern Europe',
    area: 505992,
    languages: {
      spa: 'Spanish',
    },
    currencies: {
      EUR: {
        name: 'Euro',
        symbol: '€',
      },
    },
    timezones: ['UTC+01:00'],
    borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
    tld: ['.es'],
    continents: ['Europe'],
  };

  it('should transform Country to CountryCard correctly', () => {
    const result = transformToCountryCard(mockCountry);

    expect(result).toEqual({
      id: 'ESP',
      name: 'Spain',
      flag: 'https://flagcdn.com/w320/es.png',
      capital: 'Madrid',
      population: 47351567,
      region: 'Europe',
    });
  });

  it('should handle missing capital gracefully', () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined };
    const result = transformToCountryCard(countryWithoutCapital);

    expect(result.capital).toBe('—');
  });

  it('should transform Country to CountryDetail correctly', () => {
    const result = transformToCountryDetail(mockCountry);

    expect(result.id).toBe('ESP');
    expect(result.name).toBe('Spain');
    expect(result.officialName).toBe('Kingdom of Spain');
    expect(result.capital).toBe('Madrid');
    expect(result.population).toBe(47351567);
    expect(result.region).toBe('Europe');
    expect(result.languages).toEqual(['Spanish']);
    expect(result.currencies).toEqual(['Euro']);
  });
});
