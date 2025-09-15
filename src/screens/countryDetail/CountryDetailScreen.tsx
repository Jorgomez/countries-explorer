import { ScrollView } from 'react-native';
import { useCountryDetail } from '../../hooks/useCountryDetail';
import { styles } from './CountryDetailStyles';
import StateDisplay from '../../components/StateDisplay/StateDisplay';
import CountryHeader from './components/CountryHeader';
import CountryHero from './components/CountryHero';
import CountryFooter from './components/CountryFooter';

interface CountryDetailScreenProps {
  countryId: string | undefined;
}

export default function CountryDetailScreen({ countryId }: CountryDetailScreenProps) {
  const { country, isLoading, error, refetch } = useCountryDetail(countryId);

  if (error) {
    return <StateDisplay type="error" message={error} onRetry={refetch} />;
  }

  if (isLoading || !country) {
    return <StateDisplay type="loading" />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <CountryHeader country={country} styles={styles} />
      <CountryHero country={country} styles={styles} />
      <CountryFooter country={country} styles={styles} />
    </ScrollView>
  );
}
