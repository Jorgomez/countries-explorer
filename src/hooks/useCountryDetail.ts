import { useState, useEffect, useCallback } from 'react';
import { countriesApi } from '../services/api/countries';
import type { CountryDetail } from '../types/country';

interface UseCountryDetailState {
  country: CountryDetail | null;
  isLoading: boolean;
  error: string | null;
}

interface UseCountryDetailActions {
  refetch: () => void;
}

export function useCountryDetail(countryId: string | undefined): UseCountryDetailState & UseCountryDetailActions {
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountryDetail = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await countriesApi.getCountryDetailByCode(id);
      setCountry(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading country details');
      setCountry(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    if (countryId) {
      fetchCountryDetail(countryId);
    }
  }, [fetchCountryDetail, countryId]);

  useEffect(() => {
    if (!countryId || countryId === 'undefined' || countryId.trim() === '') {
      setCountry(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    fetchCountryDetail(countryId);
  }, [countryId, fetchCountryDetail]);

  return {
    country,
    isLoading,
    error,
    refetch,
  };
}
