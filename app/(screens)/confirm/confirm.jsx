import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import Back from "../../../assets/images/Back.svg";
import Dark_back from "../../../assets/images/White_back.svg";
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import Button from '../../../components/Button/Button';
import { text_data2 } from '../../../components/Data/Data';
import { router, Link } from "expo-router";
import ThemeContext from '../../../theme/ThemeContext';

const Confirm = () => {
  const [otp, setOtp] = useState('');
  const { theme,  darkMode } = useContext(ThemeContext);

  const back = () => {
    router.push('/Transfer/Transfer');
  };
  const handleGetOtp = () => {
    console.log('OTP requested');
  };

  const confirm = () => {
    router.push('/Success/Success');
  };

  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.header}>
       <TouchableOpacity onPress={back}>
       {darkMode? <Dark_back /> :  <Back />}
       </TouchableOpacity>
        <Text style={[styles.heading, {color:theme.color}]}>Confirm</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.confirm_text}>Confirm Transaction Information From</Text>
        <View style={styles.input_container}>
          {text_data2.map((d) => (
            <View style={styles.input_box} key={d.id}>
              <Text style={[styles.label, {color:theme.color}]}>{d.label}</Text>
              <TextInput keyboardType={d.key} style={[styles.input, {backgroundColor:theme.cardbg, color:theme.color}]} placeholder={d.placeholder} placeholderTextColor={darkMode? '#ffffff' : '#000000'} />
            </View>
          ))}
        </View>
        <View style={styles.otp_container}>
        <View style={styles.input_box}>
              <Text style={[styles.label2, {color:theme.color}]}>Get OTP to verify transaction</Text>
              <TextInput keyboardType='number-pad' style={[styles.input1, {backgroundColor:theme.cardbg, color:theme.color}]} placeholder="OTP" placeholderTextColor={darkMode? '#ffffff' : '#000000'} />
            </View>
          <Button buttonText="Get OTP" onPress={handleGetOtp}  />
        </View>
        <View style={styles.button_box}>
            <Button buttonText="confirm" onPress={confirm} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Confirm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  heading: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  confirm_text: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    marginVertical: 25,
  },
  input_container: {
    gap: 16,
  },
  input_box: {
    gap: 10,
    marginTop: 10,
  },
  label: {
    color: '#121212',
    textTransform: 'capitalize',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Cabin_600SemiBold',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
  otp_container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  otpInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    flex: 1,
    marginRight: 10,
  },
  label2: {
    color: '#121212',
    textTransform: 'capitalize',
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'Cabin_600SemiBold',
  },
  input1: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    maxWidth: 160,
  },
  button_box: {
    paddingTop: 25,
    paddingBottom: 90,
  }
});
