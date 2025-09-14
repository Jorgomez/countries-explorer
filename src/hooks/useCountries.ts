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
    console.log('🌐 fetchCountries: Starting fetch with searchQuery:', `"${searchQuery}"`);
    setIsLoading(true);
    setError(null);
    
    try {
      let data: CountryCard[];
      
      if (searchQuery && searchQuery.trim().length >= 2) {
        console.log('🔎 fetchCountries: Calling SEARCH API with:', `"${searchQuery.trim()}"`);
        data = await countriesApi.searchCountriesByName(searchQuery.trim());
        console.log('✅ fetchCountries: SEARCH API returned', data.length, 'countries');
      } else {
        console.log('📋 fetchCountries: Calling ALL API (empty or short query)');
        data = await countriesApi.getAllCountries();
        console.log('✅ fetchCountries: ALL API returned', data.length, 'countries');
      }
      
      setAllCountries(data);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.log('❌ fetchCountries: Error occurred:', err);
      setError(err instanceof Error ? err.message : 'Error loading countries');
    } finally {
      setIsLoading(false);
      console.log('🏁 fetchCountries: Finished');
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

  // Only fetch when query changes meaningfully
  useEffect(() => {
    const trimmedQuery = query?.trim() || '';
    console.log('🎣 useCountries: useEffect triggered with query:', `"${query}"`, 'trimmed:', `"${trimmedQuery}"`);
    
    // Don't fetch if query has 1 character (wait for 2+ or empty)
    if (trimmedQuery.length === 1) {
      console.log('⏸️ useCountries: Skipping fetch - query has only 1 character');
      return;
    }
    
    console.log('🚀 useCountries: About to fetch with trimmed query:', `"${trimmedQuery}"`);
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
