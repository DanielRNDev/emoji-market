import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App
