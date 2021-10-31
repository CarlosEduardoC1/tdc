import React from 'react';
import Routes from './routes';
import { StatusBar } from 'react-native';
import global from './styles/global-style';
import { NativeBaseProvider, Box } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar  {...global.statusbar} />
      <Routes />
    </NativeBaseProvider>
  );
}