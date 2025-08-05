import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import KidiaLogo from '../components/KidiaLogo';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to login after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8BBD9', '#E879F9', '#C084FC']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <KidiaLogo size="large" />
        </Animated.View>

        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
          <View style={[styles.square, styles.square1]} />
          <View style={[styles.square, styles.square2]} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: '#FFC107',
    top: height * 0.1,
    left: width * 0.1,
  },
  circle2: {
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    top: height * 0.2,
    right: width * 0.15,
  },
  circle3: {
    width: 80,
    height: 80,
    backgroundColor: '#E91E63',
    bottom: height * 0.15,
    left: width * 0.2,
  },
  square: {
    position: 'absolute',
    opacity: 0.1,
    borderRadius: 10,
  },
  square1: {
    width: 70,
    height: 70,
    backgroundColor: '#9C27B0',
    top: height * 0.3,
    right: width * 0.1,
  },
  square2: {
    width: 50,
    height: 50,
    backgroundColor: '#FFC107',
    bottom: height * 0.25,
    right: width * 0.25,
  },
});

export default SplashScreen;
