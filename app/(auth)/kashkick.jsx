import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter, Link } from "expo-router";

const KashKick = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const continueToNext = () => {
    router.push('create_account');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: 'https://your-image-url.com' }} style={styles.image} />
      <Text style={[styles.title, { color: theme.color }]}>Earn up to $500 extra cash</Text>
      <View style={styles.textContainer}>
        <Text style={[styles.featureText, { color: theme.color }]}>
          Play games, take surveys, find deals, test products
        </Text>
        <Text style={[styles.featureText, { color: theme.color }]}>
          You can earn <Text style={styles.bold}>up to $500</Text> in your first month!
        </Text>
      </View>
      <Button buttonText="Earn up to $500" onPress={continueToNext} />
      <Text style={[styles.footerText, { color: theme.color3 }]}>
        Sign up for <Text style={styles.bold}>FREE</Text> in 2 mins
      </Text>
      <Text style={[styles.skipText, { color: theme.color3 }]}>Skip for now</Text>
    </View>
  );
};

export default KashKick;

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
    color: '#FFD700', // Gold color
  },
  skipText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
});
