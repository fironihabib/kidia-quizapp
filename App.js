import React from 'react';
import { StatusBar } from 'expo-status-bar';
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
  return (
    <PaperProvider theme={theme}>
      <AppProvider>
        <StatusBar style="light" backgroundColor="#6200ee" />
        <AppNavigator />
      </AppProvider>
    </PaperProvider>
  );
}
