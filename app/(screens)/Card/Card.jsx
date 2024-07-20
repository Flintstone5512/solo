import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import React, { useContext } from 'react';
import Back from "../../../assets/images/Back.svg";
import Dark_Back from "../../../assets/images/White_back.svg";
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { router, Link } from "expo-router";
import {swipper_data2 } from '../../../components/Data/Data';
import Button from '../../../components/Button/Button';
import ThemeContext from '../../../theme/ThemeContext';

const screenWidth = Dimensions.get('window').width;

const Card = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
  const back = () => {
    router.push('home');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
      <TouchableOpacity onPress={back}>
       {darkMode? <Dark_Back /> : <Back />}
        </TouchableOpacity>
        <Text style={[styles.heading, {color:theme.color}]}>Selected Card</Text>
      </View>
      <View style={styles.card_container}>
        {
          swipper_data2.map((d) => (
            <View style={styles.itemContainer} key={d.id}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={d.image} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.name_head}>name</Text>
              <Text style={styles.name}>{d.name}</Text>
              <View style={styles.card_row}>
                <Text style={styles.cardNo}>{d.card_no}</Text>
                <Text style={styles.expire}>{d.expire}</Text>
              </View>
              <Text style={styles.balance_head}>balance</Text>
              <Text style={styles.balance}>{d.balance}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
          ))
        }
      </View>
      <View style={styles.button_box}>
        <Button buttonText="Add New Card" textColor="#FFAF2A" borderColor="#FFAF2A" backgroundColor="transparent" />
      </View>
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginBottom: 25,
    },
    heading: {
        fontSize: 26,
        lineHeight: 36,
        fontFamily: 'Cabin_700Bold',
        color: '#121212',
        textTransform: 'capitalize',
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 55,
    },
    item: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: screenWidth * 0.85,
      height: 170,
      borderRadius: 10,
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 50,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    content: {
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20,
    },
    name_head: {
      fontSize: 14,
      lineHeight: 17,
      fontFamily: 'Cabin_400Regular',
      color: '#ffffff',
      textTransform: 'capitalize',
    },
    name: {
      fontSize: 24,
      lineHeight: 29,
      fontFamily: 'Cabin_700Bold',
      color: '#ffffff',
      textTransform: 'capitalize',
    },
    type: {
      fontSize: 14,
      lineHeight: 16,
      fontFamily: 'Cabin_500Medium',
      color: '#ffffff',
      textTransform: 'capitalize',
      marginTop: 15,
    },
    card_row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingBottom: 4,
    },
    cardNo: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Lato_400Regular',
      color: '#ffffff',
    },
    expire: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Lato_400Regular',
      color: '#ffffff',
    },
    balance_head: {
      fontSize: 14,
      lineHeight: 17,
      fontFamily: 'Cabin_400Regular',
      color: '#ffffff',
      textTransform: 'capitalize',
    },
    balance: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: 'Lato_700Bold',
      color: '#ffffff',
    },
    button_box: {
      paddingTop: 170,
      paddingBottom: 60,
    }
})