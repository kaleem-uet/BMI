import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Result from './src/screens/Result';
import Age from './src/screens/Age';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#222224'}}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Result"
        component={Result}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#222224" />
      <Drawer.Navigator
      drawerHideStatusBarOnOpen={true}
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
      }}>
      <Drawer.Screen
        name="BMI"
        component={MyStack}
        options={{
          title: 'BMI Calculator',
          drawerLabel: 'BMI',
          headerStyle: {backgroundColor: '#222224'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerInactiveTintColor: 'blue',
          drawerActiveTintColor: 'white',
        }}
      />
      <Drawer.Screen name="Age" component={Age} options={{
          title: 'Age Calculator',
          drawerLabel: 'Age Calculator',
          headerStyle: {backgroundColor: '#222224'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerInactiveTintColor:'blue',
          drawerActiveTintColor:"white"
        }} />
       
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
