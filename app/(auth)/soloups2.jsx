import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter, Link } from "expo-router";

const SoloUps2 = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const router = useRouter();

  const continueToNext = () => {
    router.push('kashkick');
  };

  useEffect(() => {
    console.log('SoloUps2 component is mounted');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.color }]}>Activate StackUps</Text>
      <Image source={{ uri: 'https://your-image-url.com' }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.subtitle, { color: theme.color }]}>Stackups for your goals</Text>
        <Text style={[styles.featureText, { color: theme.color }]}>Small amounts, <Text style={styles.bold}>always keeping your financial future in mind</Text></Text>
        <Text style={[styles.featureText, { color: theme.color }]}>Used towards the <Text style={styles.bold}>saving your taxes, retirement, and financial health</Text></Text>
        <Text style={[styles.featureText, { color: theme.color }]}>Turn off anytime</Text>
      </View>
      <Button buttonText="Continue" onPress={continueToNext} />
      <Text style={[styles.footerText, { color: theme.color3 }]}>
        By clicking “Continue”, I agree with <Link href="/terms" style={styles.link}>ACH AutoSavings Terms</Link>
      </Text>
      <Text style={[styles.footerText, { color: theme.color3 }]}>I’d rather do it myself</Text>
    </View>
  );
};

export default SoloUps2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#6A1B9A', // Purple color
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  textContainer: {
    marginVertical: 20,
  },
  featureText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
  link: {
    color: '#FFAF2A', // Gold color
    textDecorationLine: 'underline',
  },
});
