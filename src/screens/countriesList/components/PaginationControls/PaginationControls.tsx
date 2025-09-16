import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../../../hooks/useLanguage';
import { styles } from './PaginationControlsStyles';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PaginationControls({ 
  currentPage, 
  totalPages, 
  hasMore, 
  onNext, 
  onPrevious 
}: PaginationControlsProps) {
  const { t } = useLanguage();

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        onPress={onPrevious}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationText}>{t('common.previous')}</Text>
      </TouchableOpacity>
      
      <Text style={styles.pageInfo}>
        {t('pagination.page', { current: currentPage, total: totalPages })}
      </Text>
      
      <TouchableOpacity
        style={[styles.paginationButton, !hasMore && styles.disabledButton]}
        onPress={onNext}
        disabled={!hasMore}
      >
        <Text style={styles.paginationText}>{t('common.next')}</Text>
      </TouchableOpacity>
    </View>
  );
}
