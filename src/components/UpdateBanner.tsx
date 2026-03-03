import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE} from '../constants/colors';

interface UpdateBannerProps {
  isVisible: boolean;
  isChecking: boolean;
  onRecheck: () => void;
  onDismiss: () => void;
  onUpdate: () => void;
}

const UpdateBanner: React.FC<UpdateBannerProps> = ({
  isVisible,
  isChecking,
  onRecheck,
  onDismiss,
  onUpdate,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.banner}>
        {/* Icon and Content */}
        <View style={styles.contentWrapper}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📲</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Update Available</Text>
            <Text style={styles.description}>
              A new version is ready to install.
            </Text>
          </View>
        </View>

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={onUpdate}
            disabled={isChecking}
            activeOpacity={0.7}>
            <Text style={styles.updateButtonText}>
              {isChecking ? 'Updating...' : 'Update Now'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.recheckButton]}
            onPress={onRecheck}
            disabled={isChecking}
            activeOpacity={0.7}>
            <Text style={styles.recheckButtonText}>Recheck</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onDismiss}
            activeOpacity={0.6}>
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  banner: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: `${COLORS.info}15`, // 15% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    flexShrink: 0,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZE.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  button: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    flexGrow: 1,
  },
  updateButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.white,
  },
  recheckButton: {
    backgroundColor: `${COLORS.info}15`,
    borderWidth: 1,
    borderColor: COLORS.info,
  },
  recheckButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.info,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.text}08`, // 8% opacity
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
});

export default UpdateBanner;
