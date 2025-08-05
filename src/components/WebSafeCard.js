import React from 'react';
import { View, StyleSheet } from 'react-native';

const WebSafeCard = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const WebSafeCardContent = ({ children, style, ...props }) => {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
};

const WebSafeCardActions = ({ children, style, ...props }) => {
  return (
    <View style={[styles.actions, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 4,
  },
  content: {
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    paddingTop: 0,
  },
});

WebSafeCard.Content = WebSafeCardContent;
WebSafeCard.Actions = WebSafeCardActions;

export default WebSafeCard;
