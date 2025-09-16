import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { styles } from './CountryCardStyles';
import type { CountryCard } from '../../../../types/country';
import { useLanguage } from '../../../../hooks/useLanguage';

interface CountryCardProps {
  country: CountryCard;
  onPress: (country: CountryCard) => void;
}

export default function CountryCardComponent({ country, onPress }: CountryCardProps) {
  const { t } = useLanguage();
  
  return (
    <TouchableOpacity
      style={styles.countryCard}
      onPress={() => onPress(country)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={t('accessibility.viewDetails', { country: country.name })}
      accessibilityHint={t('accessibility.viewDetailsHint')}
    >
      <View style={styles.countryHeader}>
        <Image 
          source={{ uri: country.flag }} 
          style={styles.flag}
          accessibilityRole="image"
          accessibilityLabel={t('accessibility.flagOf', { country: country.name })}
        />
        <Text style={styles.countryName}>{country.name}</Text>
      </View>
      <Text style={styles.countryInfo}>
        {country.capital} • {country.region} • {country.population.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
}