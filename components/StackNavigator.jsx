// RetailerStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Beat from './screens/Beat';
import RetailerMap from './screens/RetailerMap';

const Stack = createNativeStackNavigator();

const RetailerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Beat" component={Beat} options={{headerShown:false}} />
      <Stack.Screen name="RetailerMap" component={RetailerMap}  options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default RetailerStack;
