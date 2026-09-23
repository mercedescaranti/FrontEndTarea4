import React from 'react';
import { StatusBar } from 'expo-status-bar';
import EnanosScreen from './src/screens/EnanosScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <EnanosScreen />
    </>
  );
}
