import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, {useContext, useState} from 'react';
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { trans_data } from '../Data/Data';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import ThemeContext from '../../theme/ThemeContext';


const Transfer_section2 = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
const [active_stack, setActive_stack] = useState(trans_data[0].id);

const click = (id) => {
  setActive_stack(id);
};
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, {color:theme.color}]}>Choose Transaction</Text>
        {/* <ScrollView horizontal={true} > */}
      <View style={styles.stack_container}>
        {
          trans_data.map((d) => (
            <TouchableOpacity style={[[styles.stack, {backgroundColor:theme.cardbg3}], active_stack === d.id && styles.active_stack]} key={d.id} onPress={() => click(d.id)}>
              {active_stack === d.id ? d.active : d.icon}
              <Text style={[[styles.stack_text], active_stack === d.id && styles.active_stack_text]}>{d.text}</Text>
            </TouchableOpacity>
          ))
        }
        
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

export default Transfer_section2;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    heading: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily: 'Cabin_700Bold',
        color: '#000000',
        textTransform:  'capitalize',
    },
    stack_container: {
      gap: 11,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    stack: {
      borderRadius: 15,
      maxWidth: 98,
      minWidth: 98,
      maxHeight: 100,
      backgroundColor: '#F6F6F6',
      paddingVertical: 16,
      paddingLeft: 12,
      paddingRight: 10,
      gap: 8,
    },
    stack_text: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Lato_400Regular',
      color: '#757575',
      maxWidth: 80,
    },
    active_stack_text: {
      color: '#ffffff',
    },
    active_stack: {
      backgroundColor: '#3629B7',
    }
})