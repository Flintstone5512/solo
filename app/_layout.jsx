import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../theme/ThemeContext';
import { UnitSDK, UNEnvironment, UNBottomSheetComponent } from 'react-native-unit-components';

//const THEME = 'A URL that specifies the UI configuration';
//const LANGUAGE = 'A URL that specifies the language configuration';
//const CUSTOM_FONTS = {}; // Define your custom fonts configuration if needed


const Root_layout = () => {
useEffect(() => {
    UnitSDK.init(UNEnvironment.sandbox );
  }, []);

  //CUSTOM_FONTS

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='(auth)' />
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(screens)/Card/Card' />
          <Stack.Screen name='(screens)/SoloAi/SoloAi' />
          <Stack.Screen name='(screens)/Plan/Plan' />
          <Stack.Screen name='(screens)/Assets/Assets' />
          <Stack.Screen name='(screens)/Qr_code/Qr_code' />
          <Stack.Screen name='(screens)/Success/Success' />
          <Stack.Screen name='(screens)/Transfer/Transfer' />
          <Stack.Screen name='(screens)/confirm/confirm' />
        </Stack>
        <UNBottomSheetComponent />
      </View>
      
    </ThemeProvider>
    
  );
};

//, THEME, LANGUAGE 

export default Root_layout;

const styles = StyleSheet.create({});
