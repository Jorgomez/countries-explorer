import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { languageManager } from '../src/localization';

export default function RootLayout() {
  useEffect(() => {
    // Initialize language on app start
    languageManager.initialize();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Countries Explorer' }} />
      <Stack.Screen name="country/[id]" options={{ title: 'Country Details' }} />
    </Stack>
  );
}
