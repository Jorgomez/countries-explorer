import { useLocalSearchParams } from 'expo-router';
import CountryDetailScreen from '../../src/screens/countryDetail/CountryDetailScreen';

export default function CountryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const countryId = Array.isArray(id) ? id[0] : id;
  return <CountryDetailScreen countryId={countryId} />;
}
