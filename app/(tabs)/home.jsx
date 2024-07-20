import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useContext } from 'react';
import Profile from "../../assets/images/home_profile.png";
import Notification from "../../assets/images/Qr_scan.svg";
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { categories, last_transaction, send_money, swipper_data } from '../../components/Data/Data';
import CustomSwiper from '../../components/Swiper/Swiper';
import { router, Link } from "expo-router";
import Common_tabs from '../../components/Tabs/common_tabs';
import ThemeContext from '../../theme/ThemeContext';

const Home = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
  const transfer = () => {
    router.push("/Transfer/Transfer");
  };
  const code = () => {
    router.push('/Qr_code/Qr_code');
  };
  const Card = () => {
    router.push('/Card/Card');
  };
  const handleTabPress = (name) => {
    if (name.toLowerCase().includes('card')) {
      Card();
    } else {
      transfer();
    }
  };
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
        <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle={darkMode ? "light-content" : "dark-content"} 
      />
      <View style={styles.header}>
        <View style={styles.header_left}>
          <Image source={Profile} alt='image' style={styles.profile} />
          <View style={styles.left_content}>
            <Text style={[styles.heading, {color:theme.color3}]}>Good Morning</Text>
            <Text style={[styles.name, {color:theme.color}]}>Hi, Satoru Gojo</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.Notification, {backgroundColor: theme.background2}]} onPress={code}>
          <Notification width={24} height={24} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <CustomSwiper data={swipper_data} />
        <View style={styles.tab_container}>
          {categories.map((d) => (
            <TouchableOpacity style={[styles.tab, {backgroundColor: theme.cardbg}]} key={d.id}onPress={() => handleTabPress(d.names)}>
              {d.icon}
              <Text style={[styles.tab_text, {color:theme.color4}]}>{d.names}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={[styles.title, {color:theme.color}]}>Send Money</Text>
          <Text style={styles.view}>View All</Text>
        </View>
        <ScrollView horizontal={true} style={styles.hscroll}>
          <TouchableOpacity style={styles.add}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
          <View style={styles.send_container}>
            {send_money.map((d) => (
              <TouchableOpacity style={styles.send_money} key={d.id}>
                <Image source={d.image} alt='image' style={styles.send_images} />
                <Text style={[styles.send_text, {color:theme.color}]}>{d.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text style={[styles.title, {color:theme.color}]}>Last Transaction</Text>
            <Common_tabs />
      </ScrollView>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profile: {
    width: 50,
    height: 50,
  },
  left_content: {
    gap: 3,
  },
  Notification: {
    backgroundColor: '#0890FE',
    borderRadius: 8,
    padding: 10,
  },
  heading: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    textTransform: 'capitalize',
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  tab_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 30,
    justifyContent: 'center',
  },
  tab: {
    borderRadius: 15,
    maxWidth: 96,
    minWidth: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f6f6f6',
    marginRight: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  tab_text: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Lato_400Regular',
    color: '#979797',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Cabin_700Bold',
    color: '#000000',
    textTransform: 'capitalize',
  },
  view: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Lato_400Regular',
    color: '#FF4267',
    textTransform: 'capitalize',
  },
  hscroll: {
    paddingVertical: 25,
  },
  send_container: {
    flexDirection: 'row',
  },
  send_money: {
    alignItems: 'center',
    gap: 5,
    marginRight: 16,
  },
  send_images: {
    width: 50,
    height: 50,
  },
  send_text: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Lato_400Regular',
    color: '#000000',
    textTransform: 'capitalize',
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderStyle: 'dashed',
    borderColor: '#0890FE',
    borderWidth: 2,
    padding: 10,
    width: 50,
    height: 50,
    marginRight: 16,
  },
  plus: {
    color: '#0890FE',
    fontSize: 24,
    marginTop: -5,
  },
  
});
