import { View, Text, FlatList } from 'react-native';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useCountries } from '../../hooks/useCountries';
import { useLanguage } from '../../hooks/useLanguage';
import { styles } from './CountriesListStyles';
import type { CountryCard } from '../../types/country';
import StateDisplay from '../../components/StateDisplay/StateDisplay';
import AppHeader from '../../components/AppHeader/AppHeader';
import { SearchInput } from './components/SearchInput/SearchInput';
import PaginationControls from './components/PaginationControls/PaginationControls';
import CountryCardComponent from './components/CountryCard/CountryCard';


export default function CountriesListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { t } = useLanguage();
  const isNavigatingRef = useRef(false);
  
  const {
    countries,
    isLoading,
    error,
    isEmpty,
    currentPage,
    totalPages,
    hasMore,
    nextPage,
    prevPage,
    refetch,
  } = useCountries(searchQuery);

  const handleCountryPress = useCallback((country: CountryCard) => {
    // Prevent double navigation with debounce
    if (isNavigatingRef.current) {
      return;
    }
    
    isNavigatingRef.current = true;
    router.push(`/country/${country.id}`);
    
    // Reset flag after navigation
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  }, [router]);

  const renderCountry = ({ item }: { item: CountryCard }) => (
    <CountryCardComponent country={item} onPress={handleCountryPress} />
  );

  return (
    <View style={styles.container}>
      <AppHeader 
        title={t('countries.title')} 
        showBackButton={false}
        showLanguageSelector={true}
      />
      
      <SearchInput
        placeholder={t('countries.searchPlaceholder')}
        onSearch={setSearchQuery}
      />
      
      {error ? (
        <StateDisplay type="error" message={error} onRetry={refetch} />
      ) : isLoading ? (
        <StateDisplay type="loading" />
      ) : isEmpty ? (
        <StateDisplay type="empty" />
      ) : (
        <>
          <FlatList
            data={countries}
            renderItem={renderCountry}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
          
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasMore={hasMore}
            onNext={nextPage}
            onPrevious={prevPage}
          />
        </>
      )}
    </View>
  );
}
