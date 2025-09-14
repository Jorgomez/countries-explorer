import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState, useCallback } from 'react';
import { useCountries } from '../../hooks/useCountries';
import { useDebounce } from '../../hooks/useDebounce';
import { t } from '../../localization';
import { styles } from './CountriesListStyles';
import { colors, spacing, typography } from '../../styles';
import type { CountryCard } from '../../types/country';

export default function CountriesListScreen() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);
  
  console.log('📱 CountriesListScreen: searchText:', `"${searchText}"`, 'debounced:', `"${debouncedSearch}"`);
  
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
  } = useCountries(debouncedSearch);

  const renderCountry = ({ item }: { item: CountryCard }) => (
    <View style={styles.countryCard}>
      <View style={styles.countryHeader}>
        <Image source={{ uri: item.flag }} style={styles.flag} />
        <Text style={styles.countryName}>{item.name}</Text>
      </View>
      <Text style={styles.countryInfo}>
        {item.capital} • {item.region} • {item.population.toLocaleString()}
      </Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        onPress={prevPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationText}>{t('common.previous')}</Text>
      </TouchableOpacity>
      
      <Text style={styles.pageInfo}>
        {t('pagination.page', { current: currentPage, total: totalPages })}
      </Text>
      
      <TouchableOpacity
        style={[styles.paginationButton, !hasMore && styles.disabledButton]}
        onPress={nextPage}
        disabled={!hasMore}
      >
        <Text style={styles.paginationText}>{t('common.next')}</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{t('common.noResults')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('countries.title')}</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('countries.searchPlaceholder')}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
      
      <FlatList
        data={countries}
        renderItem={renderCountry}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      
      {renderPagination()}
    </View>
  );
}
