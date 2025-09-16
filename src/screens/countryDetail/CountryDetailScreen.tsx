import { View, ScrollView } from 'react-native';
import { useCountryDetail } from '../../hooks/useCountryDetail';
import { useLanguage } from '../../hooks/useLanguage';
import { styles } from './CountryDetailStyles';
import StateDisplay from '../../components/StateDisplay/StateDisplay';
import AppHeader from '../../components/AppHeader/AppHeader';
import CountryHeader from './components/CountryHeader';
import CountryHero from './components/CountryHero';
import CountryFooter from './components/CountryFooter';

interface CountryDetailScreenProps {
  countryId: string | undefined;
}

export default function CountryDetailScreen({ countryId }: CountryDetailScreenProps) {
  const { country, isLoading, error, refetch } = useCountryDetail(countryId);
  const { t } = useLanguage();

  if (error) {
    return (
      <View style={styles.container}>
        <AppHeader 
          title={t('countries.details')} 
          showBackButton={true}
          showLanguageSelector={true}
        />
        <StateDisplay type="error" message={error} onRetry={refetch} />
      </View>
    );
  }

  if (isLoading || !country) {
    return (
      <View style={styles.container}>
        <AppHeader 
          title={t('countries.details')} 
          showBackButton={true}
          showLanguageSelector={true}
        />
        <StateDisplay type="loading" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader 
        title={country.name} 
        showBackButton={true}
        showLanguageSelector={true}
      />
      <ScrollView style={styles.scrollContainer}>
        <CountryHeader country={country} styles={styles} />
        <CountryHero country={country} styles={styles} />
        <CountryFooter country={country} styles={styles} />
      </ScrollView>
    </View>
  );
}
