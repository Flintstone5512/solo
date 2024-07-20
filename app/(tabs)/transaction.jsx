import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, {useContext, useState} from 'react';
import Back from "../../assets/images/Back.svg";
import Dark_back from "../../assets/images/White_back.svg";
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { duration_data, last_transaction } from '../../components/Data/Data';
import Progressive from '../../components/Progressive/Progressive';
import Transaction_section2 from '../../components/Transaction_section2/Transaction_section2';
import { router, Link } from "expo-router";
import Common_tabs from '../../components/Tabs/common_tabs';
import ThemeContext from '../../theme/ThemeContext';

const Transaction = () => {
  const back = () => {
    router.push('home');
  };

  const { theme,  darkMode } = useContext(ThemeContext);
  return (
    <View style={[styles.transaction_page, {backgroundColor:theme.background}]}>
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={back}>
         { darkMode? <Dark_back /> : <Back />}
          </TouchableOpacity>

          <Text style={[styles.heading, {color:theme.color}]}>Transactions</Text>
        </View>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Progressive />
        <Transaction_section2 />
    <View style={[styles.transaction_section, {backgroundColor:theme.cardbg3}]}>
        <Text style={[styles.heading2, {color:theme.color}]}>Transaction</Text>
        <Common_tabs />
      </View>
      </ScrollView>
      </View>
  )
}

export default Transaction;

const styles = StyleSheet.create({
  transaction_page: {
    backgroundColor: '#ffffff',
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  heading: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  transaction_section: {
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 24,
    padding: 20,
},
heading2: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Cabin_700Bold',
    color: '#000000',
    textTransform: 'capitalize',
},

})