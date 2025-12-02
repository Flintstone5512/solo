import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { router, Link } from "expo-router";
import Back from "../../assets/images/Back.svg";
import Dark_back from "../../assets/images/White_back.svg";
import Mail from "../../assets/images/mail.svg";
import Lock from "../../assets/images/lock.svg";
import Open from "../../assets/images/eye-open.svg";
import Close from "../../assets/images/eye-close.svg";
import Done from "../../assets/images/Done.svg";
import Button from '../../components/Button/Button';
import { log_methods } from '../../components/Data/Data';
import ThemeContext from '../../theme/ThemeContext';
import AuthContext from './AuthContext';

const Login = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const { loginWithEmailPassword } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  const handleLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      router.push("home");
    } catch (err) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.color }]}>Login Account</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.head_text}>Login to access your personalized music collection and playlists anytime, anywhere.</Text>

        <View style={styles.inputContainer}>
          <View style={styles.mail_inputBox}>
            <Text style={[styles.label, { color: theme.color }]}>Email Or Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]}
                placeholder='you@example.com'
                placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
              />
              <Mail style={styles.icon} />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={[styles.label]}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]}
                placeholder='Password'
                placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
              />
              <TouchableOpacity onPress={togglePasswordVisible} style={styles.eye}>
                {passwordVisible ? <Open /> : <Close />}
              </TouchableOpacity>
              <Lock style={styles.icon} />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forget}>Forgot password</Text>
        </TouchableOpacity>

        <Button buttonText="Login" onPress={handleLogin} />

        <Text style={styles.or}>Or Using other Method</Text>
        <View style={styles.tab_container}>
          {log_methods.map((d) => (
            <TouchableOpacity style={styles.tab} key={d.id}>
              {darkMode ? d.dark_image : d.image}
              <Text style={[styles.tab_text, { color: theme.color }]}>{d.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.bottom_text, { color: theme.color }]}>
          Don’t have an account yet?
          <Link href='/create_account' style={styles.link}> Register</Link>
        </Text>
      </ScrollView>

      {/* Forgot Password Modal */}
      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modal_header}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                {darkMode ? <Dark_back /> : <Back />}
              </TouchableOpacity>
              <Text style={[styles.heading, { color: theme.color }]}>Forgot Password</Text>
            </View>
            <Text style={styles.head_text}>Enter your email address below and we'll help you reset your password.</Text>
            <View style={styles.inputBox}>
              <Text style={[styles.label, { color: theme.color }]}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]}
                  placeholder='you@example.com'
                  placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                />
                <Mail style={styles.icon} />
                <Done style={styles.done} />
              </View>
            </View>
            <Button buttonText="Continue" onPress={() => {
              setModalVisible(false);
              setModalVisible2(true);
            }} />
          </View>
        </View>
      </Modal>

      {/* Reset Password Modal */}
      <Modal transparent visible={modalVisible2} onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modal_header}>
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                {darkMode ? <Dark_back /> : <Back />}
              </TouchableOpacity>
              <Text style={[styles.modal_heading, { color: theme.color }]}>Create New Password</Text>
            </View>
            <Text style={styles.head_text}>Ensure your account's security with a strong, unique password.</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputBox}>
                <Text style={[styles.label, { color: theme.color }]}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    secureTextEntry
                    style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]}
                    placeholder='New Password'
                    placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                  />
                  <Lock style={styles.icon} />
                </View>
              </View>
              <View style={styles.inputBox}>
                <Text style={[styles.label, { color: theme.color }]}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    secureTextEntry
                    style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]}
                    placeholder='Confirm Password'
                    placeholderTextColor={darkMode ? '#ffffff' : '#000000'}
                  />
                  <Lock style={styles.icon} />
                </View>
              </View>
            </View>
            <Button buttonText="Continue" onPress={() => {
              setModalVisible2(false);
              router.push('home');
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  head_text: {
    fontSize: 14,
    lineHeight: 24,
    marginVertical: 10,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 26,
  },
  mail_inputBox: {
    marginBottom: 20,
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  passwordInput: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    top: 18,
    left: 10,
  },
  eye: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  done: {
    position: 'absolute',
    right: 10,
    top: 18,
  },
  forget: {
    textAlign: 'right',
    color: '#FFAF2A',
    marginBottom: 30,
  },
  or: {
    textAlign: 'center',
    marginVertical: 28,
    fontSize: 14,
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
    color: '#121212',
  },
  bottom_text: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 25,
    paddingBottom: 50,
  },
  link: {
    color: '#FFAF2A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal_header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 25,
  },
  modal_heading: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
