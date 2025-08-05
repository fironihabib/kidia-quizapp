import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KidiaMascot = ({ size = 'large', style }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 60, height: 60, fontSize: 30 };
      case 'medium':
        return { width: 80, height: 80, fontSize: 40 };
      case 'large':
      default:
        return { width: 120, height: 120, fontSize: 60 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.mascot, sizeStyles]}>
        <Text style={[styles.emoji, { fontSize: sizeStyles.fontSize }]}>
          🐘
        </Text>
      </View>
      <View style={[styles.shadow, sizeStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 1,
  },
  shadow: {
    position: 'absolute',
    backgroundColor: '#E5E7EB',
    borderRadius: 60,
    opacity: 0.3,
    top: 8,
    zIndex: 0,
  },
  emoji: {
    textAlign: 'center',
  },
});

export default KidiaMascot;
