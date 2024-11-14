// BottomTabScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionic from 'react-native-vector-icons/Ionicons';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
  Fontisto,

} from "@expo/vector-icons";


import Home from '../Screens/MainScreen/Home';
import Profile from '../Screens/MainScreen/Profile';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DownloadFliesList from '../Screens/MainScreen/DownloadFliesList';
import LiveScreen from '../Screens/MainScreen/LiveScreen';
import LiveActive from '../assets/SVGS/LiveActive';
import LiveIcon from '../assets/SVGS/LiveIcon';
import HomeIcon from '../assets/SVGS/HomeIcon';
import HomeActive from '../assets/SVGS/HomeActive';
import ProfileIcon from '../assets/SVGS/ProfileIcon';
import ProfileActive from '../assets/SVGS/ProfileActive';
import Options from '../assets/SVGS/Navigation/Options';
import BackIcons from '../assets/SVGS/Navigation/BackIcons';


// import SideBar from '../Screens/Drawer/SideBar';


const BottomTabConfig = {
  headerShown: true,
  headerBackVisible: true,
  // headerTitle: 'Hello Rohith',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: '#030370',
  headerTitleStyle: {
    fontFamily: 'Gabarito-VariableFont',
    fontSize: 20,
    fontWeight: '600',
  },
}

const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: Platform.OS === "ios" ? 0.07 : 0.100,
          backgroundColor: '#EEEEFF'
        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          if (route.name === "Home") {

            // iconName =  focused ?<FontAwesome6 name="house" size={24} color={colour} />:
            size = focused ? size + 6 : size + 2;

            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, }}>
                {focused ? <HomeIcon /> :
                  <HomeActive />
                }
                <Text style={{ fontSize: 12, marginTop: 5, width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }}>Home</Text>
              </View>)
          }




          else if (route.name === "Live Page") {
            size = focused ? size + 8 : size + 2;
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, }}>
                {focused ? <LiveActive /> : <LiveIcon />}
                <Text style={{ fontSize: 12, marginTop: 5, width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }}>Live</Text>
              </View>)

          }

          else if (route.name === "Downloads") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;

            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, }}>
                {focused ? <Feather name="download" size={24} color="#030370" /> : <Feather name="download" size={24} color="#64748B" />}

                <Text style={{ fontSize: 12, marginTop: 5, width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }}>Downloads</Text>
              </View>)

          }


          else if (route.name === "Profile") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, }}>
                {focused ? <ProfileActive /> : <ProfileIcon />}
                <Text style={{ fontSize: 12, marginTop: 5, width: '100%', color: focused ? "#030370" : "#64748B", fontWeight: focused ? 700 : 500 }}>Profile</Text>
              </View>)
          }




        }
      })}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          ...BottomTabConfig,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 15 }}>
              <Options />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
              <View style={{}}></View>
            </TouchableOpacity>
          ),
        })}
      />


      <Tab.Screen name="Live Page" component={LiveScreen}
        options={({ navigation }) => ({
          ...BottomTabConfig,
          // Live Channel
            headerTitle: 'Live Channel',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons/>
            </TouchableOpacity>
          ),

    
          // headerShown: false,
        })}
      />



      <Tab.Screen name="Downloads" component={DownloadFliesList}
        options={({ navigation }) => ({
          ...BottomTabConfig,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons/>
            </TouchableOpacity>
          ),

        })}
      />

      <Tab.Screen name="Profile" component={Profile}
        options={({ navigation }) => ({
          ...BottomTabConfig,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <BackIcons/>
            </TouchableOpacity>
          ),
        })}
      />

    </Tab.Navigator>



  );
};

export default BottomTabScreen;



















