import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { styles } from './CountryCardStyles';
import type { CountryCard } from '../../../../types/country';

interface CountryCardProps {
  country: CountryCard;
  onPress: (country: CountryCard) => void;
}

export default function CountryCardComponent({ country, onPress }: CountryCardProps) {
  return (
    <TouchableOpacity
      style={styles.countryCard}
      onPress={() => onPress(country)}
      activeOpacity={0.7}
    >
      <View style={styles.countryHeader}>
        <Image source={{ uri: country.flag }} style={styles.flag} />
        <Text style={styles.countryName}>{country.name}</Text>
      </View>
      <Text style={styles.countryInfo}>
        {country.capital} • {country.region} • {country.population.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
}