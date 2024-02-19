import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../MainScreen/Home';
import Profile from '../MainScreen/Profile';
import { MaterialIcons } from '@expo/vector-icons';
import DownloadFliesList from '../MainScreen/DownloadFliesList';
import BottomTabScreen from '../../Navigations/BottomTabScreen';
import CustomDrawerContent from '../../Navigations/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const SideBar = () => {
  return (
    <Drawer.Navigator
      drawerContent={props =><CustomDrawerContent {...props}/>}

      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280
        },
        headerStyle: {
          backgroundColor: '#006BFF',
          height:60
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: '#111'
        }
      }}
    >

      <Drawer.Screen
        key='Home'
        name='Home'
        component={BottomTabScreen}
        options={{
          // headerShown: false
          // drawerLabel: 'Home',
          // title: 'Home',
          // drawerIcon:()=>(
          //   <MaterialIcons name="Home" size={20} color="#808080"/>
          // )
        }}
      />


      <Drawer.Screen key='Profile' name='Profile' component={Profile} 
      options={{
        headerShown: false,
        // drawerIcon:()=>(
        //   <MaterialIcons name="Time" size={20} color="#808080"/>
        // )
      }}/>

      {/* <Drawer.Screen key='Subscribe to PRO' name='Subscribe to PRO' component={Profile} /> */}

      {/* <Drawer.Screen key='Notification' name='Notification' component={Profile} /> */}
      
      <Drawer.Screen key='Download' name='Download' component={DownloadFliesList} />
       <Drawer.Screen key='Privacy Policy' name='Privacy Policy' component={Profile} />
      <Drawer.Screen key='Rate this App' name='Rate this App' component={Profile} />
      <Drawer.Screen key='Log Out' name='Log Out' component={Profile} />
      <Drawer.Screen key='Delete Account' name='Delete Account' component={Profile} />
    </Drawer.Navigator>
  )
}

export default SideBar

const styles = StyleSheet.create({})