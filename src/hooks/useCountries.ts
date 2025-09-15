import { useState, useEffect, useCallback } from 'react';
import { countriesApi } from '../services/api/countries';
import type { CountryCard } from '../types/country';

interface UseCountriesState {
  allCountries: CountryCard[];
  countries: CountryCard[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isEmpty: boolean;
}

interface UseCountriesActions {
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  refetch: () => void;
}

const PAGE_SIZE = 20;

export function useCountries(query?: string): UseCountriesState & UseCountriesActions {
  const [allCountries, setAllCountries] = useState<CountryCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate pagination
  const totalPages = Math.ceil(allCountries.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const countries = allCountries.slice(startIndex, endIndex);
  const hasMore = currentPage < totalPages;
  const isEmpty = !isLoading && allCountries.length === 0;

  const fetchCountries = useCallback(async (searchQuery?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let data: CountryCard[];
      
      if (searchQuery && searchQuery.trim().length >= 2) {
        data = await countriesApi.searchCountriesByName(searchQuery.trim());
      } else {
        data = await countriesApi.getAllCountries();
      }
      
      setAllCountries(data);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading countries');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const refetch = useCallback(() => {
    fetchCountries(query);
  }, [fetchCountries, query]);

  useEffect(() => {
    const trimmedQuery = query?.trim() || '';
    
    if (trimmedQuery.length === 1) {
      return;
    }
    
    fetchCountries(trimmedQuery);
  }, [query, fetchCountries]);

  return {
    allCountries,
    countries,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasMore,
    isEmpty,
    nextPage,
    prevPage,
    goToPage,
    refetch,
  };
}
