import React from 'react';
import Routes from './routes';
import { StatusBar } from 'react-native';
import global from './styles/global-style';
import { NativeBaseProvider, Box } from 'native-base';
import { Provider } from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <NativeBaseProvider>
        <StatusBar  {...global.statusbar} />
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
}