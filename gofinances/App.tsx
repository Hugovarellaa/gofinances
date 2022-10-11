import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Dashboard } from './src/screens/Dashboard';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Dashboard />
    </View>
  );
}
