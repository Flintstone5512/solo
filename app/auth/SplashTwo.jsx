import React, { useContext } from 'react'; 
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter, Link } from "expo-router";

const SplashTwo = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const continueToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={[styles.title, { color: theme.color }]}>
        Automate your financial future
      </Text>

      {/* Image */}
      <Image
        source={require('../../assets/images/strike.png')}
        style={styles.image}
      />

      {/* Features */}
      <View style={styles.textContainer}>
        <Text style={[styles.featureText, { color: theme.color }]}>
          ✅ Track income & expenses in real time
        </Text>
        <Text style={[styles.featureText, { color: theme.color }]}>
          ✅ Auto-build savings, bills, and goals
        </Text>
        <Text style={[styles.featureText, { color: theme.color }]}>
          ✅ Put your tax savings and retirement on autopilot
        </Text>
      </View>

      {/* Button */}
      <Button buttonText="Get Started" onPress={continueToLogin} />

      {/* Footer */}
      <Text style={[styles.footerText, { color: theme.color3 }]}>
        By clicking “Get Started”, I agree to SoloMoney’s{" "}
        <Link href="/terms" style={styles.link}>Terms</Link>
      </Text>
    </View>
  );
};

export default SplashTwo;

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
  textContainer: { 
    marginVertical: 20 
  },
  featureText: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginVertical: 5 
  },
  image: { 
    width: 200, 
    height: 200, 
    marginVertical: 20,
    resizeMode: 'contain',
  },
  footerText: { 
    fontSize: 12, 
    textAlign: 'center', 
    marginVertical: 10 
  },
  link: { 
    color: '#FFAF2A', 
    textDecorationLine: 'underline' 
  },
});
