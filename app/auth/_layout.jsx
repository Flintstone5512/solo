import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../auth/AuthContext'; // Update path if needed

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
