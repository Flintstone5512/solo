import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../theme/ThemeContext';

const Root_layout = () => {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='(screens)/Card/Card' />
        <Stack.Screen name='(screens)/Qr_code/Qr_code' />
        <Stack.Screen name='(screens)/Success/Success' />
        <Stack.Screen name='(screens)/Transfer/Transfer' />
        <Stack.Screen name='(screens)/confirm/confirm' />
      </Stack>
    </ThemeProvider>
  )
}

export default Root_layout;

const styles = StyleSheet.create({})
