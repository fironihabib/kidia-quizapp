import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const WebSafeTextInput = ({ 
  label, 
  value, 
  onChangeText, 
  style, 
  multiline = false,
  numberOfLines,
  placeholder,
  ...props 
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          multiline && numberOfLines && { height: numberOfLines * 20 + 20 }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
});

export default WebSafeTextInput;
