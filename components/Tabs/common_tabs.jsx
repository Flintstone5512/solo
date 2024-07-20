import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { last_transaction } from '../Data/Data';
import ThemeContext from '../../theme/ThemeContext';

const Common_tabs = () => {
  const { theme,  darkMode } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={styles.transaction_container}>
          {last_transaction.map((d) => (
            <TouchableOpacity style={styles.stack} key={d.id}>
              <View style={styles.stack_left}>
                {d.image}
                <View style={styles.stack_column}>
                  <Text style={[styles.stack_name, {color:theme.color}]}>{d.heading}</Text>
                  <Text style={styles.date}>{d.date}</Text>
                </View>
              </View>
              <Text style={[styles.amount, { color: d.amount.startsWith('+') ? '#16C813' : '#EC1C24' }]}>{d.amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
    </View>
  )
}

export default Common_tabs;

const styles = StyleSheet.create({
    transaction_container: {
        gap: 10,
        paddingVertical: 26,
        marginBottom: 50,
      },
      stack: {
        borderWidth: 1,
        borderColor: '#BABABA',
        borderRadius: 5,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      stack_left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      },
      stack_column: {
        gap: 2,
      },
      stack_name: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: 'Cabin_700Bold',
        color: '#000000',
      },
      date: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
      },
      amount: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: 'Cabin_700Bold',
      },
    
})