import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold, useFonts
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Loading } from './src/components/Loading';
import { AuthProvider } from './src/hooks/auth';
import { AppRoutes } from './src/routes/app.routes';
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
      <NavigationContainer>
        <StatusBar style='light' />
        <AuthProvider>
          {
            fontsLoaded ? <AppRoutes /> : <Loading />
          }
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}