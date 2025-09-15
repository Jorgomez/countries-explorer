import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  listContainer: {
    paddingBottom: spacing.md,
  },
});