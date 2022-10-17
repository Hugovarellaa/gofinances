import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './src/screens/dashboard';
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>

      <Dashboard />
    </ThemeProvider>
  );
}