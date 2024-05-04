import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen2 from './screens/LoginScreen2';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import SskScreen from './screens/SskScreen';
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const screenOptionsForTab = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 40,
    background: "#fff",
  }
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Çıkış Yap">
         <Drawer.Screen name="Çıkış Yap" component={LoginScreen2} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Ssk" component={SskScreen} />
        <Drawer.Screen name="Menu" component={MenuScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'cover', 
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  navigator: {
    backgroundColor: '#fff',
  },
  logoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
