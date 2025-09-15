import { useLocalSearchParams } from 'expo-router';
import CountryDetailScreen from '../../src/screens/countryDetail/CountryDetailScreen';

export default function CountryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  console.log('🔗 CountryDetailPage: Received id parameter:', `"${id}"`, 'type:', typeof id);
  
  // Ensure id is a string, not an array
  const countryId = Array.isArray(id) ? id[0] : id;
  console.log('🔗 CountryDetailPage: Processed countryId:', `"${countryId}"`, 'type:', typeof countryId);
  
  return <CountryDetailScreen countryId={countryId} />;
}
