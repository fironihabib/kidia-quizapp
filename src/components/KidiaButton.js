import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const KidiaButton = ({ 
  children, 
  onPress, 
  variant = 'primary', // primary, secondary, outline
  style, 
  disabled = false,
  icon,
  ...props 
}) => {
  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return ['#8B5FBF', '#6B46C1']; // Purple gradient
      case 'secondary':
        return ['#EC4899', '#BE185D']; // Pink gradient
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return ['#8B5FBF', '#6B46C1'];
    }
  };

  const getTextColor = () => {
    return variant === 'outline' ? '#8B5FBF' : '#FFFFFF';
  };

  const buttonStyle = [
    styles.button,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabled,
    style
  ];

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        {...props}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, { color: getTextColor() }]}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        colors={getButtonColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, { color: getTextColor() }]}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    minHeight: 50,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#8B5FBF',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default KidiaButton;
