import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
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
import { Cabin_500Medium, Cabin_600SemiBold, Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import ThemeContext from '../../theme/ThemeContext';

const Login = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const [Passwordvisible, setPasswordvisible] = useState(false);
  const [Passwordvisible2, setPasswordvisible2] = useState(false);
  const [Passwordvisible3, setPasswordvisible3] = useState(false);
  const [modalvisible, setModalvisible] = useState(false);
  const [modalvisible2, setModalvisible2] = useState(false);

  const open_modal = () => {
    setModalvisible(true);
  };

  const open_modal2 = () => {
    setModalvisible(false); // Close the first modal
    setTimeout(() => {
      setModalvisible2(true); // Open the second modal after a short delay
    }, 300); // Adjust the delay if needed
  };

  const close_modal = () => {
    setModalvisible(false);
  };

  const close_modal2 = () => {
    setModalvisible2(false);
  };

  const togglePasswordVisible = () => {
    setPasswordvisible(!Passwordvisible);
  };

  const togglePasswordVisible2 = () => {
    setPasswordvisible2(!Passwordvisible2);
  };

  const togglePasswordVisible3 = () => {
    setPasswordvisible3(!Passwordvisible3);
  };

  const verify = () => {
    setModalvisible(false);
    setModalvisible2(false);
    router.push('home');
  };

  const location = () => {
    setModalvisible(false);
    setModalvisible2(false);
    router.push('home');
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
              <TextInput style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]} placeholderTextColor={darkMode ? '#ffffff' : '#000000'} placeholder='minatonamikaze@gmail.com' />
              <Mail style={styles.icon} />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={[styles.label]}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]} placeholderTextColor={darkMode ? '#ffffff' : '#000000'} placeholder='Password' secureTextEntry={!Passwordvisible} />
              <TouchableOpacity onPress={togglePasswordVisible} style={styles.eye}>
                {Passwordvisible ? <Open /> : <Close />}
              </TouchableOpacity>
              <Lock style={styles.icon} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={open_modal}>
          <Text style={styles.forget}>Forgot password</Text>
        </TouchableOpacity>
        <Button buttonText="Login" onPress={verify} />
        <Text style={styles.or}>Or Using other Method</Text>
        <View style={styles.tab_container}>
          {
            log_methods.map((d) => (
              <TouchableOpacity style={[styles.tab]} key={d.id}>
                {darkMode ? d.dark_image : d.image}
                <Text style={[styles.tab_text, { color: theme.color }]}>{d.text}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <Text style={[styles.bottom_text, { color: theme.color }]}>Don’t have an account yet?<Link href='/create_account' style={styles.link} > Register</Link></Text>
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalvisible}
        onRequestClose={close_modal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modal_header}>
              <TouchableOpacity onPress={close_modal}>
                {darkMode ? <Dark_back /> : <Back />}
              </TouchableOpacity>
              <Text style={[styles.heading, { color: theme.color }]}>Forgot Password</Text>
            </View>
            <Text style={styles.head_text}>Enter your email address below and we'll help you reset your password.</Text>
            <View style={styles.inputBox}>
              <Text style={[styles.label, { color: theme.color }]}>Email Or Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]} placeholderTextColor={darkMode ? '#ffffff' : '#000000'} placeholder='minatonamikaze@gmail.com' />
                <Mail style={styles.icon} />
                <Done style={styles.done} />
              </View>
            </View>
            <Button buttonText="continue" onPress={open_modal2} />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalvisible2}
        onRequestClose={close_modal2}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modal_header}>
              <TouchableOpacity onPress={close_modal2}>
                {darkMode ? <Dark_back /> : <Back />}
              </TouchableOpacity>
              <Text style={[styles.modal_heading, { color: theme.color }]}>Create New Password</Text>
            </View>
            <Text style={styles.head_text}>Ensure your account's security with a strong, unique password.</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputBox2}>
                <Text style={[styles.label, { color: theme.color }]}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]} placeholderTextColor={darkMode ? '#ffffff' : '#000000'} placeholder='Password' secureTextEntry={!Passwordvisible2} />
                  <TouchableOpacity onPress={togglePasswordVisible2} style={styles.eye}>
                    {Passwordvisible2 ? <Open /> : <Close />}
                  </TouchableOpacity>
                  <Lock style={styles.icon} />
                </View>
              </View>
              <View style={styles.inputBox3}>
                <Text style={[styles.label, { color: theme.color }]}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.passwordInput, { backgroundColor: theme.cardbg, color: theme.color }]} placeholderTextColor={darkMode ? '#ffffff' : '#000000'} placeholder='Password' secureTextEntry={!Passwordvisible3} />
                  <TouchableOpacity onPress={togglePasswordVisible3} style={styles.eye}>
                    {Passwordvisible3 ? <Open /> : <Close />}
                  </TouchableOpacity>
                  <Lock style={styles.icon} />
                </View>
              </View>
            </View>
            <Button buttonText="continue" onPress={location} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  head_text: {
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
  mail_inputBox: {
    gap: 10,
  },
  inputBox: {
    gap: 10,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Cabin_600SemiBold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 16,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    bottom: 18,
    left: 10,
  },
  done: {
    position: 'absolute',
    bottom: 18,
    right: 10,
  },
  passwordInput: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingLeft: 40,
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
    color: '#121212',
  },
  bottom_text: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#121212',
    textAlign: 'center',
    marginVertical: 25,
    paddingBottom: 50,
  },
  link: {
    color: '#FFAF2A',
  },
  forget: {
    color: '#FFAF2A',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Cabin_500Medium',
    textTransform: 'capitalize',
    textAlign: 'right',
    marginBottom: 30,
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
    lineHeight: 30,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
  },
  inputBox2: {
    gap: 8,
  },
  inputBox3: {
    marginBottom: 25,
    gap: 8,
  }
})
