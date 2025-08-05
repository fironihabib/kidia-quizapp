import { View, Text, StyleSheet } from 'react-native';

const KidiaLogo = ({ size = 'large', style }) => {
  const logoSize = size === 'large' ? styles.large : size === 'medium' ? styles.medium : styles.small;
  const textSize = size === 'large' ? styles.textLarge : size === 'medium' ? styles.textMedium : styles.textSmall;
  const subtitleSize = size === 'large' ? styles.subtitleLarge : size === 'medium' ? styles.subtitleMedium : styles.subtitleSmall;

  return (
    <View style={[styles.container, style]}>
      {/* Logo Shapes */}
      <View style={[styles.logoContainer, logoSize]}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={[styles.shape, styles.yellowSquare, logoSize]} />
          <View style={[styles.shape, styles.blueQuarter, logoSize]} />
        </View>
        
        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <View style={[styles.shape, styles.purpleCircle, logoSize]} />
          <View style={[styles.shape, styles.pinkQuarter, logoSize]} />
        </View>
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <View style={styles.kidiaContainer}>
          <Text style={[styles.kidiaText, textSize]}>kidia</Text>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.blueDot]} />
            <View style={[styles.dot, styles.pinkDot]} />
          </View>
        </View>
        <Text style={[styles.subtitle, subtitleSize]}>
          uşaqlarınız üçün daha yaxşı gələcək
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
  },
  shape: {
    marginHorizontal: 2,
  },
  
  // Shape styles
  yellowSquare: {
    backgroundColor: '#FFC107',
    borderRadius: 8,
  },
  blueQuarter: {
    backgroundColor: '#2196F3',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  purpleCircle: {
    backgroundColor: '#9C27B0',
    borderRadius: 30,
  },
  pinkQuarter: {
    backgroundColor: '#E91E63',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  // Size variants
  large: {
    width: 60,
    height: 60,
  },
  medium: {
    width: 40,
    height: 40,
  },
  small: {
    width: 30,
    height: 30,
  },

  // Text styles
  textContainer: {
    alignItems: 'center',
  },
  kidiaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  kidiaText: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 2,
  },
  textLarge: {
    fontSize: 48,
  },
  textMedium: {
    fontSize: 32,
  },
  textSmall: {
    fontSize: 24,
  },
  
  dots: {
    marginLeft: 8,
    justifyContent: 'space-between',
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginVertical: 1,
  },
  blueDot: {
    backgroundColor: '#2196F3',
  },
  pinkDot: {
    backgroundColor: '#E91E63',
  },

  subtitle: {
    color: '#757575',
    textAlign: 'center',
    fontWeight: '400',
  },
  subtitleLarge: {
    fontSize: 16,
  },
  subtitleMedium: {
    fontSize: 14,
  },
  subtitleSmall: {
    fontSize: 12,
  },
});

export default KidiaLogo;
