import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightTheme = {
  background: '#F9F9FF',
  background2: '#7C00FF', // purple accent
  color: '#1C1C1C',
  color2: '#757575',
  color3: '#555',
  log: '#FE1717',
  text: '#000',
  cardbg: '#FFFFFF',
  cardbg2: '#F3F3FF',
  cardbg3: '#EFEFFF',
  bordercolor: '#7C00FF',
  accent: '#00E0C7' // teal
};

const darkTheme = {
  background: '#0D0D1F',
  background2: '#00E0C7', // teal highlight
  color: '#FFFFFF',
  color2: '#BBB',
  color3: '#888',
  log: '#FE1717',
  text: '#BABABA',
  cardbg: '#1C1C3A',
  cardbg2: '#2A2A4A',
  cardbg3: '#333355',
  bordercolor: '#7C00FF',
  accent: '#FFD700' // gold for punch
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
