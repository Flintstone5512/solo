import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Drop from "../../assets/images/dropdown_vector.svg";
import ThemeContext from '../../theme/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_DROPDOWN_HEIGHT = SCREEN_HEIGHT * 0.5; // 50% of the screen height

const CustomDropdown = ({ options, selectedValue, onValueChange }) => {
  const { theme,  darkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={[styles.dropdown, {backgroundColor:theme.cardbg}]} onPress={() => setIsOpen(!isOpen)}>
        <Text style={[styles.dropdownText, {color:theme.color3}]}>{selectedValue.option}</Text>
        <Drop style={styles.drop} />
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownList, { maxHeight: MAX_DROPDOWN_HEIGHT }]}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.dropdownItem, {backgroundColor:theme.cardbg}]}
                onPress={() => handleSelect(option)}
              >
                <Text style={[styles.dropdownItemText, {color:theme.color3}]}>{option.option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
  },
  dropdown: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    position: 'relative',
  },
  drop: {
    position: 'absolute',
    bottom: 20,
    right: 12,
  },
  dropdownText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
  },
});

export default CustomDropdown;
