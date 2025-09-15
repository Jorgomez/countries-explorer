import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../../styles';

export const styles = StyleSheet.create({
  countryCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  flag: {
    width: 40,
    height: 30,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  countryName: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.text,
    flex: 1,
  },
  countryInfo: {
    fontSize: typography.sm,
    fontWeight: typography.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
