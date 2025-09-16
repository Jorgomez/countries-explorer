import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguageStore } from '../../stores/languageStore';
import { useLanguage } from '../../hooks/useLanguage';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  const getLanguageDisplay = () => {
    
    return currentLanguage === 'en' ? 'ES' : 'EN';
  };

  const getAccessibilityLabel = () => {
    return currentLanguage === 'en' 
      ? t('language.changeToSpanish')
      : t('language.changeToEnglish');
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleLanguage}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityRole="button"
      accessibilityHint={t('language.changeLanguageHint')}
    >
      <Text style={styles.buttonText}>
        {getLanguageDisplay()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});
