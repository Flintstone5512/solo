import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter } from "expo-router";

const Splash = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const continueToNext = () => {
    router.push('membership');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('../../assets/images/splash1.png')} style={styles.image} />
      <Text style={[styles.title, { color: theme.color }]}>The First Step to a Secure Financial Future</Text>
      <Text style={[styles.description, { color: theme.color }]}>Just set your parameters and choose the best amount for your goal</Text>
      <View style={styles.paginationDots}>
        <View style={styles.dotActive}></View>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
      </View>
      <TouchableOpacity onPress={continueToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('skip')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 300, // Set appropriate height based on your image aspect ratio
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff', // Example white color
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
    color: '#fff', // Example white color
  },
  paginationDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dot: {
    backgroundColor: '#888', // Example inactive color
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#6A1B9A', // Match your theme color for the button
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  skipText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textDecorationLine: 'underline',
  }
});
