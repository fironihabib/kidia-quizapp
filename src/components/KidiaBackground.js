import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const KidiaBackground = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['#F3E8FF', '#E9D5FF', '#DDD6FE']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Decorative patterns */}
      <Svg style={styles.pattern} width={width} height={height}>
        {/* Stars */}
        <Polygon
          points="20,10 25,20 35,20 27,28 30,38 20,32 10,38 13,28 5,20 15,20"
          fill="#DDD6FE"
          opacity={0.3}
        />
        <Polygon
          points="320,50 325,60 335,60 327,68 330,78 320,72 310,78 313,68 305,60 315,60"
          fill="#C4B5FD"
          opacity={0.4}
        />
        <Polygon
          points="80,150 85,160 95,160 87,168 90,178 80,172 70,178 73,168 65,160 75,160"
          fill="#DDD6FE"
          opacity={0.3}
        />
        
        {/* Circles */}
        <Circle cx="50" cy="80" r="8" fill="#E9D5FF" opacity={0.4} />
        <Circle cx="300" cy="120" r="12" fill="#DDD6FE" opacity={0.3} />
        <Circle cx="150" cy="200" r="6" fill="#C4B5FD" opacity={0.5} />
        <Circle cx="280" cy="180" r="10" fill="#E9D5FF" opacity={0.3} />
        
        {/* Question marks */}
        <Path
          d="M100,300 Q105,295 110,300 Q115,305 110,310 L108,315 M108,320 L108,325"
          stroke="#DDD6FE"
          strokeWidth="3"
          fill="none"
          opacity={0.4}
        />
        <Path
          d="M250,250 Q255,245 260,250 Q265,255 260,260 L258,265 M258,270 L258,275"
          stroke="#C4B5FD"
          strokeWidth="3"
          fill="none"
          opacity={0.3}
        />
        
        {/* Light bulbs */}
        <Circle cx="180" cy="100" r="8" fill="#FEF3C7" opacity={0.6} />
        <Path
          d="M175,108 L185,108 M177,112 L183,112"
          stroke="#F59E0B"
          strokeWidth="2"
          opacity={0.6}
        />
        
        <Circle cx="320" cy="280" r="6" fill="#FEF3C7" opacity={0.5} />
        <Path
          d="M317,286 L323,286 M318,289 L322,289"
          stroke="#F59E0B"
          strokeWidth="1.5"
          opacity={0.5}
        />
      </Svg>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  pattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default KidiaBackground;
