
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen2 from './screens/LoginScreen2';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import SskScreen from './screens/SskScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab =createBottomTabNavigator();
const screenOptionsForTab = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 40,
    background: "#fff",
    
  }
}
function tabBar() {
  return (
      <Tab.Navigator screenOptions={screenOptionsForTab}>
          <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Ssk" 
          component={SskScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="wallet" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>Ssk</Text>
            </View>
              )
            }
          }}
          />
           <Tab.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="briefcase" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
            </View>
              )
            }
          }}
          />
       </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer
      
      style={styles.mainContainer}>
            
     <Stack.Navigator
          screenOptions={{
              headerStyle: {
                backgroundColor: '#124936', 
              },
              headerTintColor: 'white', 
              headerTitleStyle: {
                fontWeight: 'bold', 
              },
              headerTitle: 'Tarım Tekno Bot', 
            }}
          >
       <Stack.Screen options={{ headerShown : false, headerLeft: () => null }} name="Login" component={LoginScreen2} /> 
        <Stack.Screen options={{ headerLeft: () => null }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerLeft: () => null }} name="Menu" component={MenuScreen} />
        <Stack.Screen options={{ headerLeft: () => null }} name="Ssk" component={SskScreen} />
      </Stack.Navigator>

      
    
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
     
  }
  
});
