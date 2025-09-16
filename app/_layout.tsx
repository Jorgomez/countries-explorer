import { Stack } from 'expo-router';
import { useLanguage } from '../src/hooks/useLanguage';

export default function RootLayout() {
  const { isInitialized } = useLanguage();

  if (!isInitialized) {
    return null; 
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="country/[id]" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
