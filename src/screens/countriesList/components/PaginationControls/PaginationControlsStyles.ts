import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../../styles';

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  paginationButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    minWidth: 80,
  },
  disabledButton: {
    backgroundColor: colors.textLight,
    opacity: 0.6,
  },
  paginationText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.background,
    textAlign: 'center',
  },
  pageInfo: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.text,
    textAlign: 'center',
  },
});
