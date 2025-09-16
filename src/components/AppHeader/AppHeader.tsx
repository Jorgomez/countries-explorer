import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { styles } from './AppHeaderStyles';


interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  showLanguageSelector?: boolean;
}

export default function AppHeader({ 
  title, 
  showBackButton = false, 
  showLanguageSelector = true 
}: AppHeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            accessibilityLabel={t('common.back')}
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {showLanguageSelector && (
          <LanguageSelector />
        )}
      </View>
    </View>
  );
}
