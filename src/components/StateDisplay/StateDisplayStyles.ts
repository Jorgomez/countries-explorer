import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles';

export const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  errorText: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
});
