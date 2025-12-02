import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../theme/ThemeContext';
import { AuthProvider, AuthContext } from './auth/AuthContext';
import { registerForPushNotificationsAsync } from './services/notificationSetup';

const LayoutWithAuth = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.userId) {
      registerForPushNotificationsAsync(user.userId);
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='auth' />
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
    </View>
  );
};

const Root_layout = () => (
  <ThemeProvider>
    <AuthProvider>
      <LayoutWithAuth />
    </AuthProvider>
  </ThemeProvider>
);

export default Root_layout;

const styles = StyleSheet.create({});
