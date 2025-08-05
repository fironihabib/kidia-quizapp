import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Web için localStorage wrapper'ı
const webStorage = {
  async getItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn('localStorage getItem error:', error);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('localStorage setItem error:', error);
    }
  },

  async removeItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('localStorage removeItem error:', error);
    }
  },

  async clear() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (error) {
      console.warn('localStorage clear error:', error);
    }
  }
};

// Platform'a göre doğru storage'ı seç
const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;

export default storage;
