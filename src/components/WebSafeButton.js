import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const WebSafeButton = ({ 
  children, 
  onPress, 
  mode = 'contained', 
  style, 
  contentStyle,
  disabled = false,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    mode === 'contained' ? styles.contained : styles.outlined,
    disabled && styles.disabled,
    style
  ];

  const textStyle = [
    styles.text,
    mode === 'contained' ? styles.containedText : styles.outlinedText,
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  contained: {
    backgroundColor: '#6200ee',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  containedText: {
    color: '#fff',
  },
  outlinedText: {
    color: '#6200ee',
  },
  disabledText: {
    color: '#999',
  },
});

export default WebSafeButton;
