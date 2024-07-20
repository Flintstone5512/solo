import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, { useContext } from 'react';
import Back from "../../../assets/images/Back.svg";
import Dark_back from "../../../assets/images/White_back.svg";
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import success from "../../../assets/images/successful.png";
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import Button from '../../../components/Button/Button';
import { router, Link } from "expo-router";
import ThemeContext from '../../../theme/ThemeContext';

const Success = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
    const gohome = () => {
        router.push('home');
    };
    const back = () => {
      router.push('/confirm/confirm');
    };
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.header}>
      <TouchableOpacity onPress={back}>
       {darkMode? <Dark_back /> :  <Back />}
       </TouchableOpacity>
        <Text style={[styles.heading, {color:theme.color}]}>Successfully</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.image} source={success} alt='image' />
        <Text style={[styles.head, {color:theme.color}]}>Transfer Successful</Text>
        <Text style={styles.head_text}>You have successfully transferred<Text style={styles.color}> $1,000 </Text>to<Text style={styles.color}> Emma Watson</Text></Text>
      </View>
      <View style={styles.button_box}>
        <Button buttonText="go to homepage" onPress={gohome} />
      </View>
    </View>
  )
}

export default Success;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 80,
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
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 140,
        marginBottom: 130,
    },
    image: {
        width: 300,
        height: 200,
    },
    head: {
        fontSize: 26,
        lineHeight: 36,
        fontFamily: 'Cabin_700Bold',
        color: '#121212',
        textTransform: 'capitalize',
        textAlign: 'center',
        marginVertical: 10,
    },
    head_text: {
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
        textAlign: 'center',
    },
    color: {
        fontFamily: 'Lato_700Bold',
        color: '#FFAF2A',
    },
    button_box: {
        paddingBottom: 80,
    }
})