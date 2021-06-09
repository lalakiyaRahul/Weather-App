import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherList from '../screen/WeatherList';
import WeatherDetails from '../screen/WeatherDetails';

const Stack = createStackNavigator();


export default class NavigationServices extends Component {

  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="WeatherList" component={WeatherList} options={{ gestureEnabled: false, headerStyle: {
              backgroundColor: '#00804A',
            }, }} />
          <Stack.Screen name="WeatherDetails" component={WeatherDetails} options={{
            gestureEnabled: false, headerStyle: {
              backgroundColor: '#00804A',
            },
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
