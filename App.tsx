import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { IoTProvider } from './src/context/IoTContext';

export default function App() {
  return (
    <IoTProvider >
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="dark" />
    </IoTProvider>

  );
}