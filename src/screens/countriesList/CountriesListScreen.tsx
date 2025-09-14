import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useCountries } from '../../hooks/useCountries';
import { t } from '../../localization';
import { styles } from './CountriesListStyles';
import type { CountryCard } from '../../types/country';

export default function CountriesListScreen() {
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
  } = useCountries();

  const renderCountry = ({ item }: { item: CountryCard }) => (
    <View style={styles.countryCard}>
      <Text style={styles.countryName}>{item.name}</Text>
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
