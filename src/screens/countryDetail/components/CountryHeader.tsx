import React from 'react';
import { View, Text, Image } from 'react-native';
import type { CountryDetail } from '../../../types/country';

interface CountryHeaderProps {
  country: CountryDetail;
  styles: any;
}

export default function CountryHeader({ country, styles }: CountryHeaderProps) {
  return (
    <View style={styles.header}>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <Text style={styles.countryName}>{country.name}</Text>
      <Text style={styles.officialName}>{country.officialName}</Text>
    </View>
  );
}
