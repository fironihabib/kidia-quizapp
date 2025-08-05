import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    disabled: '#9e9e9e',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

export default function App() {
  const AppContent = () => (
    <PaperProvider theme={theme}>
      <AppProvider>
        <StatusBar style="light" backgroundColor="#6200ee" />
        <AppNavigator />
      </AppProvider>
    </PaperProvider>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        <View style={{
          width: 375,
          height: 812,
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: 'white',
          borderRadius: 20,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.3,
          shadowRadius: 40,
          elevation: 20,
        }}>
          <AppContent />
        </View>
      </View>
    );
  }

  return <AppContent />;
}
