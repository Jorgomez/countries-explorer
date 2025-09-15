import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: spacing.md,
  },
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
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  flag: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  countryName: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  officialName: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.text,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    flex: 2,
    textAlign: 'right',
  },
  listContainer: {
    marginTop: spacing.xs,
  },
  listItem: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    paddingVertical: spacing.xs,
    paddingLeft: spacing.sm,
  },
  noDataText: {
    fontSize: typography.md,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
