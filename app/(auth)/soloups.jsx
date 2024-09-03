import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter } from 'expo-router';

const SoloUps = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const navigateToNext = () => {
    router.push('soloups2');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.color }]}>Building your financial future is hard. StackUps makes it easy!</Text>
      <Text style={[styles.subtitle, { color: theme.color3 }]}>
        Reach your goals faster without changing your lifestyle.
      </Text>
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Text style={[styles.featureText, { color: theme.color }]}>Create a Retirement fund</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureText, { color: theme.color }]}>Build rainy day fund</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureText, { color: theme.color }]}>Save up to $66,000 on your taxes a year</Text>
        </View>
      </View>
      <Button buttonText="Continue" onPress={navigateToNext} />
    </View>
  );
};

export default SoloUps;

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
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFD700', // Gold color
  },
  features: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  featureText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
