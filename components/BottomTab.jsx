import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Beat from './screens/Beat';
import Cp from './screens/Cp';
import More from './screens/More';
import RetailerStack from './StackNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Retailer':
            iconName = 'map';
            break;
          case 'Cp':
            iconName = 'shopping-cart';
            break;
          case 'More':
            iconName = 'more-horiz';
            break;
          default:
            iconName = 'home';
            break;
        }

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
    <Tab.Screen name="Home" component={HomeScreen} 
    
    />
    <Tab.Screen name='Retailer' component={RetailerStack}/>
    <Tab.Screen name='Cp' component={Cp}/>
    <Tab.Screen name='More' component={More}/>
    
    
  </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})