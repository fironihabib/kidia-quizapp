import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KidiaInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  autoFocus = false,
  editable = true,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleContainerPress = () => {
    if (inputRef.current && editable) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !editable && styles.inputContainerDisabled
        ]}
        onPress={handleContainerPress}
        activeOpacity={0.7}
      >
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color="#8B5FBF" />
          </View>
        )}

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder || label}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          editable={editable}
          selectTextOnFocus={Platform.OS !== 'web'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Ionicons
              name={isSecure ? 'eye-off' : 'eye'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 50,
  },
  inputContainerDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  inputContainerFocused: {
    borderColor: '#8B5FBF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#8B5FBF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 8,
  },
  eyeIcon: {
    padding: 4,
  },
});

export default KidiaInput;
