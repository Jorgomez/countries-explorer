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
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
  },
  // Search input
  searchContainer: {
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.md,
    color: colors.text,
  },
  // Center container for loading/error/empty states
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  // Loading state
  loadingText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  // Error state
  errorText: {
    fontSize: typography.md,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
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
  // Empty state
  emptyText: {
    fontSize: typography.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // List
  listContainer: {
    paddingBottom: spacing.md,
  },
  // Country card
  countryCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: spacing.sm,
    borderRadius: 2,
  },
  countryName: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.text,
    flex: 1,
  },
  countryInfo: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  // Pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  paginationButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.textLight,
  },
  paginationText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.background,
  },
  pageInfo: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
});