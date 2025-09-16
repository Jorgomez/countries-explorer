import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '../../../hooks/useLanguage';
import type { CountryDetail } from '../../../types/country';

interface CountryHeroProps {
  country: CountryDetail;
  styles: any;
}

export default function CountryHero({ country, styles }: CountryHeroProps) {
  const { t } = useLanguage();
  const renderInfoRow = (label: string, value: string | number | undefined) => {
    const displayValue = value !== undefined && value !== null && value !== '' 
      ? value.toString() 
      : t('countries.noData');

    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('countries.details')}</Text>
      {renderInfoRow(t('countries.capital'), country.capital)}
      {renderInfoRow(t('countries.population'), country.population.toLocaleString())}
      {renderInfoRow(t('countries.region'), country.region)}
      {renderInfoRow(t('countries.subregion'), country.subregion)}
      {renderInfoRow(
        t('countries.area'), 
        country.area > 0 ? `${country.area.toLocaleString()} ${t('countries.km2')}` : t('countries.noData')
      )}
    </View>
  );
}
