import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '../../../hooks/useLanguage';
import type { CountryDetail } from '../../../types/country';

interface CountryFooterProps {
  country: CountryDetail;
  styles: any;
}

export default function CountryFooter({ country, styles }: CountryFooterProps) {
  const { t } = useLanguage();
  const renderList = (items: string[], emptyMessage: string) => {
    if (!items || items.length === 0) {
      return <Text style={styles.noDataText}>{emptyMessage}</Text>;
    }

    return (
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.languages')}</Text>
        {renderList(country.languages, t('countries.noData'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.currencies')}</Text>
        {renderList(country.currencies, t('countries.noData'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.timezones')}</Text>
        {renderList(country.timezones, t('countries.noData'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.borders')}</Text>
        {renderList(country.borders, t('countries.noData'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.domains')}</Text>
        {renderList(country.topLevelDomains, t('countries.noData'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('countries.continents')}</Text>
        {renderList(country.continents, t('countries.noData'))}
      </View>
    </>
  );
}
