import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguageStore } from '../../stores/languageStore';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleLanguage}
      accessibilityLabel={`Change language to ${currentLanguage === 'en' ? 'Spanish' : 'English'}`}
    >
      <Text style={styles.buttonText}>
        {currentLanguage.toUpperCase()}
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
