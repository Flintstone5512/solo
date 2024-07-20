import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { Cabin_600SemiBold, Cabin_700Bold } from '@expo-google-fonts/cabin';
import { beneficar_data, options2, text_data } from '../Data/Data';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import CustomDropdown from '../Dropdown/Dropdown';
import CustomCheckbox from '../custom_checkbox/custom_checkbox';
import Button from "../../components/Button/Button";
import { router, Link } from "expo-router";
import ThemeContext from '../../theme/ThemeContext';

const Transfer_section3 = () => {
  const [selectedValue, setSelectedValue] = useState(options2[0]);
  const [isChecked, setIsChecked] = useState(false);
  const [activestack, setActive_stack] = useState(beneficar_data[0].id)
  const { theme,  darkMode } = useContext(ThemeContext);

  const beneficar = (id) => {
    setActive_stack(id);
  };

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const transfer = () => {
    router.push('/confirm/confirm');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, {color:theme.color}]}>Choose Beneficiary</Text>
      <ScrollView horizontal={true} style={styles.scroll}>
        <TouchableOpacity style={styles.stack1}>
          <View style={styles.add}>
            <Text style={styles.plus}>+</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.stack_container}>
          {beneficar_data.map((d) => (
            <TouchableOpacity style={[styles.stack, activestack === d.id && styles.activestack]} key={d.id} onPress={() => {beneficar(d.id)}}>
              <Image source={d.image} alt='image' style={styles.image} />
              <Text style={[styles.stack_text, activestack === d.id && styles.active_stack_text]}>{d.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.input_box}>
        <Text style={[styles.label, {color:theme.color}]}>Select the bank</Text>
        <CustomDropdown
          options={options2}
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        />
      </View>
      <View style={styles.input_container}>
        {text_data.map((d) => (
          <View style={styles.input_box} key={d.id}>
            <Text style={[styles.label, {color:theme.color}]}>{d.label}</Text>
            <TextInput keyboardType={d.key} style={[styles.input, {backgroundColor:theme.cardbg3, color:theme.color}]} placeholder={d.placeholder} placeholderTextColor={darkMode? '#ffffff' : '#000000'} />
          </View>
        ))}
      </View>
      <Text style={styles.entered_amount}>One thousand dollar</Text>
      <View style={styles.check_row}>
        <CustomCheckbox isChecked={isChecked} onToggle={handleToggleCheckbox} />
        <Text style={[styles.check_text, {color:theme.color2}]}>Save to directory of beneficiary</Text>
      </View>
        <Button  buttonText="confirm" onPress={transfer} />
    </View>
  );
};

export default Transfer_section3;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  heading: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Cabin_700Bold',
    color: '#000000',
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  scroll: {
    marginVertical: 16,
  },
  stack_container: {
    flexDirection: 'row',
    gap: 16,
  },
  stack1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FFAF2A',
    marginRight: 16,
  },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAF2A',
    padding: 15,
    textAlign: 'center',
    borderRadius: 50,
    maxHeight: 60,
    minWidth: 60,
  },
  plus: {
    color: '#F6F6F6',
    fontSize: 28,
    marginTop: -5,
  },
  stack: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
  },
  activestack: {
    backgroundColor: '#0890FE',
  },
  image: {
    width: 60,
    height: 60,
  },
  stack_text: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Lato_400Regular',
    color: '#343434',
  },
  active_stack_text: {
    color: '#ffffff',
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
  entered_amount: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Cabin_600SemiBold',
    color: '#3629B7',
    paddingVertical: 16,
  },
  check_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 25,
  },
  check_text: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Lato_400Regular',
    color: '#343434',
  },
});
