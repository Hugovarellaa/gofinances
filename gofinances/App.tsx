import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold, useFonts
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Loading } from './src/components/Loading';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
import theme from './src/styles/theme';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { isLoadingStorage } = useAuth()

  if (!fontsLoaded || isLoadingStorage) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' />
      <AuthProvider>
        {
          fontsLoaded ? <Routes /> : <Loading />
        }
      </AuthProvider>
    </ThemeProvider>
  );
}