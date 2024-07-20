import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import semi_circlebar from "../../assets/images/semi_circle.png";
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { donet_datas } from '../Data/Data';
import Common_tabs from '../Tabs/common_tabs';
import ThemeContext from '../../theme/ThemeContext';

const Wallet_section2 = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
  const percentages = [80, 80, 60, 0];
  const colors = ['#FF4267', '#0890FE', '#FFAF2A', '#CCCCCC'];
  return (
    <View style={styles.container}>
      <View style={styles.withdraw_row}>
        <View style={styles.row_left}>
          <Text style={[styles.heading, {color:theme.color}]}>Withdraw</Text>
          <Text style={styles.withdraw_text}>Withdraw Your Money</Text>
        </View>
        <Button buttonText="Withdraw" />
      </View>
      <View style={styles.donet_container}>
        <Image source={semi_circlebar} alt='image' style={styles.image} resizeMode='contain' />
        <View style={styles.content}>
          <Text style={[styles.price, {color:theme.color}]}>$ 1043,23</Text>
          <Text style={[styles.content_text, {color:theme.color3}]}>Total spending 10% higher than last week</Text>
        </View>
      </View>
      <View style={styles.donet_data_container}>
        {
          donet_datas.map((d) => (
            <View style={styles.row} key={d.id}>
              <View style={[styles.circle, { backgroundColor: d.color }]}></View>
              <Text style={[styles.color_text, {color:theme.color3}]}>{d.text}</Text>
            </View>
          ))
        }
      </View>
    
    </View>
  );
};

export default Wallet_section2;

const styles = StyleSheet.create({
  container: {

  },
  withdraw_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  row_left: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
    textTransform: 'capitalize',
  },
  withdraw_text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
  donet_container: {
    width: '100%', 
    alignItems: 'center',
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: 176,
    position: 'relative',
  },
  content: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 30,
    lineHeight: 40,
    fontFamily: 'Cabin_700Bold',
    color: '#000000',
    textAlign: 'center',
  },
  content_text: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    textAlign: 'center',
    maxWidth: 170,
  },
  donet_data_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    borderRadius: 50,
    width: 8,
    height: 8,
  },
  color_text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
});
