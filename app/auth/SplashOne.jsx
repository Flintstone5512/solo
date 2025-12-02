import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter } from "expo-router";

const SplashOne = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const continueToNext = () => {
    router.push('/auth/SplashTwo');
  };

  return (
    <View style={styles.container}>
      {/* Lotus Image */}
      <Image
        source={require('../../assets/images/lotus.png')}
        style={styles.image}
      />

      {/* Title and Subtitle */}
      <Text style={[styles.title, { color: theme.color }]}>
        Managing your money doesn’t have to be complicated.
      </Text>
      <Text style={[styles.subtitle, { color: theme.color3 }]}>
        SoloMoney helps you budget smarter, save faster, and reach your goals without changing your lifestyle.
      </Text>

      {/* Continue Button */}
      <Button buttonText="Continue" onPress={continueToNext} />
    </View>
  );
};

export default SplashOne;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // ✅ Force white background
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 20 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginVertical: 10 
  },
  image: { 
    width: 200, 
    height: 200, 
    marginVertical: 20,
    resizeMode: 'contain',
  },
});
