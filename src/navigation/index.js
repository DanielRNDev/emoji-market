import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../screen/Dashboard'

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
    <Stack.Screen name="Dashboard" component={Dashboard} headerMode="none" />
  </Stack.Navigator>
)

export default StackNavigator;
