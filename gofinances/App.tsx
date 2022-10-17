import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold, useFonts
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Loading } from './src/components/Loading';
import { Dashboard } from './src/screens/dashboard';
import theme from './src/styles/theme';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light'/>
      {
        fontsLoaded ? <Dashboard />  : <Loading />  
      }
    </ThemeProvider>
  );
}