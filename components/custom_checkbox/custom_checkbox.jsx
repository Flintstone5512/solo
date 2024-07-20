import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';

const CustomCheckbox = ({ isChecked, onToggle }) => {
  const { theme,  darkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={[styles.checkboxContainer, {borderColor: theme.color}]} onPress={onToggle}>
      <Text style={[styles.checkbox, isChecked && [styles.checked, {color:theme.color}]]}>{isChecked ? '✔️' : ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    fontSize: 18,
    color: '#000',
   
  },
  checked: {
    color: '#3629B7', 
  },
});

export default CustomCheckbox;
