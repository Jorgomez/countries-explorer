import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import { styles } from './StateDisplayStyles';

interface StateDisplayProps {
  type: 'loading' | 'error' | 'empty';
  message?: string;
  onRetry?: () => void;
}

export default function StateDisplay({ type, message, onRetry }: StateDisplayProps) {
  const { t } = useLanguage();

  if (type === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (type === 'error') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{message || t('common.error')}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (type === 'empty') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{message || t('common.noResults')}</Text>
      </View>
    );
  }

  return null;
}
