import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { router, Link } from 'expo-router';
import Person from "../../assets/images/person.svg";
import Mail from "../../assets/images/mail.svg";
import Lock from "../../assets/images/lock.svg";
import Open from "../../assets/images/eye-open.svg";
import Close from "../../assets/images/eye-close.svg";
import Button from '../../components/Button/Button';
import { log_methods } from '../../components/Data/Data';
import ThemeContext from '../../theme/ThemeContext';
import AuthContext from './AuthContext';

const CreateAccount = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const { signUpWithEmailPassword } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    try {
      if (!emailOrPhone || !password) {
        Alert.alert('Missing Fields', 'Please enter email and password');
        return;
      }

      await signUpWithEmailPassword(emailOrPhone, password);
      router.replace('home'); // Adjust this route as needed
    } catch (err) {
      Alert.alert('Signup Failed', err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.color }]}>Create Account</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Text style={styles.headingText}>
          Create your account to unlock a personalized finance experience tailored to your goals.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={[styles.label, { color: theme.color }]}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]}
                placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                placeholder='Minato Namikaze'
              />
              <Person style={styles.icon} />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={[styles.label, { color: theme.color }]}>Email or Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]}
                placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                placeholder='minatonamikaze@gmail.com'
              />
              <Mail style={styles.icon} />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={[styles.label, { color: theme.color }]}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]}
                placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                placeholder='Password'
              />
              <TouchableOpacity onPress={togglePasswordVisible} style={styles.eye}>
                {passwordVisible ? <Open /> : <Close />}
              </TouchableOpacity>
              <Lock style={styles.icon} />
            </View>
          </View>
        </View>

        <Button buttonText="Create Account" onPress={handleSignup} />

        <Text style={styles.or}>Or using other method</Text>

        <View style={styles.tab_container}>
          {log_methods.map((d) => (
            <TouchableOpacity style={styles.tab} key={d.id}>
              {darkMode ? d.dark_image : d.image}
              <Text style={[styles.tab_text, { color: theme.color }]}>{d.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.bottom_text, { color: theme.color }]}>
          Already have an account? <Link href="/login" style={styles.link}>Login</Link>
        </Text>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  headingText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    marginVertical: 10,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 26,
  },
  inputBox: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Cabin_600SemiBold',
    textTransform: 'capitalize',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 20,
  },
  icon: {
    position: 'absolute',
    bottom: 18,
    left: 15,
  },
  passwordInput: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  eye: {
    position: 'absolute',
    right: 10,
    bottom: 18,
  },
  or: {
    textAlign: 'center',
    marginVertical: 28,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
  tab_container: {
    gap: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
  },
  tab_text: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Cabin_500Medium',
  },
  bottom_text: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginVertical: 25,
    paddingBottom: 50,
  },
  link: {
    color: '#FFAF2A',
  },
});
