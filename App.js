import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import NavigationServices from "./src/services/NavigationServices";

export default class App extends Component {

  render() {
    return (
      <>
      <NavigationServices/>
      </>
    );
  }
}
