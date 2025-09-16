import React from 'react';
import { View, Text, Image } from 'react-native';
import type { CountryDetail } from '../../../types/country';
import { useLanguage } from '../../../hooks/useLanguage';

interface CountryHeaderProps {
  country: CountryDetail;
  styles: any;
}

export default function CountryHeader({ country, styles }: CountryHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <View style={styles.header}>
      <Image 
        source={{ uri: country.flag }} 
        style={styles.flag}
        accessibilityRole="image"
        accessibilityLabel={t('accessibility.flagOf', { country: country.name })}
      />
      <Text 
        style={styles.countryName}
        accessibilityRole="header"
      >
        {country.name}
      </Text>
      <Text 
        style={styles.officialName}
        accessibilityRole="text"
      >
        {country.officialName}
      </Text>
    </View>
  );
}
