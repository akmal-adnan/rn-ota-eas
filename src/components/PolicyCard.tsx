import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  BORDER,
} from '../constants/colors';
import {InsurancePolicy} from '../types';

interface PolicyCardProps {
  policy: InsurancePolicy;
  onPress: (policyId: string) => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({policy, onPress}) => {
  const statusColor =
    policy.status === 'active' ? COLORS.success : COLORS.warning;

  const formattedCoverage = `$${(policy.coverage / 1000).toFixed(0)}k`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(policy.id)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.policyName}>{policy.policyName}</Text>
          <Text style={styles.policyType}>{policy.policyType}</Text>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: statusColor}]}>
          <Text style={styles.statusText}>{policy.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Coverage</Text>
          <Text style={styles.value}>{formattedCoverage}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Premium</Text>
          <Text style={styles.value}>${policy.premium}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap to view details →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderTopWidth: BORDER.width,
    borderTopColor: BORDER.color,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  policyName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  policyType: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});

export default PolicyCard;
