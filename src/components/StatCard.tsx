import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  BORDER,
} from '../constants/colors';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({label, value}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    borderTopWidth: BORDER.width,
    borderTopColor: BORDER.color,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    fontWeight: '500',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default StatCard;
