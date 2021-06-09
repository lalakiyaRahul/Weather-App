import React, { Component } from 'react';
import { View, Text,LogBox } from 'react-native';
import 'react-native-gesture-handler';
import NavigationServices from "./src/services/NavigationServices";
import persist from './src/Redux/Store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const persistStore = persist()
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default class App extends Component {

  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <NavigationServices />
        </PersistGate>
      </Provider>
    );
  }
}
