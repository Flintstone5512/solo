
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightTheme = {
  background: '#FFFFFF',
  background2: '#0890FE',
  color: '#000000',
  color2: 'rgba(0,0,0,.2)',
  color3: '#757575',
  log: '#FE1717',
  text: '#000000',
  coloring: '#ffffff',
  cardbg: '#f6f6f6',
  cardbg2: '#f6f6f6',
  cardbg3: '#f6f6f6',
  card: '#f6f6f6',
  overlay:  'rgba(0, 0, 0, 0.5)',
  bordercolor: '#3629B7',
};

const darkTheme = {
  background: '#000000',
  background2: '#FFAF2A',
  color: '#FFFFFF',
  color2: '#ffffff',
  color3: '#ffffff',
  color4: '#ffffff',
  log: '#FE1717',
  text: '#BABABA',
  coloring: '#333333',
  cardbg: '#333333',
  cardbg2: '#BABABA',
  cardbg3: 'rgba(238, 238, 238, 0.2)',
  card: '#757575',
  overlay: 'rgba(255, 255, 255, 0.4)',
  bordercolor: '#FFAF2A',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const loadDarkModeState = async () => {
      try {
        const darkModeState = await AsyncStorage.getItem("darkMode");
        if (darkModeState !== null) {
          const parsedState = JSON.parse(darkModeState);
          setDarkMode(parsedState.darkMode);
          setTheme(parsedState.darkMode ? darkTheme : lightTheme);
        }
      } catch (error) {
        console.error("Error loading dark mode state:", error);
      }
    };

    loadDarkModeState();
  }, []);

  const toggleTheme = async () => {
    try {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      setTheme(newDarkMode ? darkTheme : lightTheme);
      await AsyncStorage.setItem("darkMode", JSON.stringify({ darkMode: newDarkMode }));
    } catch (error) {
      console.error("Error saving dark mode state:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
